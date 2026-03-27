---
description: Interactive discovery → SPEC.md
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, AskUserQuestion
argument-hint: [spec-folder or topic]
---

Guide the user through creating a SPEC.md — the constitution for a new specification. This is an interactive, multi-phase process.

Load the spec-driven-dev skill and its reference files for templates and schemas.

## Phase 0: Gather Existing Context

Before starting discovery, look for existing context that can accelerate the process:

1. **Check for DISCOVERY.md** — if a DISCOVERY.md file exists at the target path (from a prior `/spec-dev:explore` session), read it. This contains key findings, materials reviewed, open threads, and suggested personas from an earlier exploration.
2. **Check for existing project materials** — scan the target directory and surrounding area for design docs, README files, architecture notes, prior specs, or referenced code. Use Glob to find relevant files. Read anything that looks useful.
3. **Check conversation context** — if the user has been discussing the project in this session (e.g., after running `/spec-dev:explore`), use that context directly.

If a DISCOVERY.md or substantial conversation context exists, skip or abbreviate Phase 1 — don't re-ask questions the user has already answered. Summarise what you already know and ask only for gaps.

## Phase 1: Discovery Conversation

If there is no existing SPEC.md at the target path, conduct a discovery conversation:

1. If `$ARGUMENTS` looks like a path containing SPEC.md, read it and skip to Phase 3 (amendment flow)
2. If DISCOVERY.md was read in Phase 0, present a summary of what's already known and ask only about gaps
3. If starting fresh (`$ARGUMENTS` is a topic or empty), begin full discovery:
   - Ask about the **vision** — what is the desired end state?
   - Ask about **goals** — what measurable outcomes define success?
   - Ask about **scope** — what is explicitly in and out?
   - Ask about **constraints** — technical, regulatory, organisational
   - Ask about **context** — prior art, related systems, motivation
   - Ask about **success criteria** — how do you know the goals are met?
4. Ask 2-3 questions at a time. Proactively read any files, code, or docs the user references — don't wait to be told to read them. If the user mentions a design doc, an existing codebase, or reference material, read it immediately and incorporate findings.
5. Summarise understanding and confirm before proceeding.

## Phase 2: Persona Selection

Based on domain signals from the discovery conversation, determine which personas to activate:

- **product-analyst** and **technical-architect** — always activated
- **risk-reviewer** — activate if domain involves: financial services, PII, regulated industry, authentication, audit requirements
- **qa-adversary** — activate if domain involves: complex logic, external integrations, data transformations, stateful workflows

Read `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/team-roles.md` for the full persona selection guide.

**Auto-select**: Present the selected personas with a brief explanation of why each was chosen. Do not block on confirmation — instead, state the selection and say "Override if you'd like a different composition, otherwise I'll proceed." Only ask for explicit confirmation if the selection is genuinely ambiguous (e.g., borderline regulated domain where risk-reviewer may or may not be relevant).

## Phase 3: Write SPEC.md

1. Determine the spec folder:
   - If `$ARGUMENTS` is a path, use it
   - Otherwise, ask the user where to create the spec folder
   - Create the directory if it doesn't exist

2. Read the SPEC.md template from `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/templates.md`

3. Write SPEC.md using the template, populated with:
   - `specName` from the discussion
   - `version: 1`, `status: draft`
   - `created` and `lastAmended` set to today's date
   - `personas` list from Phase 2
   - Vision, Goals (G1, G2, ...), Success Criteria, Scope, Constraints
   - **Assumptions** — any gap filled during discovery where the user didn't explicitly confirm a fact. Each assumption gets a numbered ID (A1, A2, ...) with a description, impact-if-wrong, and status of `Unvalidated`. Be thorough — if something was inferred rather than stated, it's an assumption.
   - **Context** — include a "Key References" subsection listing all files, docs, and materials that were read during exploration/discovery, with a brief note on what each contains. This preserves the research trail so downstream commands don't lose context.
   - Amendment Log — single initial entry ("Initial draft"). Do NOT record draft-stage iterations in the amendment log; it is reserved for meaningful amendments once the spec moves past `draft` status. Version stays at 1 throughout drafting.
   - Glossary if domain terms were discussed

**Assumption tracking during discovery**: Throughout the conversation, actively identify when a gap is being filled by inference rather than user-provided fact. Flag these clearly to the user before writing the spec (e.g., "I'm assuming X — is that correct?"). Whether confirmed or not, record them in the Assumptions section for downstream traceability.

4. Present a summary:

```
## Spec Created: {specName}

**Location**: {path}/SPEC.md
**Goals**: {count} goals defined
**Assumptions**: {count} assumptions recorded ({count unvalidated})
**Personas**: {list of activated personas}
**Status**: draft

**Next step**: Run `/spec-dev:derive-requirements {path}` to decompose goals into functional requirements.
```
