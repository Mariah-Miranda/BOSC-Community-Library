# Security and Responsible Disclosure Policy

BOSC Community Library is intended for public-sector and educational use. Even
small security or licensing issues can affect schools, libraries, and the
learners who depend on the project. This document explains how to report
problems responsibly.

## Scope

This policy covers:

- The React application in `src/` and its build configuration.
- The documentation and resource catalogs in `docs/`.
- The contributor templates in `.github/`.
- Any third-party resource link added to the catalog that turns out to be
  malicious, misleading, or licensed in a way the project cannot honor.

It does not cover external sites we link to, but we will remove or replace
links once a credible issue is reported.

## Supported Versions

| Version | Supported |
| --- | --- |
| `main` (latest) | Yes |
| Older tagged releases | Best effort, security fixes only |

## How to Report

Please **do not open a public GitHub issue** for a suspected vulnerability or a
copyright/license violation. Instead, contact the maintainers privately:

1. Email the maintainer (replace with the project email once a project mailbox
   exists): `security@biosc.library`.
2. Provide:
   - A description of the issue and its potential impact.
   - Steps to reproduce, or a link to the affected file or page.
   - Your name and (optional) affiliation, so we can credit you if you wish.
3. Expect an acknowledgment within **5 working days** and an initial assessment
   within **15 working days**.

If the maintainer email is unreachable, use a direct message to the repository
owner on GitHub instead. Do not include exploit details in a public channel.

## What Happens Next

1. Maintainers triage the report and confirm the impact.
2. If valid, we open a private branch, prepare a fix, and coordinate disclosure.
3. We publish an entry in `CHANGELOG.md` under `Security` once the fix is
   released.
4. Public-sector partners who have deployed the project are notified through the
   channels established in the governance documents.

## Recognition

We are happy to credit reporters in `CHANGELOG.md` or a `SECURITY-HALL-OF-FAME`
section unless they prefer to remain anonymous.

## Out-of-Scope Findings

- Reports based on outdated forks that the project does not control.
- Reports that ask for changes to general public policy rather than to the
  project itself.
- Reports that are gated behind a paid disclosure service. The project will
  acknowledge such reports but cannot pay third-party brokers.
