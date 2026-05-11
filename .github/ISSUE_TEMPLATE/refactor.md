---
name: Refactor / Maintenance
about: Propose a structural, organizational, or maintenance improvement
title: "[REFACTOR] "
labels: refactor, maintenance
assignees: ""
---

## Motivation

Why does the project benefit from this refactor or maintenance work? Examples
include clarity for new contributors, scalability of the folder structure,
removing dead code, link verification, accessibility hygiene, or dependency
upgrades.

## Scope

List the files, folders, or systems affected. Be explicit about what is
**not** in scope so reviewers can focus their attention.

- In scope: `...`
- Out of scope: `...`

## Risks and Mitigations

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Broken internal links | Medium | Update all `[]()` references in the same PR |
| Build regression | Low | Run `npm run build` before opening the PR |

## Acceptance Criteria

- [ ] No user-facing functionality is removed.
- [ ] Internal links, imports, and templates are updated consistently.
- [ ] `npm run build` succeeds.
- [ ] Governance files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
      `.github/` templates) still resolve.
- [ ] `CHANGELOG.md` updated under the appropriate section.

## Additional Context

Add diagrams, before/after structure trees, or links to related issues.
