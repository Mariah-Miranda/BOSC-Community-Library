# Contributing to BOSC Community Library

Thank you for helping improve BOSC Community Library. This project welcomes documentation, resource catalog, accessibility, localization, and application improvements that support public access to education.

## Getting Started

1. Fork the repository.
2. Clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/BOSC-Community-Library.git
cd BOSC-Community-Library
```

3. Create a focused branch:

```bash
git checkout -b feature/your-feature-name
```

## How to Contribute

### Reporting Bugs

Search existing issues first. If the problem has not been reported, use the bug report template in [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md) and include clear reproduction steps.

### Suggesting Features

Open an issue with the `enhancement` label. Explain the public benefit, the affected users, and any documentation or licensing implications.

### Adding Resources

New educational resources should follow the schema in [RESOURCE_DATABASE.md](RESOURCE_DATABASE.md). Include a stable URL, language, category, license, and verification date.

### Submitting a Pull Request

1. Keep the pull request focused on one issue.
2. Update documentation when behavior, governance, links, or resource data changes.
3. Link the related issue using `Closes #issue-number`.
4. Complete the pull request template in [.github/pull_request_template.md](../.github/pull_request_template.md).

## Standards

- Use clear, inclusive, professional language.
- Prefer stable institutional URLs over temporary links.
- Document license information accurately.
- Avoid adding copyrighted resources unless their reuse permissions are clear.
- Use descriptive commit messages, such as `docs: add multilingual resources`.

## Commit Practices

Healthy commit history makes the project easier to audit, review, and adopt by
public institutions. Please follow these conventions:

- **Small, focused commits.** One logical change per commit. Avoid bulk
  uploads of an entire feature in a single commit; split documentation, code,
  and configuration changes when practical.
- **Conventional prefixes.** Use a short type prefix to make `git log` and
  `CHANGELOG.md` updates easier:
  - `feat:` new user-facing feature or resource
  - `fix:` bug fix or broken-link correction
  - `docs:` documentation or governance update
  - `refactor:` structural change without behavior change
  - `chore:` tooling, dependencies, configuration
  - `security:` security or licensing remediation
- **Imperative mood.** `feat: add Swahili reading catalog`, not
  `added Swahili reading catalog`.
- **Reference the issue.** Include `Refs #12` or `Closes #12` in the commit
  body so the issue tracker stays in sync.
- **Distribute work over time.** Reviewers prefer a steady cadence (several
  small commits across days or weeks) over a single large drop. This also
  reflects how real public-sector contributors typically work.

## Branching Model

- Branch names follow `type/short-description`, for example
  `feature/multilingual-catalog`, `fix/broken-readme-links`, or
  `refactor/docs-folder`.
- Long-running work happens on a feature branch and is rebased onto `main`
  before review. Avoid pushing directly to `main`.
- After merge, delete the feature branch to keep the repository tidy.

## Review Process

All pull requests require at least one maintainer review before merging.
Maintainers may request changes for accuracy, accessibility, tone, licensing
clarity, or maintainability. Significant changes (license, governance,
trademark, public-sector commitments) follow the supermajority rule defined in
[`GOVERNANCE.md`](GOVERNANCE.md).

## Local Development

If your contribution touches the React application:

```bash
npm install
npm run dev      # local dev server at http://localhost:5173/
npm run build    # production build (must succeed before opening a PR)
```

Documentation-only contributions do not need to run the build, but verifying
internal Markdown links is encouraged.
