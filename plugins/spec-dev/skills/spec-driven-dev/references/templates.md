# Spec Artifact Templates

Copy and adapt these templates when creating spec artifacts. Replace placeholders in `{{curly braces}}`.

---

## DISCOVERY.md

```markdown
# Discovery Notes: {{topic}}

## Key Findings

- {{Bullet summary of what was learned — vision, goals, constraints, context}}

## Materials Reviewed

- `{{path/to/file}}` — {{brief note on what was relevant}}
- `{{path/to/another-file}}` — {{brief note}}

## Open Threads

- {{Questions that surfaced but weren't resolved}}
- {{Areas that need deeper investigation}}

## Suggested Personas

- **product-analyst** — always (functional requirements)
- **technical-architect** — always (technical design)
- {{risk-reviewer — if regulated domain, PII, compliance signals}}
- {{qa-adversary — if complex logic, integrations, stateful workflows}}
```

---

## SPEC.md

```markdown
---
specName: "{{Project Name}}"
version: 1
status: draft
created: {{YYYY-MM-DD}}
lastAmended: {{YYYY-MM-DD}}
personas:
  - product-analyst
  - technical-architect
---

# {{Project Name}}

## Vision

{{One-paragraph north star describing the desired end state.}}

## Goals

- **G1**: {{First measurable goal}}
- **G2**: {{Second measurable goal}}
- **G3**: {{Third measurable goal}}

## Success Criteria

- [ ] {{Criterion tied to G1}}
- [ ] {{Criterion tied to G2}}
- [ ] {{Criterion tied to G3}}

## Scope

### In Scope

- {{Item 1}}
- {{Item 2}}

### Out of Scope

- {{Item 1}}
- {{Item 2}}

## Constraints

- {{Technical constraint}}
- {{Regulatory constraint}}
- {{Organisational constraint}}

## Assumptions

| ID | Assumption | Impact if Wrong | Status |
|----|-----------|-----------------|--------|
| A1 | {{What is assumed to be true}} | {{What breaks if this is wrong}} | Unvalidated |
| A2 | {{What is assumed to be true}} | {{What breaks if this is wrong}} | Unvalidated |

> **Convention**: Assumptions are marked with `[ASSUMPTION]` throughout the spec and its artifacts. Use `[ASSUMPTION: brief description]` inline where an assumption influences a specific requirement or decision. Status is one of: `Unvalidated`, `Confirmed`, `Invalidated`.

## Context

{{Background information, prior art, related systems, and motivation for this work.}}

### Key References

| File | Relevance |
|------|-----------|
| `{{path/to/file}}` | {{What it contains and why it matters}} |
| `{{path/to/another-file}}` | {{What it contains}} |

## Amendment Log

> **Convention**: The amendment log records meaningful changes once the spec moves past `draft` status. Draft-stage iterations are normal editing and don't need entries. Version stays at 1 throughout drafting.

| Version | Date | Summary |
|---------|------|---------|
| 1 | {{YYYY-MM-DD}} | Initial draft |

## Glossary

| Term | Definition |
|------|------------|
| {{Term}} | {{Definition}} |
```

---

## Functional Requirement (FR-NNN-slug.md)

```markdown
---
id: {{FR-NNN}}
title: "{{Requirement title}}"
priority: {{Critical | High | Medium | Low}}
status: draft
goals: [{{G1, G2}}]
dependencies: []
labels: []
---

# {{FR-NNN}}: {{Requirement title}}

## Description

{{What this requirement is and why it matters. Link back to the goals it serves.}}

## Requirements

- The system MUST {{core behaviour}}.
- The system SHOULD {{recommended behaviour}}.
- The system MAY {{optional behaviour}}.

## Scenarios

### {{Scenario name}}

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected outcome}}

### {{Scenario name — unhappy path}}

**Given** {{precondition}}
**When** {{error condition}}
**Then** {{expected error handling}}

## Constraints

- {{Specific limit or boundary}}

## Open Questions

<!-- Remove this section entirely once all questions are resolved. -->

- [ ] {{Unresolved question needing stakeholder input}}
```

---

## Technical Requirement (TR-NNN-slug.md)

```markdown
---
id: {{TR-NNN}}
title: "{{Technical requirement title}}"
priority: {{Critical | High | Medium | Low}}
status: draft
requirements: [{{FR-001, FR-002}}]
dependencies: []
labels: []
---

# {{TR-NNN}}: {{Technical requirement title}}

## Description

{{What this technical requirement addresses and which functional requirements it supports.}}

## Requirements

- The implementation MUST {{technical constraint}}.
- The implementation SHOULD {{recommended approach}}.
- The implementation MAY {{optional approach}}.

## Technical Notes

{{Architecture decisions, technology choices, patterns to follow, relevant prior art.}}

## Constraints

- {{Performance target}}
- {{Compatibility requirement}}
- {{Infrastructure limit}}

## Open Questions

<!-- Remove this section entirely once all questions are resolved. -->

- [ ] {{Unresolved technical decision}}
```

---

## Story (ST-NNN-slug.md)

```markdown
---
id: {{ST-NNN}}
title: "{{Story title}}"
type: Story
priority: {{Critical | High | Medium | Low}}
points: {{1 | 2 | 3 | 5 | 8 | 13}}
requirements: [{{FR-001, TR-002}}]
dependencies: []
labels: []
phase: "{{1}}"
status: draft
---

# {{ST-NNN}}: {{Story title}}

## User Story

As a {{role}}, I want {{goal}}, so that {{benefit}}.

## Acceptance Criteria

- [ ] {{Verifiable condition 1}}
- [ ] {{Verifiable condition 2}}
- [ ] {{Verifiable condition 3}}

## Solution

{{High-level implementation approach — what to build, where, and how.}}

## Technical Notes

{{Specific implementation details, API contracts, data models, integration points.}}

## Out of Scope

- {{What this story explicitly does NOT cover}}

## Risks / Open Questions

- [ ] {{Risk or uncertainty with mitigation}}
```

---

## Spike (SP-NNN-slug.md)

```markdown
---
id: {{SP-NNN}}
title: "{{Spike title}}"
type: Spike
priority: {{Critical | High | Medium | Low}}
points: {{1 | 2 | 3 | 5 | 8}}
requirements: [{{FR-001}}]
dependencies: []
labels: []
phase: "{{0}}"
status: draft
---

# {{SP-NNN}}: {{Spike title}}

## Purpose

{{What question this spike answers and why the answer is needed before implementation.}}

## Acceptance Criteria

- [ ] {{What "done" looks like — a decision record, PoC, or recommendation}}

## Approach

{{Investigation method — code review, prototype, vendor evaluation, etc.}}

## Time-box

{{Maximum effort (e.g., "2 days" or "3 points") before escalating or deciding with available information.}}

## Expected Outputs

- {{Deliverable 1 — e.g., decision record in ADR format}}
- {{Deliverable 2 — e.g., proof-of-concept branch}}

## Risks / Open Questions

- [ ] {{What could prevent the spike from reaching a conclusion}}
```

---

## Task (TK-NNN-slug.md)

```markdown
---
id: {{TK-NNN}}
title: "{{Task title}}"
type: Task
priority: {{Critical | High | Medium | Low}}
points: {{1 | 2 | 3 | 5 | 8}}
requirements: [{{TR-001}}]
dependencies: []
labels: []
phase: "{{1}}"
status: draft
---

# {{TK-NNN}}: {{Task title}}

## Purpose

{{What this task accomplishes and why it is necessary.}}

## Acceptance Criteria

- [ ] {{Verifiable condition 1}}
- [ ] {{Verifiable condition 2}}

## Solution

{{Step-by-step implementation approach.}}

## Technical Notes

{{Specifics — scripts, configurations, commands, infrastructure changes.}}

## Out of Scope

- {{What this task does NOT cover}}

## Risks / Open Questions

- [ ] {{Risk or uncertainty}}
```

---

## REVIEW.md

```markdown
---
specName: "{{Project Name}}"
reviewDate: {{YYYY-MM-DD}}
status: {{pass | pass-with-findings | fail}}
---

# Specification Review: {{Project Name}}

## Health Summary

| Metric | Count |
|--------|-------|
| Functional Requirements | {{N}} |
| Technical Requirements | {{N}} |
| Stories | {{N}} |
| Spikes | {{N}} |
| Tasks | {{N}} |
| Total Points | {{N}} |
| Hard Blockers | {{N}} |

## Overall Recommendation

{{PASS / PASS WITH FINDINGS / FAIL — one-sentence summary.}}

## Hard Blockers

{{List any issues that MUST be resolved before implementation begins. If none, state "None identified."}}

## Completeness (Product Analyst)

{{Every FR/TR has story coverage? Gaps?}}

### Findings

- `[PRODUCT]` {{Finding 1}}
- `[PRODUCT]` {{Finding 2}}

## Correctness (Technical Architect)

{{Stories match requirement intent? Dependencies valid?}}

### Findings

- `[ARCHITECT]` {{Finding 1}}
- `[ARCHITECT]` {{Finding 2}}

## Coherence (QA Adversary / Risk Reviewer)

{{Consistent naming? No contradictions? Valid phase ordering?}}

### Findings

- `[QA]` {{Finding 1}}
- `[RISK]` {{Finding 2}}

## Traceability Matrix

| Requirement | Stories | Spikes | Tasks |
|-------------|---------|--------|-------|
| {{FR-001}} | {{ST-001, ST-002}} | | |
| {{TR-001}} | {{ST-003}} | {{SP-001}} | {{TK-001}} |

## Dependency Graph

\`\`\`mermaid
graph LR
  {{TK-001}} --> {{ST-001}}
  {{ST-001}} --> {{ST-003}}
\`\`\`
```
