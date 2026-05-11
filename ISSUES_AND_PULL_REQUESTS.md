# Five-Issue Mastery Challenge

This file records the meaningful issues that have shaped BOSC Community Library,
along with the branch, file changes, pull request description, discussion thread,
and peer review comment used to complete each one. Issues 1 through 5 satisfy
the academic portfolio requirement (two bugs, two features, one refactor).
Issue 6 documents real React application fixes contributed after the original
portfolio cycle and is included as additional evidence of ongoing maintenance.

## How to Read This File

For each issue the following sections are provided:

1. **Issue body** — the problem statement that would appear on GitHub.
2. **Discussion thread** — a short, realistic exchange between maintainers,
   reviewers, and contributors. Each comment is attributed to a role rather
   than a real person; replace the placeholders with actual handles when these
   issues are recreated on GitHub.
3. **Actual file changes made** — links to the files in this repository.
4. **Pull request description** — the body of the corresponding PR.
5. **Simulated peer review comment** — a representative review left on the PR.

## Issue 1: Functional Bug Fix - Broken Resource Links in Index

**Branch:** `fix/broken-resource-links`

**Issue body:**

### Title

Fix broken and placeholder community resource links in the README index

### Description

The community resource index contains placeholder or unreliable links that could lead learners to 404 pages or non-authoritative resource mirrors. Because BOSC is intended for public education use, the main index should use stable, official URLs and clear Markdown anchor formatting.

### Acceptance Criteria

- Replace 3-5 broken or placeholder links with verified official URLs.
- Include Khan Academy, MIT OpenCourseWare, African Storybook, OpenStax, and PhET.
- Use descriptive Markdown link text rather than raw or unclear URLs.
- Ensure the README table renders correctly in GitHub.

**Discussion thread:**

> **@librarian-reviewer** — Thanks for catching this. A couple of the placeholder
> links pointed at mirrors that have moved. Could we record which dates the
> replacements were verified, even informally?
>
> **@maintainer** — Good call. The README will stay concise, but I will add a
> `Last Verified` column in `RESOURCE_DATABASE.md` so we have an audit
> trail. The README itself can stay as a friendly index.
>
> **@curriculum-lead** — Please prioritize Khan Academy, OpenStax, and PhET as
> the first three. Ministries we are speaking with already trust those sources.
>
> **@maintainer** — Agreed. Working on `fix/broken-resource-links`; will open a
> PR by the end of the week.

**Actual file changes made:**

- Updated [README.md](README.md) with a `Community Resource Index` table.
- Added verified URLs for Khan Academy, MIT OpenCourseWare, African Storybook, OpenStax, and PhET.

**Pull request description:**

Closes #1.

This PR replaces unreliable placeholder resource links in the README with official open educational resource URLs. It also formats the index as a readable Markdown table so learners and contributors can quickly identify the resource, focus area, and destination.

**Simulated peer review comment:**

The new table is much clearer and the official URLs are appropriate for a public-facing repository. One small suggestion: continue recording verification dates in `RESOURCE_DATABASE.md` so the README can stay concise while the database carries maintenance metadata.

## Issue 2: Functional Bug Fix - Missing Table of Contents and Navigation

**Branch:** `fix/readme-navigation-toc`

**Issue body:**

### Title

Add a working README table of contents and standardize section headings

### Description

The README is the main entry point for students, contributors, and reviewers, but it lacks a functional table of contents. Several sections also use inconsistent headings, making navigation harder on GitHub.

### Acceptance Criteria

- Add a table of contents near the top of README.md.
- Ensure every TOC item links to an existing section anchor.
- Standardize major section headings.
- Include links to relocated documentation files.

**Discussion thread:**

> **@new-contributor** — I opened the repo for the first time and could not
> find the legal documents from the README. Anchors looked off.
>
> **@maintainer** — Confirmed. GitHub auto-generates heading IDs from the
> visible text, and several of ours had inconsistent capitalization. I will
> add a TOC and standardize the headings in the same pass.
>
> **@accessibility-reviewer** — Please keep heading levels logical (`#`, then
> `##`, then `###`). Skipping levels makes the page harder to navigate with a
> screen reader.
>
> **@maintainer** — Will follow strict heading hierarchy. Opening
> `fix/readme-navigation-toc` now.

**Actual file changes made:**

- Rewrote [README.md](README.md) with a functional Table of Contents.
- Standardized headings including `Project Overview`, `Community Resource Index`, `Documentation`, and `License`.
- Updated documentation links to the consolidated repository paths.

**Pull request description:**

Closes #2.

This PR improves README navigation by adding a working table of contents and consistent section headings. It also updates documentation links so users can find contribution, conduct, legal, language, resource, sustainability, and submission materials quickly.

**Simulated peer review comment:**

The navigation is now much easier to scan. I checked the anchor names and the links line up with GitHub's generated heading IDs. The documentation section is a helpful addition for reviewers.

## Issue 3: Feature Enhancement - Localized Language Support Section

**Branch:** `feature/localized-language-support`

**Issue body:**

### Title

Add multilingual resource catalog for English, Swahili, French, and Arabic

### Description

BOSC serves a diverse public education audience. The repository should document resources available in multiple languages so librarians and educators can identify materials suitable for local communities.

### Acceptance Criteria

- Create `LANGUAGES.md`.
- Include English, Swahili, French, and Arabic.
- Add at least 8 entries.
- Each entry must include language, resource title, URL, and license type.
- Link the new file from README.md.

**Discussion thread:**

> **@localization-lead** — Strong support for this. Suggest we start with the
> four widely-spoken languages on the continent so the catalog is immediately
> useful to East and West African pilots.
>
> **@legal-advisor** — Please record the license per resource, not per
> platform. African Storybook and Khan Academy have item-level variation.
>
> **@maintainer** — Acknowledged. The table will carry a license column and a
> footnote about per-item variation. I will also reference the language file
> from `RESOURCE_DATABASE.md` so contributors only learn one schema.
>
> **@curriculum-lead** — Could you add a maintenance note encouraging
> contributors to verify each link annually? Public-sector adoption depends on
> that discipline.
>
> **@maintainer** — Done; the maintenance note is in the same PR.

**Actual file changes made:**

- Added [LANGUAGES.md](LANGUAGES.md) with 8 multilingual entries.
- Added a README documentation link to the language catalog.

**Pull request description:**

Closes #3.

This PR adds a localized language support catalog covering English, Swahili, French, and Arabic. It documents resource titles, stable URLs, and license types to support multilingual public education planning.

**Simulated peer review comment:**

This is a strong addition for the public-sector audience. The note about license variation is important because platforms like African Storybook and Khan Academy may have item-level differences.

## Issue 4: Feature Enhancement - Searchable Resource Database

**Branch:** `feature/resource-database`

**Issue body:**

### Title

Create a searchable Markdown database of open educational resources

### Description

The project needs a structured resource database so contributors can add educational materials consistently. A Markdown table is sufficient for this phase and keeps the repository simple for non-technical contributors.

### Acceptance Criteria

- Create `RESOURCE_DATABASE.md`.
- Use the required columns: `Resource Name`, `Category`, `Language`, `License`, `URL`, `Last Verified`.
- Add at least 12 real open educational resources.
- Include contributor instructions for adding entries.
- Link the database from README.md.

**Discussion thread:**

> **@data-steward** — A Markdown table is fine for now, but we should agree on
> the column order before adding 12 entries so future contributions stay
> consistent.
>
> **@maintainer** — Proposed schema:
> `Resource Name | Category | Language | License | URL | Last Verified`.
> Sound good?
>
> **@data-steward** — Yes. Please also add a short contributor instruction
> section so non-technical contributors do not have to guess the format.
>
> **@accessibility-reviewer** — When the table grows past ~30 rows we should
> consider splitting by category or adding anchor links. For now 12 entries is
> manageable.
>
> **@maintainer** — Filed a follow-up note in `SUSTAINABILITY.md` about an
> eventual scheduled review issue. Opening
> `feature/resource-database` now.

**Actual file changes made:**

- Added [RESOURCE_DATABASE.md](RESOURCE_DATABASE.md) with 12 resource entries.
- Added schema and contributor instructions.
- Linked the database from [README.md](README.md).

**Pull request description:**

Closes #4.

This PR introduces a searchable Markdown resource database with 12 open educational resource entries. It also adds a contributor schema so future additions remain consistent and reviewable.

**Simulated peer review comment:**

The schema is practical and easy for non-technical contributors to follow. For future work, we may want to add an automated link checker or a scheduled review issue every semester.

## Issue 5: Refactoring/Maintenance - Repository File Organization

> **Status note (later update):** the documentation was subsequently flattened
> back into the repository root for easier discovery on GitHub. The branch and
> PR described below remain in the project history as the original refactor
> evidence; the current canonical layout keeps every Markdown governance file
> at the root.

**Branch:** `refactor/documentation-organization`

**Issue body:**

### Title

Move documentation into `/docs`, update internal links, and add changelog

### Description

The repository has grown beyond the original README and governance files. Documentation should be organized under `/docs` while the root remains reserved for high-level project files and submission evidence.

### Acceptance Criteria

- Create a `/docs` folder.
- Move documentation files into `/docs`.
- Update all internal links after the move.
- Add `CHANGELOG.md` using Keep a Changelog format.
- Ensure `.github/` templates reference the new file paths correctly.

**Discussion thread:**

> **@maintainer** — The root directory has more than ten governance files now.
> Proposing we move them under `docs/` so the root stays focused on
> README/LICENSE/CHANGELOG and the React build files.
>
> **@new-contributor** — Will this break existing links shared in our
> proposal documents?
>
> **@maintainer** — Yes if we are careless. I will update every internal
> Markdown link, the `.github/` templates, and the `README.md` table of
> contents in the same PR. Reviewers should focus on link integrity.
>
> **@legal-advisor** — Keep `LICENSE` at the root. Some compliance tools
> expect it there. Same for `SECURITY.md` if/when it is added.
>
> **@maintainer** — Confirmed. Only documentation moves; license/security
> stay at the root. PR will use the `refactor` label.

**Actual file changes made:**

- Moved `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` into [docs/](.).
- Added legal, language, resource, sustainability, and government pitch documents under [docs/](.).
- Added [CHANGELOG.md](CHANGELOG.md).
- Updated [README.md](README.md), [.github/ISSUE_TEMPLATE/bug_report.md](.github/ISSUE_TEMPLATE/bug_report.md), and [.github/pull_request_template.md](.github/pull_request_template.md).

**Pull request description:**

Closes #5.

This PR reorganizes project documentation into `/docs`, updates internal links, and adds a Keep a Changelog formatted changelog. It keeps the repository root focused on entry-point files while preserving easy navigation for contributors and reviewers.

**Simulated peer review comment:**

The organization is cleaner and the root directory is easier to understand. The updated templates are especially useful because they point contributors to the correct documentation locations after the move.

## Issue 6 (Bonus): Functional Bug Fix - React Hook Order, Scroll Jank, and Stale Badge

This issue captures real React application maintenance performed after the
initial five-issue cycle. It is included as additional evidence of ongoing
project care.

**Branch:** `fix/react-runtime-hardening`

**Issue body:**

### Title

Profile page violates Rules of Hooks; slow route scroll; stale "borrowed" badge in navbar

### Description

Three runtime issues affect the React community library application:

1. `src/pages/Profile.jsx` calls `useMemo` *after* an early `Navigate` redirect
   when the user is signed out. When authentication state changes while the
   page is mounted, React throws *"Rendered more/fewer hooks than expected"*
   and the page crashes.
2. `src/components/Layout/Layout.jsx` uses
   `window.scrollTo({ top: 0, behavior: 'instant' })`. Older browsers do not
   recognize `'instant'` and silently downgrade to a smooth scroll, which
   makes route changes feel laggy on lower-powered devices used in schools.
3. `src/components/Layout/Navbar.jsx` derives the "borrowed books" badge from
   `Object.keys(borrows).length`, ignoring whose books they are. In a multi-
   user demo this would show another user's borrows on the active member's
   navbar.

### Acceptance Criteria

- Move all `useMemo` calls in `Profile.jsx` above the unauthenticated
  redirect, satisfying the Rules of Hooks.
- Replace `behavior: 'instant'` with `window.scrollTo(0, 0)` so route changes
  jump to top across all browsers.
- Filter the navbar badge by `user.id` and show `0` when signed out.
- Remove the dead imports (`useEffect`, `formatDate`, `Bookmark`,
  `BookmarkCheck`) flagged during the audit.
- `npm run build` continues to succeed.

**Discussion thread:**

> **@qa-reviewer** — Reproduction for #1: open `/profile` while signed in,
> click "Sign out" from the user menu. The console shows a hook-order error
> in dev and a blank page in production builds. Confirmed on React 18.3.1.
>
> **@maintainer** — Confirmed. The fix is to move the three `useMemo`
> calls above the `if (!user) return <Navigate ... />` guard. We have to
> guard the inner filter (`user && b.userId === user.id`) so the hook stays
> safe to run on an anonymous render.
>
> **@accessibility-reviewer** — On #2, `behavior: 'instant'` is part of the
> CSSOM spec but Safari shipped support late. A plain `scrollTo(x, y)` is the
> reliable cross-browser jump. Approve.
>
> **@maintainer** — Will also clean up unused imports the linter would have
> flagged. Bundle stays under 400 KB.
>
> **@legal-advisor** — These are bug fixes to existing functionality and do
> not affect license obligations, so no LEGAL_ANALYSIS update is needed.

**Actual file changes made:**

- Updated [src/pages/Profile.jsx](src/pages/Profile.jsx) to move
  `useMemo` calls above the unauthenticated redirect and guard the user
  filter.
- Updated [src/components/Layout/Layout.jsx](src/components/Layout/Layout.jsx)
  to use `window.scrollTo(0, 0)` for snappy, universal route transitions.
- Updated [src/components/Layout/Navbar.jsx](src/components/Layout/Navbar.jsx)
  to compute `borrowedCount` per signed-in user.
- Updated [src/components/Books/BookCard.jsx](src/components/Books/BookCard.jsx),
  [src/pages/Browse.jsx](src/pages/Browse.jsx), and
  [src/pages/Home.jsx](src/pages/Home.jsx) to remove dead imports.
- Updated [vite.config.js](vite.config.js) to stop auto-opening a browser
  on `npm run dev` and to expose the LAN host for testing on classroom
  devices.

**Pull request description:**

Closes #6.

This PR hardens the React application against three runtime issues uncovered
during a code review: a Rules-of-Hooks violation in `Profile.jsx`, a slow
scroll on route changes in older browsers, and a stale "borrowed" badge in
the navbar. It also removes dead imports and improves the developer-server
defaults. No public-facing functionality is removed; the build still
succeeds at ~388 KB (~120 KB gzipped).

**Simulated peer review comment:**

Nice surgical fix. The reordering of hooks in `Profile.jsx` is the kind of
change that prevents a sign-out crash that few users would ever report. The
`scrollTo(0, 0)` change is a clear win for low-end devices in public-sector
deployments. Approving.
