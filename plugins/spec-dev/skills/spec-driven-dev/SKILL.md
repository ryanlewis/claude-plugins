---
name: spec-driven-dev
description: This skill should be used when the user asks to "create a spec", "write a specification", "plan an epic", "derive requirements", "break down a feature", "spec-driven development", "create stories from requirements", or mentions specification workflows, requirement traceability, or structured feature planning.
version: 0.1.0
---

# Spec-Driven Development

A methodology for turning feature briefs and project ideas into structured, reviewable specifications with traceable requirements and implementation stories.

## Core Concepts

Spec-driven development follows a linear pipeline with human review gates between each stage:

```
explore → create-spec → derive-requirements → derive-technical → plan-work → refine → review
```

Each stage produces specific artifacts. Every artifact traces back to the one before it, forming a complete chain from vision to implementation-ready stories.

The **explore** stage is optional but recommended — it produces a DISCOVERY.md that preserves context for create-spec, avoiding lost knowledge between sessions. If explore and create-spec happen in the same conversation, DISCOVERY.md is not strictly needed — conversational context carries through.

### Artifact Hierarchy

1. **SPEC.md** — the constitution: vision, goals, scope, constraints
2. **Functional Requirements (FR)** — the "what": user-facing behaviours derived from goals
3. **Technical Requirements (TR)** — the "how it's constrained": NFRs, architecture, derived from FRs
4. **Work Items (ST/SP/TK)** — the "how to build it": stories, spikes, tasks with dependency graphs

### Traceability Chain

Every artifact carries frontmatter fields that trace upward:

- Stories → reference FR and TR IDs in `requirements`
- Technical Requirements → reference FR IDs in `requirements`
- Functional Requirements → reference Goal IDs in `goals`

This chain enables impact analysis: changing a goal reveals which requirements and stories are affected.

## Spec Output Structure

All artifacts live in a single spec folder:

```
<spec-folder>/
├── SPEC.md
├── requirements/
│   └── FR-NNN-slug.md
├── technical/
│   └── TR-NNN-slug.md
├── stories/
│   └── ST-NNN-slug.md
├── spikes/
│   └── SP-NNN-slug.md
├── tasks/
│   └── TK-NNN-slug.md
└── REVIEW.md
```

## Multi-Persona Review

Each spec activates a team of personas based on domain signals. During derivation stages, personas are adopted inline (working from that perspective within the conversation) rather than spawned as literal subagents — this preserves conversation context. The agent definitions in `agents/` serve as reference descriptions for each persona's lens, tools, and annotation conventions.

- **Product Analyst** `[PRODUCT]` — functional requirements, acceptance criteria, completeness
- **Technical Architect** `[ARCHITECT]` — technical design, NFRs, work planning
- **Risk Reviewer** `[RISK]` — compliance, regulatory, failure modes
- **QA Adversary** `[QA]` — edge cases, unhappy paths, testing gaps

Product Analyst and Technical Architect are always activated. Risk Reviewer and QA Adversary activate based on domain signals (regulated industry, complex logic, external integrations, PII). Persona selection is auto-confirmed — presented with explanation, user overrides only if needed.

Persona annotations appear as bracketed tags in review findings: `[RISK] No audit logging requirement identified.`

## Key Conventions

- **RFC 2119** keywords (MUST, SHALL, SHOULD, MAY) in UPPERCASE within requirement bodies
- **Given/When/Then** scenarios encouraged for acceptance criteria
- **Fibonacci-ish points** (1, 2, 3, 5, 8, 13) for story estimation
- **Priorities**: Critical > High > Medium > Low
- **IDs** zero-padded to 3 digits: `FR-001`, `ST-012`
- **Slugs** in kebab-case derived from title: `FR-001-user-authentication.md`
- **Dependencies** use short IDs: `[ST-001, TK-002]`
- **Phases** group work items for delivery ordering: `"0"` (spikes), `"1"` (core), `"2"` (extension)
- **Assumptions** marked with `[ASSUMPTION]` tags — things taken as true without explicit confirmation. SPEC.md has a dedicated Assumptions section with numbered IDs (A1, A2, ...). Inline markers use `[ASSUMPTION: description]` wherever an assumption influences a decision. Unvalidated assumptions are flagged during review.
- **Open Questions** are resolved in batch during each derivation stage — not left to accumulate. Once resolved, questions are removed entirely (no "None" or "All resolved" stubs).
- **Amendment Log** tracks meaningful changes post-draft only. Draft-stage iterations don't need log entries.
- **Mermaid** for dependency graphs, using `<br>` for multi-line blocks

## Workflow Commands

The plugin provides these commands, each corresponding to a pipeline stage:

| Command | Purpose | Key Output |
|---------|---------|------------|
| `/spec-dev:help` | Detect current state, suggest next step | Status summary |
| `/spec-dev:explore` | Lightweight discovery conversation | `DISCOVERY.md` (optional) |
| `/spec-dev:create-spec` | Interactive discovery → SPEC.md | `SPEC.md` |
| `/spec-dev:derive-requirements` | Decompose goals into FRs | `requirements/FR-NNN-*.md` |
| `/spec-dev:derive-technical` | Derive TRs from FRs | `technical/TR-NNN-*.md` |
| `/spec-dev:plan-work` | Create stories, spikes, tasks | `stories/`, `spikes/`, `tasks/` |
| `/spec-dev:refine` | Simulate implementation to sharpen work items | `REFINEMENT.md` |
| `/spec-dev:review` | Three-dimensional consistency review | `REVIEW.md` |

## Additional Resources

### Reference Files

For detailed schemas, templates, and persona definitions, consult:

- **`references/frontmatter-schema.md`** — complete field definitions for every artifact type
- **`references/templates.md`** — copy-paste templates for all artifacts
- **`references/team-roles.md`** — full persona catalogue with activation signals and annotation examples
