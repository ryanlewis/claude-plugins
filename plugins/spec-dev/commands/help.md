---
description: Show spec workflow status and next step
allowed-tools: Read, Glob, Grep
argument-hint: [spec-folder]
---

Detect the current state of the spec-driven development pipeline and advise the user on what to do next.

## Steps

1. Determine the spec folder:
   - If `$ARGUMENTS` is provided, use it as the spec folder path
   - Otherwise, search the current working directory for a `SPEC.md` file using Glob (`**/SPEC.md`)
   - If multiple found, list them and ask the user to specify

2. Scan for artifacts and build a status summary:
   - Check for `SPEC.md` in the spec folder
   - Check for `DISCOVERY.md` in the spec folder
   - Count files matching `requirements/FR-*.md` and note the ID range (e.g., "FR-001 through FR-007")
   - Count files matching `technical/TR-*.md` and note the ID range
   - Count files matching `stories/ST-*.md` and note the ID range
   - Count files matching `spikes/SP-*.md` and note the ID range
   - Count files matching `tasks/TK-*.md` and note the ID range
   - Check for `REVIEW.md`

3. Determine the current stage and next step:
   - **No SPEC.md found** → "Start with `/spec-dev:explore` for discovery or `/spec-dev:create-spec` to begin"
   - **SPEC.md exists, no `requirements/`** → "Next: `/spec-dev:derive-requirements`"
   - **FRs exist, no `technical/`** → "Next: `/spec-dev:derive-technical`"
   - **TRs exist, no `stories/`** → "Next: `/spec-dev:plan-work`"
   - **Stories exist, no REVIEW.md** → "Next: `/spec-dev:refine` to simulate implementation and sharpen work items, or `/spec-dev:review` for formal consistency review"
   - **REVIEW.md exists** → "Spec complete. Review REVIEW.md for findings."

4. Present the status:

```
## Spec Status: {specName}

| Artifact | Count | Range |
|----------|-------|-------|
| DISCOVERY.md | ✓ / ✗ | |
| SPEC.md | ✓ / ✗ | |
| Functional Requirements | N | FR-001 – FR-NNN |
| Technical Requirements | N | TR-001 – TR-NNN |
| Stories | N | ST-001 – ST-NNN |
| Spikes | N | SP-001 – SP-NNN |
| Tasks | N | TK-001 – TK-NNN |
| REVIEW.md | ✓ / ✗ | |

**Current stage**: {stage}
**Next step**: {recommendation}
```

5. List all available commands with one-line descriptions:

```
## Available Commands

| Command | Description |
|---------|-------------|
| `/spec-dev:help` | Show workflow status and next step |
| `/spec-dev:explore` | Lightweight exploration, no files created |
| `/spec-dev:create-spec` | Interactive discovery → SPEC.md |
| `/spec-dev:derive-requirements` | Decompose goals into functional requirements |
| `/spec-dev:derive-technical` | Derive technical requirements from FRs |
| `/spec-dev:plan-work` | Create stories, spikes, and tasks |
| `/spec-dev:refine` | Simulate implementation to sharpen work items |
| `/spec-dev:review` | Three-dimensional consistency review |
```
