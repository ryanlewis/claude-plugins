# spec-dev

A Claude Code plugin for **spec-driven development** — turning feature briefs and project ideas into structured, reviewable specifications with traceable requirements and implementation stories.

Ideal for people maintaining second brains in Obsidian or otherwise managing project documentation in markdown.

## Why Spec-Driven Development?

Most AI coding tools excel at implementation but struggle with *what to implement*. A vague prompt produces vague code. Spec-driven development solves this by front-loading the thinking — decomposing a feature idea into a structured hierarchy of goals, requirements, and stories before a single line of code is written.

**What makes it different from just "writing a spec":**

- **Traceability** — every story traces back through requirements to goals. When scope changes, you can see exactly which stories are affected. When a story is done, you can verify it satisfies the requirement it claims to.
- **Multi-persona review** — the same spec is examined through four lenses (product, architecture, risk, QA), catching gaps that a single perspective misses.
- **Assumption surfacing** — inferences made during planning are explicitly marked and tracked, not silently baked in. This is especially valuable with AI agents, which confidently fill gaps without flagging them.
- **Machine-readable artifacts** — YAML frontmatter on every file means agents can parse the dependency graph, priority breakdown, and traceability chain programmatically. An AI agent handed a well-structured story with acceptance criteria, traceability, and technical notes produces dramatically better code than one given a one-liner.

**For agentic workflows specifically**, structured specs act as a contract between the human (who owns the "what" and "why") and the agent (who owns the "how"). The pipeline's human review gates ensure the agent doesn't drift — each stage is checked before the next begins. The result is a set of implementation-ready stories that an autonomous coding agent can pick up and execute with minimal ambiguity.

## What It Does

Implements a linear pipeline with human review gates between each stage:

```
explore → create-spec → derive-requirements → derive-technical → plan-work → review
```

Each stage produces specific artifacts that trace back to the one before, forming a chain from vision to implementation-ready stories.

## Commands

| Command | Description |
|---------|-------------|
| `/spec-dev:help` | Show workflow status and next step |
| `/spec-dev:explore` | Lightweight exploration, optionally writes DISCOVERY.md |
| `/spec-dev:create-spec` | Interactive discovery → SPEC.md |
| `/spec-dev:derive-requirements` | Decompose goals into functional requirements |
| `/spec-dev:derive-technical` | Derive technical requirements (NFRs, architecture) |
| `/spec-dev:plan-work` | Create stories, spikes, and tasks with dependency graph |
| `/spec-dev:review` | Three-dimensional consistency review |

## Spec Output Structure

```
<spec-folder>/
├── DISCOVERY.md               — Exploration notes (optional, from /explore)
├── SPEC.md                    — Vision, goals, scope, constraints
├── requirements/
│   └── FR-NNN-slug.md         — Functional requirements (the "what")
├── technical/
│   └── TR-NNN-slug.md         — Technical requirements (NFRs, architecture)
├── stories/
│   └── ST-NNN-slug.md         — Implementation stories
├── spikes/
│   └── SP-NNN-slug.md         — Research/investigation spikes
├── tasks/
│   └── TK-NNN-slug.md         — Technical/infrastructure tasks
└── REVIEW.md                  — Consistency review findings
```

## Agents

| Agent | Role | Annotation |
|-------|------|------------|
| `product-analyst` | Functional requirements, acceptance criteria, completeness | `[PRODUCT]` |
| `technical-architect` | Technical design, NFRs, work planning | `[ARCHITECT]` |
| `risk-reviewer` | Compliance, regulatory, failure modes | `[RISK]` |
| `qa-adversary` | Edge cases, unhappy paths, testing gaps | `[QA]` |

Product Analyst and Technical Architect are always activated. Risk Reviewer and QA Adversary activate based on domain signals (regulated industries, complex logic, external integrations, PII). Personas are adopted inline during derivation stages (not spawned as literal subagents) to preserve conversation context.

## Key Conventions

- **RFC 2119** keywords (MUST, SHALL, SHOULD, MAY) in uppercase within requirements
- **Given/When/Then** scenarios for acceptance criteria
- **Fibonacci-ish** story points (1, 2, 3, 5, 8, 13)
- **Mermaid** for dependency graphs
- **Assumption tracking** — `[ASSUMPTION]` markers with numbered IDs, inline references, and review audit
- **Open question resolution** — batch-resolved during each derivation stage, removed once answered
- **Amendment log** — tracks meaningful changes post-draft only
- Full traceability: Stories → Requirements → Goals

## Installation

```
/plugin install spec-dev@https://github.com/ryanlewis/claude-plugins
```

Or test locally:

```bash
claude --plugin-dir ~/dev/rlew/claude-plugins/plugins/spec-dev
```
