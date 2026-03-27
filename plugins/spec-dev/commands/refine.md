---
description: Simulate implementation to sharpen work items
allowed-tools: Read, Glob, Grep, Write, Edit, AskUserQuestion, Agent
argument-hint: [spec-folder]
---

Simulate implementing the entire spec end-to-end. Where inconsistencies, gaps, or ambiguities surface, grill the user to resolve them — then amend the affected artefacts directly.

Load the spec-driven-dev skill and its reference files.

## Steps

### 1. Locate the Spec

- If `$ARGUMENTS` is provided, look for `SPEC.md` at that path
- Otherwise, search the current directory with Glob (`**/SPEC.md`)
- Verify work items exist (stories/, spikes/, tasks/)
- If work items are missing, tell the user to run `/spec-dev:plan-work` first

### 2. Read All Artifacts

- Read SPEC.md
- Read all FR files from `requirements/`
- Read all TR files from `technical/`
- Read all SP files from `spikes/`
- Read all TK files from `tasks/`
- Read all ST files from `stories/`

### 3. Build the Implementation Order

Construct the full execution sequence:

1. Parse the dependency graph from all work item `dependencies` fields
2. Sort all work items topologically within each phase:
   - Phase 0 spikes first
   - Phase 1 tasks and stories next
   - Phase 2+ items last
3. Within each phase, respect dependency ordering — if ST-003 depends on ST-001, implement ST-001 first
4. If circular dependencies exist, flag immediately

Present the implementation order to the user before proceeding.

### 4. Simulate and Grill

Walk through every work item in the implementation order. For each item, think through what implementing it would actually involve.

**Accumulate context as you go.** Maintain a running mental model of what has been built so far — what APIs exist, what data models are in place, what infrastructure is configured. Each subsequent item is evaluated against this accumulated state.

For each work item, assess:

- **Buildability** — Given what exists at this point in the sequence, can this actually be implemented? Are its dependencies sufficient, or does it implicitly need something not in the graph?
- **Clarity** — Is the solution approach specific enough to start coding? Are the acceptance criteria testable without interpretation? Would two developers implement this the same way?
- **Boundary conflicts** — Does this item's scope overlap with or contradict another item? Does it modify something a prior item established without acknowledging it?
- **Missing context** — Does it reference concepts, APIs, data models, or infrastructure that no prior item creates?
- **Sizing** — Does the point estimate feel right given the real implementation complexity?

**Cross-cutting concerns to track across the full simulation:**

- Data model evolution — do multiple stories assume different shapes for the same entity?
- API contract consistency — do producer and consumer stories agree on request/response shapes?
- Configuration and environment — do stories assume config or secrets that no task provisions?
- Error handling boundaries — where one story's error output becomes another story's input, are the contracts clear?
- Testing strategy — are there items that are practically untestable without infrastructure not yet provisioned?

#### When you hit a problem

Do NOT collect findings into a report. Instead, stop and grill the user immediately.

**Grilling style:**

- One or two sharp questions at a time — not a list
- Be specific: name the affected items by ID, quote the conflicting text, describe the concrete scenario where it breaks
- Follow the thread — dig deeper on the user's answer before moving on
- Challenge assumptions: "ST-003 says it'll call the payments API, but ST-001 doesn't create that API — is that assumed to exist already, or is there a missing task?"
- State your understanding and ask the user to correct it, rather than asking open-ended questions
- Be direct and concise — stress-test the spec, not the person

**After resolution:**

Once the user's answer resolves the ambiguity, immediately amend the affected artefacts (FRs, TRs, stories, spikes, tasks) using Edit. Then continue the simulation from where you left off, incorporating the resolution into your accumulated mental model.

### 5. Continue Until Complete

Keep walking through the implementation order until every item has been assessed. The process is iterative:

1. Simulate the next item(s) in sequence
2. If a problem surfaces → grill the user → amend artefacts → continue
3. If an item is clean → move on silently (don't narrate items that pass)

Only speak up when something needs resolving. Silence means the item passed.

### 6. Wrap Up

When the full simulation is complete, present a brief summary:

```
## Refinement Complete: {specName}

**Items assessed**: {count}
**Issues resolved**: {count}
**Artefacts amended**: {list of amended file paths}

{One-paragraph summary of the most significant changes made}

**Next step**: Run `/spec-dev:review {path}` for formal consistency review.
```
