import type { Register } from 'claude-code'

const DESCRIPTION = `Compact your own context at a checkpoint, then carry on.

Call it when a stretch of work is finished and verified and the next stretch does not need the detail that got you here: a phase or milestone landed, a subtask closed, a long investigation concluded, or before switching to unrelated work. Not mid-task, not while a step's outcome is unverified.

Compaction runs once this turn ends, so end your turn straight after the call. Then the resume text arrives as a new message and you continue from the summary.

instructions: what the summarizer must keep and what it may drop. Keep: the goal, decisions and why, verified facts with their evidence, things ruled out, open items and blockers, exact paths, ids and commands still needed, running background work. Drop: tool output already acted on, file dumps, superseded plans, dead ends beyond a one-line "ruled out".
resume: the first message after compaction: the next concrete step, and any file to re-read first.`

type Pending = { instructions: string; resume: string }

export const register: Register = on => {
  let pending: Pending | undefined

  on('session.start', async ($, e, next) => {
    await $.tool.register({
      name: 'checkpoint',
      description: DESCRIPTION,
      inputSchema: {
        type: 'object',
        properties: {
          instructions: { type: 'string', description: 'What the compaction summary must keep, and what it may drop.' },
          resume: { type: 'string', description: 'The message that resumes work after compaction: the next step.' },
        },
        required: ['instructions', 'resume'],
      },
    })
    return next(e)
  })

  on('tool.call', { tool: 'mcp__checkpoint__checkpoint' }, async ($, e, next) => {
    if (e.agentId) return { deny: 'checkpoint is for the main conversation only.' }
    const input = e as unknown as Partial<Pending>
    if (!input.instructions?.trim() || !input.resume?.trim()) {
      return { deny: 'checkpoint needs both instructions and resume.' }
    }
    pending = { instructions: input.instructions, resume: input.resume }
    $.ui.status('checkpoint queued')
    return { result: 'Checkpoint queued. Compaction runs when this turn ends: end your turn now, with no further tool calls.' }
  }).catch(() => ({ deny: 'checkpoint: the mod failed; nothing was queued.' }))

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    // Only the main loop's answered turn; an interrupted or failed turn keeps it queued.
    if (e.agentId || e.reason !== 'answer' || !pending) return result
    const job = pending
    pending = undefined
    // Not inside this hook: the turn still ends through it, and compact rejects mid-turn.
    $.clock.after(0, async () => {
      try {
        const r = await $.session.compact({ instructions: job.instructions })
        if (r.skip) {
          $.ui.status(undefined)
          $.ui.toast(`checkpoint: compaction refused: ${r.skip}`)
          return
        }
        $.ui.status(undefined)
        await $.prompt.submit({ text: `Checkpoint reached and context compacted. Resume:\n\n${job.resume}` })
      } catch (err) {
        // Typically a new turn started first; keep it for the next turn end.
        pending = job
        $.ui.log(`checkpoint: ${String(err)}`, { to: 'debug' })
      }
    })
    return result
  })
}
