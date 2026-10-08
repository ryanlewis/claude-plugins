import { expect, mock, test } from 'claude-code/testing'

const TOOL = 'mcp__checkpoint__checkpoint'
const END = { reason: 'answer', answer: 'done', durationMs: 1, isAborted: false, turnId: 't1' } as any

function world(on: any) {
  const clock = mock.clock(on)
  const compacts: any[] = []
  const prompts: string[] = []
  on('session.compact', ($: any, e: any) => { compacts.push(e); return { messages: [{ role: 'user', text: 'SUMMARY', toolUses: [] }] } })
  for (const ev of ['ui.status', 'ui.log', 'ui.toast']) on(ev, () => ({ value: undefined }))
  on('prompt.submit', ($: any, e: any) => { prompts.push(e.text); return { text: e.text } })
  on('turn.complete', () => ({ text: 'done' }))
  return { clock, compacts, prompts }
}

test('a checkpoint compacts with its instructions after the turn, then resumes', async ($, on) => {
  const w = world(on)
  const r: any = await $.tool.call({ tool: TOOL, instructions: 'keep the plan', resume: 'step 2' } as any)
  expect(r.deny).toBeUndefined()
  expect(w.compacts.length).toBe(0)
  await $.turn.complete(END)
  await w.clock.settle()
  expect(w.compacts.length).toBe(1)
  expect(w.compacts[0].instructions).toBe('keep the plan')
  expect(w.prompts.length).toBe(1)
  expect(w.prompts[0]).toContain('step 2')
})

test('no checkpoint, no compaction', async ($, on) => {
  const w = world(on)
  await $.turn.complete(END)
  await w.clock.settle()
  expect(w.compacts.length).toBe(0)
})

test('an interrupted turn keeps the checkpoint for the next answered one', async ($, on) => {
  const w = world(on)
  await $.tool.call({ tool: TOOL, instructions: 'keep', resume: 'go' } as any)
  await $.turn.complete({ ...END, reason: 'aborted', isAborted: true })
  await w.clock.settle()
  expect(w.compacts.length).toBe(0)
  await $.turn.complete(END)
  await w.clock.settle()
  expect(w.compacts.length).toBe(1)
})

test('missing fields are refused', async ($, on) => {
  world(on)
  const r: any = await $.tool.call({ tool: TOOL, instructions: 'keep' } as any)
  expect(r.deny).toContain('both')
})
