---
description: Lightweight exploration — optionally writes DISCOVERY.md
allowed-tools: Read, Glob, Grep, Bash, Write, AskUserQuestion
argument-hint: [topic or context]
---

Conduct a lightweight, interactive exploration of `$ARGUMENTS` to help the user clarify their thinking before creating a formal specification. This is primarily a conversation — optionally produces a DISCOVERY.md to preserve context for create-spec.

## Approach

1. **Read existing materials first** — before asking questions, proactively look for relevant context:
   - Read any files, code, docs, or notes the user points to
   - If `$ARGUMENTS` references a project directory, scan it with Glob/tree for relevant files (design docs, README, existing specs, architecture notes)
   - Summarise what you've learned from existing materials before asking questions
2. **Ask open-ended questions** to understand:
   - **What** — what is the feature/project/change?
   - **Why** — what problem does it solve? What's the motivation?
   - **Who** — who are the users? Who are the stakeholders?
   - **Constraints** — what are the technical, regulatory, or organisational limits?
   - **Prior art** — has this been attempted before? Are there existing systems to integrate with?
   - **Success** — how will you know this is done and working?
3. **Summarise** what has been learned after each round of questions

## Guidelines

- Ask 2-3 questions at a time, not a wall of questions
- Read any files or code the user references to ground the discussion
- If using Bash, limit to read-only analysis (e.g., `wc -l`, `tree`, listing directory contents)
- Reflect back what you've heard to confirm understanding
- If the user provides `$ARGUMENTS`, start by exploring that topic immediately rather than asking what to explore

## Wrapping Up

When the exploration feels sufficiently complete:

1. **Offer to write DISCOVERY.md** — ask the user: "Shall I capture these notes in a DISCOVERY.md? This preserves context for `/spec-dev:create-spec` so you don't need to repeat the discovery conversation."

2. If the user agrees, write `DISCOVERY.md` to the spec folder (ask where if unclear). Use this format:

```markdown
# Discovery Notes: {topic}

## Key Findings

- {Bullet summary of what was learned — vision, goals, constraints, context}

## Materials Reviewed

- {List of files/docs/code read during exploration, with brief notes on what was relevant}

## Open Threads

- {Questions that surfaced but weren't resolved}
- {Areas that need deeper investigation}

## Suggested Personas

- {Based on domain signals, which review personas seem relevant and why}
```

3. Then tell the user:

> "Discovery captured. Run `/spec-dev:create-spec {path}` to turn this into a formal specification — it will pick up the DISCOVERY.md automatically."

4. If the user declines DISCOVERY.md, just say:

> "You've got a solid picture. When you're ready, run `/spec-dev:create-spec` to turn this into a formal specification."
