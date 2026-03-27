---
description: Decompose goals into functional requirements
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion, Agent
argument-hint: [spec-folder]
---

Derive functional requirements from a SPEC.md, producing FR-NNN files in the `requirements/` directory.

Load the spec-driven-dev skill and its reference files for templates and schemas.

## Steps

### 1. Locate the Spec

- If `$ARGUMENTS` is provided, look for `SPEC.md` at that path
- Otherwise, search the current directory with Glob (`**/SPEC.md`)
- If not found, tell the user to run `/spec-dev:create-spec` first

### 2. Read the Spec

- Read SPEC.md thoroughly
- Extract: goals (G1, G2, ...), scope, constraints, personas, context
- Read `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/frontmatter-schema.md` for FR field definitions
- Read `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/templates.md` for FR template

### 3. Derive Functional Requirements

Adopt the **product-analyst** perspective to decompose goals into functional requirements. (This means working inline with the product-analyst's lens — functional completeness, acceptance criteria, user-facing behaviours — not literally spawning a subagent, which would lose conversation context.)

- For each goal, identify the discrete user-facing behaviours needed
- **Granularity heuristic**: each FR should be implementable in 1–3 stories. If an FR would need 5+ stories, split it. If two FRs would always be implemented together as a single unit, combine them.
- Draft an FR for each behaviour with:
  - Unique ID (FR-001, FR-002, ...) zero-padded to 3 digits
  - RFC 2119 requirement statements (MUST, SHALL, SHOULD, MAY in UPPERCASE)
  - At least one Given/When/Then scenario per FR
  - Goal traceability in frontmatter `goals` field
  - Priority assignment (Critical/High/Medium/Low)
- Cross-reference: every goal MUST have at least one FR

### 4. Priority Assignment

Assign priorities using these FR-specific heuristics:

- **Critical** — the system is non-functional without this FR. No workaround exists.
- **High** — core to a stated goal, but the system can technically function without it.
- **Medium** — improves the experience or covers an important edge case, but isn't goal-blocking.
- **Low** — nice-to-have. Could be cut without impacting stated goals.

### 5. Persona Annotations

Adopt each activated persona's perspective in turn:

If the spec has `risk-reviewer` in its personas list:
- Review the drafted FRs for compliance, regulatory, and security implications
- Add `[RISK]` annotations where requirements are missing or insufficient

If the spec has `qa-adversary` in its personas list:
- Review the drafted FRs for edge cases and untested paths
- Add `[QA]` annotations for missing scenarios and testability issues

### 6. Write FR Files

- Create the `requirements/` directory in the spec folder if it doesn't exist
- Write each FR to `requirements/FR-NNN-slug.md`
- Slugs are kebab-case derived from the title

### 7. Resolve Open Questions

Before presenting the summary, scan all drafted FRs for open questions. If there are any:

1. Present all open questions in a single numbered list, grouped by FR
2. Ask the user to resolve them now (batch resolution)
3. Update the FR files with answers — resolved questions become constraints, context, or refined requirements
4. Remove resolved questions from the Open Questions section. If all questions in an FR are resolved, remove the Open Questions section entirely (don't leave "None" or "All resolved")

If no open questions exist, skip this step.

### 8. Present Summary

```
## Requirements Derived

**Spec**: {specName}
**Total FRs**: {count}

### Priority Breakdown
| Priority | Count |
|----------|-------|
| Critical | N |
| High | N |
| Medium | N |
| Low | N |

### Goal Coverage
| Goal | Requirements |
|------|-------------|
| G1 | FR-001, FR-002 |
| G2 | FR-003 |

### Annotations
- {list any [RISK] or [QA] annotations}

### Open Questions
- {list any open questions from FRs}

**Next step**: Run `/spec-dev:derive-technical {path}` to derive technical requirements.
```
