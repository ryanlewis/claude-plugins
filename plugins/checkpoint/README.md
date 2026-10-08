# checkpoint

A Claude Code mod that gives the model a `checkpoint` tool, so a session can compact its own context at a point it chooses, with summary instructions it writes itself, and then carry on.

## How it works

1. The model calls `mcp__checkpoint__checkpoint` with two fields:
   - `instructions`: what the compaction summary must keep and what it may drop.
   - `resume`: the first message after compaction, naming the next step.
2. The model ends its turn.
3. When the turn ends, the mod runs `$.session.compact({ instructions })`, then submits `resume` as a new prompt, so work continues from the summary.

An interrupted or failed turn keeps the checkpoint queued for the next turn that ends with an answer. Subagents cannot call the tool; it is for the main conversation.

The tool description tells the model when to checkpoint (a stretch of work finished and verified) and what to keep. In practice it works best when the prompt or skill driving the session says to use it, for example "checkpoint with the checkpoint tool after each phase".

## Requirements

Claude Code with mods enabled on your account.

## Install

```
/plugin install checkpoint@ryanlewis-plugins
```

To try a local checkout for one session:

```
claude --plugin-dir plugins/checkpoint
```

## Tests

```
claude plugin validate plugins/checkpoint
claude plugin test plugins/checkpoint
```
