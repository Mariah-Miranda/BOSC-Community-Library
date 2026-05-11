# Changelog

All notable changes to BOSC Community Library are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows GPL-3.0 licensing.

## [Unreleased]

### Added

- Added GPL-3.0 license text in `LICENSE`.
- Added legal rationale in `LEGAL_ANALYSIS.md`.
- Added multilingual resource catalog in `LANGUAGES.md`.
- Added searchable open educational resource database in `RESOURCE_DATABASE.md`.
- Added five-issue portfolio evidence in `ISSUES_AND_PULL_REQUESTS.md`.
- Added sustainability strategy in `SUSTAINABILITY.md`.
- Added Ministry of Education adoption proposal in `GOVERNMENT_PITCH.md`.
- Added submission evidence template and reflective journal in `SUBMISSION_LOG.md`.
- Added project governance document in `GOVERNANCE.md`.
- Added responsible-disclosure policy in `SECURITY.md`.
- Added feature-request and refactor issue templates plus
  `.github/ISSUE_TEMPLATE/config.yml`.
- Added `.github/CODEOWNERS` for review accountability.
- Added discussion threads to every issue documented in
  `ISSUES_AND_PULL_REQUESTS.md`, plus a sixth issue covering the
  React runtime fixes below.

### Changed

- Rewrote `README.md` with a working table of contents, verified resource links, and updated documentation navigation.
- Flattened documentation layout: all governance, legal, and resource Markdown
  files now live at the repository root for easier discovery on GitHub.
- Updated GitHub issue and pull request templates to reference the documentation paths.
- Updated the project license statement from MIT to GPL-3.0.
- Expanded `CONTRIBUTING.md` with commit-practice conventions, a
  branching model, and local-development instructions for the React app.

### Fixed

- Replaced placeholder-style resource links with stable official URLs.
- Standardized README headings and internal anchors.
- `src/pages/Profile.jsx`: moved `useMemo` calls above the unauthenticated
  redirect to comply with React's Rules of Hooks. This prevents a crash when
  the authentication state changes while the profile page is mounted.
- `src/components/Layout/Layout.jsx`: replaced `scrollTo({ behavior: 'instant' })`
  with `scrollTo(0, 0)` so route changes feel snappy in every browser.
- `src/components/Layout/Navbar.jsx`: scoped the "borrowed" badge to the
  signed-in user instead of counting every borrow record.
- Removed dead imports in `BookCard.jsx`, `Browse.jsx`, and `Home.jsx`.
- Updated `vite.config.js` to stop auto-opening the browser on `npm run dev`
  and to expose the LAN host for classroom testing.
