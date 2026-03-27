# Frontmatter Schema Reference

Complete field definitions for every spec artifact type.

## SPEC.md

```yaml
---
specName: "Human-readable project name"
version: 1                          # Integer, incremented on amendment
status: draft | review | accepted
created: YYYY-MM-DD
lastAmended: YYYY-MM-DD
personas:                           # Dynamically chosen per spec
  - product-analyst
  - technical-architect
  - risk-reviewer
  - qa-adversary
---
```

### Field Rules

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `specName` | String | Yes | Display name for the specification |
| `version` | Integer | Yes | Starts at 1, increment on each amendment |
| `status` | Enum | Yes | `draft` → `review` → `accepted` |
| `created` | Date | Yes | ISO 8601 date |
| `lastAmended` | Date | Yes | Updated on every change |
| `personas` | List | Yes | Agent personas activated for this spec |

### Body Structure

1. **Vision** — one-paragraph north star
2. **Goals** — numbered G1, G2, G3... Each goal is a measurable outcome
3. **Success Criteria** — how to know the goals are met
4. **Scope** — explicit In-Scope / Out-of-Scope lists
5. **Constraints** — technical, regulatory, organisational limits
6. **Assumptions** — things taken as true without explicit confirmation (see Assumption Marking below)
7. **Context** — background, prior art, related systems. Include a **Key References** subsection listing files, docs, and materials reviewed during exploration/discovery.
8. **Amendment Log** — table of version, date, summary of change. **Note**: the amendment log is reserved for meaningful amendments once the spec moves past `draft` status. During drafting, the version stays at 1 and the log has a single "Initial draft" entry. Draft-stage iterations (adding/removing scope items, rewording goals) are normal editing — not amendments.
9. **Glossary** (optional) — domain terms with definitions

---

## Functional Requirement (FR-NNN-slug.md)

```yaml
---
id: FR-001
title: "Descriptive requirement title"
priority: Critical | High | Medium | Low
status: draft | review | accepted | amended
goals: [G1, G2]          # Traces back to SPEC.md goals
dependencies: []          # Other FR IDs this depends on
labels: []                # Free-form tags for filtering
---
```

### Field Rules

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | String | Yes | Format: `FR-NNN` (zero-padded to 3 digits) |
| `title` | String | Yes | Concise, descriptive title |
| `priority` | Enum | Yes | `Critical` > `High` > `Medium` > `Low` |
| `status` | Enum | Yes | `draft` → `review` → `accepted` → `amended` |
| `goals` | List | Yes | References to SPEC.md goal IDs |
| `dependencies` | List | No | Other FR IDs: `[FR-001, FR-003]` |
| `labels` | List | No | Free-form: `[auth, api, blocking]` |

### Granularity Heuristic

Each FR should be implementable in 1–3 stories. If an FR would need 5+ stories, split it into smaller FRs. If two FRs would always be implemented together as a single unit of work, combine them.

### Body Structure

1. **Description** — what the requirement is and why it matters
2. **Requirements** — RFC 2119 keywords in UPPERCASE (MUST, SHALL, SHOULD, MAY)
3. **Scenarios** — Given/When/Then acceptance scenarios (encouraged, not mandatory)
4. **Constraints** — specific limits or boundaries for this requirement
5. **Open Questions** — unresolved items needing stakeholder input. Remove this section entirely once all questions are resolved — don't leave "None" or "All resolved" as clutter.

---

## Technical Requirement (TR-NNN-slug.md)

```yaml
---
id: TR-001
title: "Descriptive technical requirement title"
priority: Critical | High | Medium | Low
status: draft | review | accepted | amended
requirements: [FR-001, FR-002]  # Traces to functional requirements
dependencies: []                # Other TR IDs
labels: []
---
```

### Field Rules

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | String | Yes | Format: `TR-NNN` (zero-padded to 3 digits) |
| `title` | String | Yes | Concise, descriptive title |
| `priority` | Enum | Yes | `Critical` > `High` > `Medium` > `Low` |
| `status` | Enum | Yes | `draft` → `review` → `accepted` → `amended` |
| `requirements` | List | Yes | FR IDs this derives from |
| `dependencies` | List | No | Other TR IDs: `[TR-001, TR-003]` |
| `labels` | List | No | Free-form tags |

### Body Structure

1. **Description** — what the technical requirement addresses
2. **Requirements** — RFC 2119 keywords (MUST, SHALL, SHOULD, MAY)
3. **Technical Notes** — architecture decisions, technology choices, patterns
4. **Constraints** — performance targets, compatibility, infrastructure limits
5. **Open Questions** — unresolved technical decisions. Remove this section entirely once all questions are resolved.

---

## Story (ST-NNN-slug.md)

```yaml
---
id: ST-001
title: "User-facing story title"
type: Story
priority: Critical | High | Medium | Low
points: 3                           # Fibonacci-ish: 1, 2, 3, 5, 8, 13
requirements: [FR-001, TR-002]      # Traces to both FR and TR
dependencies: [ST-001, TK-002]     # Other work item IDs
labels: []
phase: "1"                          # Delivery phase grouping
status: draft
---
```

## Spike (SP-NNN-slug.md)

```yaml
---
id: SP-001
title: "Research/investigation title"
type: Spike
priority: Critical | High | Medium | Low
points: 3
requirements: [FR-001]
dependencies: []
labels: []
phase: "0"                          # Spikes typically precede stories
status: draft
---
```

## Task (TK-NNN-slug.md)

```yaml
---
id: TK-001
title: "Technical/infrastructure task title"
type: Task
priority: Critical | High | Medium | Low
points: 2
requirements: [TR-001]
dependencies: []
labels: []
phase: "1"
status: draft
---
```

### Work Item Field Rules (shared across ST/SP/TK)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | String | Yes | Format: `ST-NNN`, `SP-NNN`, or `TK-NNN` |
| `title` | String | Yes | Concise, descriptive title |
| `type` | Enum | Yes | `Story`, `Spike`, or `Task` |
| `priority` | Enum | Yes | `Critical` > `High` > `Medium` > `Low` |
| `points` | Integer | Yes | Fibonacci-ish: 1, 2, 3, 5, 8, 13 |
| `requirements` | List | Yes | FR and/or TR IDs this implements |
| `dependencies` | List | No | Other work item IDs (ST/SP/TK) |
| `labels` | List | No | Free-form tags |
| `phase` | String | Yes | Delivery phase: `"0"`, `"1"`, `"2"`, etc. |
| `status` | Enum | Yes | `draft` (set by plugin; updated externally) |

### Body Structure — Stories

1. **User Story** — "As a [role], I want [goal], so that [benefit]"
2. **Acceptance Criteria** — checklist of verifiable conditions
3. **Solution** — high-level implementation approach
4. **Technical Notes** — specific implementation details
5. **Out of Scope** — what this story explicitly does NOT cover
6. **Risks / Open Questions** — uncertainties and mitigations

### Body Structure — Spikes

1. **Purpose** — what question the spike answers
2. **Acceptance Criteria** — what "done" looks like for a spike
3. **Approach** — investigation method
4. **Time-box** — maximum effort before escalating
5. **Expected Outputs** — deliverables (decision record, PoC, etc.)
6. **Risks / Open Questions**

### Body Structure — Tasks

1. **Purpose** — what the task accomplishes
2. **Acceptance Criteria** — verifiable completion conditions
3. **Solution** — implementation steps
4. **Technical Notes** — specifics
5. **Out of Scope**
6. **Risks / Open Questions**

---

## Conventions

### ID Formatting

- Always zero-pad to 3 digits: `FR-001`, not `FR-1`
- IDs are unique within their type namespace (FR, TR, ST, SP, TK)
- Slugs use kebab-case derived from the title: `FR-001-user-authentication.md`

### Priority Ordering

`Critical` > `High` > `Medium` > `Low`

**General definitions**:
- **Critical** — blocks the entire spec; must be resolved first
- **High** — core to the spec's goals; should be in phase 1
- **Medium** — important but not blocking; can defer to later phase
- **Low** — nice-to-have; could be cut without impacting goals

**FR-specific heuristics**:
- **Critical** — the system is non-functional without this FR. No workaround exists.
- **High** — core to a stated goal, but the system can technically function without it.
- **Medium** — improves the experience or covers an important edge case, but isn't goal-blocking.
- **Low** — nice-to-have. Could be cut without impacting stated goals.

**Work item heuristics** (ST/SP/TK):
- **Critical** — blocks other work items or the entire phase. On the critical path.
- **High** — required for the phase to deliver its stated value.
- **Medium** — improves quality or completeness but the phase delivers without it.
- **Low** — polish, optimisation, or nice-to-have.

### Points Scale

Fibonacci-ish scale reflecting relative effort:

| Points | Meaning |
|--------|---------|
| 1 | Trivial — config change, copy update |
| 2 | Small — single straightforward change |
| 3 | Medium — standard feature work |
| 5 | Large — multi-component, some unknowns |
| 8 | Very large — significant complexity |
| 13 | Epic-scale — should consider splitting |

### RFC 2119 Keywords

Use these keywords in UPPERCASE within requirement bodies:

- **MUST** / **SHALL** — absolute requirement
- **MUST NOT** / **SHALL NOT** — absolute prohibition
- **SHOULD** — recommended, but exceptions may exist with justification
- **SHOULD NOT** — discouraged, but exceptions may exist
- **MAY** — truly optional

### Dependency References

- Use short IDs: `[ST-001, TK-002]`
- Cross-type dependencies are valid: a story can depend on a task
- Circular dependencies indicate a design problem — flag in review

### Assumption Marking

Assumptions are things taken as true without explicit confirmation from the user or stakeholders. They carry risk — if wrong, they can invalidate requirements and stories downstream.

**Marker format**: `[ASSUMPTION]` — a bracketed tag, consistent with persona annotations (`[RISK]`, `[QA]`, etc.).

**Where assumptions appear**:

1. **SPEC.md — Assumptions section**: A dedicated section listing all spec-level assumptions with IDs (A1, A2, ...). Each assumption states what is assumed and why it matters.

2. **Inline in any artifact**: When an assumption influences a specific requirement, scenario, or story, mark it inline:
   ```
   - The system MUST retry failed webhook deliveries up to 3 times. `[ASSUMPTION: upstream supports idempotent delivery]`
   ```

3. **FR/TR/ST/SP/TK — Open Questions**: If an assumption is uncertain enough to be a risk, also list it as an open question referencing the assumption ID:
   ```
   - [ ] Validate A3: confirm upstream API supports idempotent delivery
   ```

**Rules**:
- Every assumption in SPEC.md gets a numbered ID: A1, A2, A3...
- Inline `[ASSUMPTION]` markers MUST include a brief description after the colon
- Assumptions that are later confirmed become facts — remove the marker and move to Context
- Assumptions that are invalidated trigger an amendment — update the spec version and amendment log
- During review, the `review` command checks for unvalidated assumptions and flags them
