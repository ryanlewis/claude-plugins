---
description: Three-dimensional consistency review
allowed-tools: Read, Glob, Grep, Write, Edit, Agent
argument-hint: [spec-folder]
---

Perform a comprehensive three-dimensional review of all spec artifacts and produce a REVIEW.md with findings and recommendations.

Load the spec-driven-dev skill and its reference files.

## Steps

### 1. Locate the Spec

- If `$ARGUMENTS` is provided, look for `SPEC.md` at that path
- Otherwise, search the current directory with Glob (`**/SPEC.md`)
- Verify all artifact types exist (SPEC.md, requirements/, technical/, stories/)
- If any are missing, tell the user which stages they need to complete first

### 2. Read All Artifacts

- Read SPEC.md
- Read all FR files from `requirements/`
- Read all TR files from `technical/`
- Read all ST files from `stories/`
- Read all SP files from `spikes/`
- Read all TK files from `tasks/`
- Read `${CLAUDE_PLUGIN_ROOT}/skills/spec-driven-dev/references/templates.md` for the REVIEW.md template

### 3. Dimension 1 — Completeness (Product Analyst)

Adopt the **product-analyst** perspective to assess:

- Does every goal in SPEC.md have at least one FR?
- Does every FR have at least one story, spike, or task that implements it?
- Does every TR have at least one work item?
- Are there orphaned work items that don't trace to any requirement?
- Are acceptance criteria present and testable for every story?

Annotate findings with `[PRODUCT]`.

### 4. Dimension 2 — Correctness (Technical Architect)

Adopt the **technical-architect** perspective to assess:

- Do stories actually implement the requirements they reference?
- Are dependency chains valid (no circular dependencies)?
- Does phase ordering respect the dependency graph?
- Are point estimates reasonable for the described scope?
- Are there missing infrastructure tasks that stories implicitly need?

Annotate findings with `[ARCHITECT]`.

### 5. Dimension 3 — Coherence (QA Adversary / Risk Reviewer)

Based on which personas are activated in the spec:

If **qa-adversary** is activated:
- Check naming consistency across all artifacts
- Look for contradictions between requirements
- Verify ID formatting (zero-padded, correct prefix)
- Check slug-to-title consistency
- Validate phase ordering logic

If **risk-reviewer** is activated:
- Verify security and compliance TRs are present where needed
- Check that sensitive stories have rollback criteria
- Ensure audit logging is covered where regulations require it

Annotate findings with `[QA]` and `[RISK]` respectively.

### 6. Assumption Audit

Scan SPEC.md for the Assumptions section and all artifacts for inline `[ASSUMPTION]` markers:

- List all assumptions with their current status (Unvalidated / Confirmed / Invalidated)
- Flag any `Unvalidated` assumptions that downstream requirements or stories depend on
- Check for inline `[ASSUMPTION: ...]` markers in FR, TR, and ST files that don't have a corresponding entry in SPEC.md
- Annotate findings with `[ASSUMPTION]` tags

Unvalidated assumptions that influence Critical or High priority requirements are hard blockers.

### 7. Build Traceability Matrix

Create a table mapping every requirement to its implementing work items:

| Requirement | Stories | Spikes | Tasks |
|-------------|---------|--------|-------|
| FR-001 | ST-001, ST-002 | | |
| TR-001 | ST-003 | SP-001 | TK-001 |

Flag any requirement with no coverage.

### 8. Generate Dependency Graph

Create a Mermaid diagram showing all work item dependencies.

### 9. Determine Overall Status

- **PASS** — no hard blockers, minor findings only
- **PASS WITH FINDINGS** — no hard blockers, but findings should be addressed
- **FAIL** — hard blockers exist that must be resolved before implementation

Hard blockers include:
- Goals with no requirement coverage
- Requirements with no story coverage
- Circular dependencies
- Contradictory requirements
- Unvalidated assumptions influencing Critical or High priority requirements

### 10. Write REVIEW.md

Write REVIEW.md to the spec folder root using the template from references. Include:
- Health summary (artifact counts, total points)
- Overall recommendation (PASS / PASS WITH FINDINGS / FAIL)
- Hard blockers (if any)
- Assumption audit (unvalidated count, any blocking assumptions)
- Findings per dimension ([PRODUCT], [ARCHITECT], [QA], [RISK], [ASSUMPTION])
- Traceability matrix
- Dependency graph

### 11. Present Summary

```
## Review Complete: {specName}

**Status**: {PASS / PASS WITH FINDINGS / FAIL}
**Hard Blockers**: {count}
**Unvalidated Assumptions**: {count} ({count influencing Critical/High requirements})
**Findings**: {count by dimension}

{One-paragraph recommendation}

Full review written to: {path}/REVIEW.md
```
