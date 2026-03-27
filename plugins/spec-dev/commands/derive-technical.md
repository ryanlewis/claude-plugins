---
description: Derive technical requirements from functional requirements
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, AskUserQuestion, Agent
argument-hint: [spec-folder]
---

Derive technical requirements (NFRs, architecture constraints) from functional requirements, producing TR-NNN files in the `technical/` directory.

Load the spec-driven-dev skill and its reference files for templates and schemas.

## Steps

### 1. Locate the Spec

- If `$ARGUMENTS` is provided, look for `SPEC.md` at that path
- Otherwise, search the current directory with Glob (`**/SPEC.md`)
- If SPEC.md is not found, tell the user to run `/spec-dev:create-spec` first
- If no FR files exist in `requirements/`, tell the user to run `/spec-dev:derive-requirements` first

### 2. Read All Inputs

- Read SPEC.md (for constraints, context, personas)
- Read all FR files from `requirements/`
- Read `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/frontmatter-schema.md` for TR field definitions
- Read `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/templates.md` for TR template

### 3. Derive Technical Requirements

Adopt the **technical-architect** perspective to derive TRs. (Work inline with the architect's lens — not a literal subagent spawn.)

For each FR, identify implied technical needs across these categories:
- **Performance** — response times, throughput, concurrency
- **Security** — authentication, authorisation, encryption, input validation
- **Scalability** — data volume growth, load patterns
- **Observability** — logging, monitoring, alerting, tracing
- **Compatibility** — API versioning, backwards compatibility
- **Infrastructure** — deployment, configuration, environment

Group related needs into discrete TRs:
- Unique ID (TR-001, TR-002, ...) zero-padded to 3 digits
- RFC 2119 requirement statements in UPPERCASE
- Traceability to source FRs in `requirements` field
- Priority based on the FRs they support

### 4. Persona Annotations

If the spec has `risk-reviewer` in its personas list, adopt the **risk-reviewer** perspective:
- Review TRs for security and compliance completeness
- Add `[RISK]` annotations for missing security TRs, data handling gaps, audit requirements

### 5. Write TR Files

- Create the `technical/` directory in the spec folder if it doesn't exist
- Write each TR to `technical/TR-NNN-slug.md`

### 6. Resolve Open Questions

Before presenting the summary, scan all drafted TRs for open questions. If there are any:

1. Present all open questions in a single numbered list, grouped by TR
2. Ask the user to resolve them now
3. Update the TR files with answers — resolved questions become constraints, technical notes, or refined requirements
4. Remove resolved questions. If all questions in a TR are resolved, remove the Open Questions section entirely.

### 7. Present Summary

```
## Technical Requirements Derived

**Spec**: {specName}
**Total TRs**: {count}

### Priority Breakdown
| Priority | Count |
|----------|-------|
| Critical | N |
| High | N |
| Medium | N |
| Low | N |

### Traceability Matrix
| FR | Technical Requirements |
|----|----------------------|
| FR-001 | TR-001, TR-003 |
| FR-002 | TR-002 |

### Annotations
- {list any [RISK] annotations}

### Open Questions
- {list any open questions from TRs}

**Next step**: Run `/spec-dev:plan-work {path}` to create stories, spikes, and tasks.
```
