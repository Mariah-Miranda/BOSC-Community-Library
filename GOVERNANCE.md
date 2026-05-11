# Project Governance

BOSC Community Library is designed to operate as public-interest infrastructure
rather than as a personal repository. This document describes how decisions are
made, who is responsible for what, and how the project protects its independence
while remaining open to contribution.

It complements [`CONTRIBUTING.md`](CONTRIBUTING.md),
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md),
[`SUSTAINABILITY.md`](SUSTAINABILITY.md), and
[`LEGAL_ANALYSIS.md`](LEGAL_ANALYSIS.md).

## Guiding Principles

1. **Public benefit first.** Decisions are evaluated against their impact on
   educators, librarians, students, and public-sector adopters.
2. **Transparency.** Roadmaps, votes, and significant decisions are recorded in
   the repository where any contributor can read them.
3. **Reciprocity.** Improvements distributed to others must remain available
   under GPL-3.0, as described in `LEGAL_ANALYSIS.md`.
4. **Plural participation.** No single contributor, vendor, or institution can
   unilaterally control the project's direction.

## Roles

| Role | Responsibilities |
| --- | --- |
| **Project Steward** | Holds administrative access, enforces the Code of Conduct, signs releases, and arbitrates governance disputes that maintainers cannot resolve. |
| **Maintainers** | Triage issues, review PRs, merge changes that meet the Contributor Checklist, and keep the documentation accurate. |
| **Reviewers** | Provide technical or domain reviews (curriculum, accessibility, legal, localization) but do not have merge rights. |
| **Contributors** | Anyone who opens issues, drafts PRs, suggests resources, or improves documentation. |
| **Steering Group (proposed)** | A small panel of stakeholders (educator, librarian, legal advisor, ICT lead) that advises on roadmap priorities for public-sector adoption. |

Current role assignments are tracked in [`.github/CODEOWNERS`](.github/CODEOWNERS).

## Decision-Making

Most decisions are made through standard pull-request review. The project uses a
**lazy-consensus** model:

1. A proposal is opened as an issue, an RFC document committed to the
   repository, or a draft pull request.
2. Maintainers and interested contributors discuss publicly for at least
   72 hours (longer for significant changes).
3. If no maintainer raises a blocking concern within that window, the change
   may be merged.
4. A blocking concern must be explained in writing and tied to a principle in
   this document or a referenced governance file.

Significant decisions — license changes, governance changes, trademark policy,
removal of an existing public-sector commitment — require an **explicit
supermajority** of maintainers (two-thirds) recorded in the PR thread.

## Maintainer Onboarding and Offboarding

- A contributor may be nominated as a maintainer after sustained, high-quality
  participation (typically several months and multiple merged PRs).
- Nominations are made in a public issue and decided by the current
  maintainers via lazy consensus.
- Maintainers who are inactive for more than 12 months are moved to an
  *Emeritus* list. They keep credit but lose merge rights until they return.
- A maintainer may step down at any time by opening a PR that updates the
  governance and `CODEOWNERS` files.

## Conflict Resolution

The project follows a three-step process:

1. **Direct conversation** between the contributors involved, in good faith.
2. **Maintainer mediation** through a private channel if direct conversation
   fails. The Code of Conduct applies throughout.
3. **Steward decision** as a final escalation. The steward's decision is
   recorded publicly with reasoning, except where doing so would expose
   private information.

## Trademark and Identity

The name "BOSC Community Library" and any future logos are governed separately
from the GPL-3.0 license, as explained in
[`LEGAL_ANALYSIS.md`](LEGAL_ANALYSIS.md). Forks are welcome under GPL-3.0,
but only the official project may present itself as "BOSC Community Library" in
public communications.

If the project transitions to a foundation or university-hosted steering
committee (see [`SUSTAINABILITY.md`](SUSTAINABILITY.md)), trademarks and
release signing should move to that body.

## Amending This Document

Changes to `GOVERNANCE.md` follow the **explicit supermajority** rule above.
Editorial typo fixes are exempt and may be merged through normal review.
