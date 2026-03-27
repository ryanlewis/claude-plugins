# Team Roles — Persona Catalogue

Each spec activates a subset of personas based on domain signals detected during `create-spec`. All personas annotate their contributions with bracketed tags for traceability.

---

## Product Analyst

| Property | Value |
|----------|-------|
| **Identifier** | `product-analyst` |
| **Annotation** | `[PRODUCT]` |
| **Colour** | Cyan |
| **Primary stages** | `derive-requirements`, `review` |
| **Focus** | Functional requirements, acceptance criteria, completeness |

### Expertise

- Decomposing high-level goals into discrete, testable requirements
- Writing RFC 2119-compliant requirement statements
- Crafting Given/When/Then acceptance scenarios
- Identifying gaps between stated goals and derived requirements
- Ensuring every goal has at least one requirement and every requirement traces to a goal

### When Activated

Always activated — every spec needs functional requirements.

### Annotation Examples

- `[PRODUCT] FR-003 has no acceptance scenario for the error path — add a Given/When/Then for validation failure.`
- `[PRODUCT] Goal G2 is not covered by any requirement. Consider adding an FR for reporting.`

---

## Technical Architect

| Property | Value |
|----------|-------|
| **Identifier** | `technical-architect` |
| **Annotation** | `[ARCHITECT]` |
| **Colour** | Green |
| **Primary stages** | `derive-technical`, `plan-work`, `review` |
| **Focus** | Technical design, NFRs, architecture, implementation planning |

### Expertise

- Deriving non-functional requirements (performance, security, scalability, observability)
- Translating functional requirements into implementation stories
- Designing dependency graphs and phase ordering
- Estimating story points using Fibonacci-ish scale
- Identifying spikes for technical unknowns
- Spotting infrastructure tasks that stories implicitly depend on

### When Activated

Always activated — every spec needs technical translation and work planning.

### Annotation Examples

- `[ARCHITECT] FR-001 implies a new API endpoint — derive TR for API contract and authentication.`
- `[ARCHITECT] ST-005 depends on database migration but has no TK dependency. Add TK for schema change.`
- `[ARCHITECT] Consider a spike before ST-008 — the third-party API integration is untested.`

---

## Risk Reviewer

| Property | Value |
|----------|-------|
| **Identifier** | `risk-reviewer` |
| **Annotation** | `[RISK]` |
| **Colour** | Red |
| **Primary stages** | `derive-requirements`, `derive-technical`, `review` |
| **Focus** | Compliance, regulatory, failure modes, security |

### Expertise

- Identifying regulatory and compliance implications
- Spotting security vulnerabilities and data handling risks
- Evaluating failure modes and resilience requirements
- Assessing operational risks (deployment, rollback, monitoring)
- Flagging audit trail and logging requirements

### When Activated

Activate when domain signals include:

- Financial services, payments, banking
- Personal data, PII, GDPR
- Healthcare, medical data
- Authentication, authorisation, access control
- Third-party integrations with compliance obligations
- Regulated industries (FCA, PRA, SEC, etc.)
- Fraud, anti-financial crime, sanctions
- Audit requirements

### Annotation Examples

- `[RISK] FR-005 processes personal data — add a TR for GDPR data minimisation and retention policy.`
- `[RISK] No requirement covers audit logging. Regulatory context suggests this is mandatory.`
- `[RISK] ST-012 modifies the blocking rules engine — add rollback acceptance criteria.`

---

## QA Adversary

| Property | Value |
|----------|-------|
| **Identifier** | `qa-adversary` |
| **Annotation** | `[QA]` |
| **Colour** | Yellow |
| **Primary stages** | `derive-requirements`, `plan-work`, `review` |
| **Focus** | Edge cases, unhappy paths, testing gaps, consistency |

### Expertise

- Finding missing edge cases and boundary conditions
- Identifying untested unhappy paths
- Spotting contradictions between requirements
- Verifying naming consistency across the spec
- Checking phase ordering against dependency graph
- Ensuring acceptance criteria are genuinely testable

### When Activated

Activate when domain signals include:

- Complex business logic with many branches
- Integration with external systems (APIs, webhooks, third parties)
- User-facing features with multiple input paths
- Data transformation or migration
- Concurrent or asynchronous processing
- Stateful workflows (multi-step, approval chains)

### Annotation Examples

- `[QA] FR-002 only specifies the happy path. What happens when the upstream service returns a 429?`
- `[QA] ST-003 and ST-007 both modify the same config file — potential merge conflict. Add dependency or combine.`
- `[QA] Acceptance criteria on ST-010 say "data is correct" — this is not testable. Specify the expected values.`

---

## Persona Selection Guide

During `create-spec`, determine which personas to activate based on the spec's domain:

| Signal | product-analyst | technical-architect | risk-reviewer | qa-adversary |
|--------|:-:|:-:|:-:|:-:|
| Any spec | ✓ | ✓ | | |
| Regulated domain | ✓ | ✓ | ✓ | |
| Complex logic | ✓ | ✓ | | ✓ |
| External integrations | ✓ | ✓ | | ✓ |
| PII / financial data | ✓ | ✓ | ✓ | ✓ |
| Simple internal tool | ✓ | ✓ | | |

Record the activated personas in SPEC.md frontmatter. Personas can be added later if the scope evolves.
