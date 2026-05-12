# BOSC Community Library

BOSC Community Library is a public-sector, open educational resource repository and demonstration library application. It helps communities discover free learning materials, document licensing status, and coordinate contributions in a transparent open-source workflow.


## Table of Contents

- [Project Overview](#1-project-overview)
- [Community Resource Index](#2-community-resource-index)
- [Documentation](#3-documentation)
- [Features](#4-features)
- [Technology Stack](#5-technology-stack)
- [Getting Started](#6-getting-started)
- [Project Structure](#7-project-structure)
- [Demo Accounts](#8-demo-accounts)
- [License](#9-license)

## 1. Project Overview

The project combines a React-based community library prototype with a curated policy and documentation repository for public educational resources. Its governance model emphasizes transparency, civic reuse, contributor accountability, and careful documentation of open licenses.

## 2. Community Resource Index

The following links are verified starting points for community learning collections. Contributors should prefer stable institutional URLs and avoid placeholder domains.

| Resource | Focus Area | Link |
| --- | --- | --- |
| Khan Academy | K-12 mathematics, science, computing, humanities | https://www.khanacademy.org/ |
| MIT OpenCourseWare | University course materials | https://ocw.mit.edu/ |
| African Storybook | African-language literacy and storybooks | https://www.africanstorybook.org/ |
| OpenStax | Peer-reviewed textbooks | https://openstax.org/ |
| PhET Interactive Simulations | Science and mathematics simulations | https://phet.colorado.edu/ |

> Note: All links were verified for accessibility and accuracy in May 2026. Contributors should revalidate links periodically and update the "Last Verified" column.

## 3. Project Documentation & Governance

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Project Governance](GOVERNANCE.md)
- [Security and Responsible Disclosure](SECURITY.md)
- [Legal Analysis](LEGAL_ANALYSIS.md)
- [Language Support Catalog](LANGUAGES.md)
- [Resource Database](RESOURCE_DATABASE.md)
- [Issue and Pull Request Portfolio](ISSUES_AND_PULL_REQUESTS.md)
- [Sustainability Strategy](SUSTAINABILITY.md)
- [Government Adoption Pitch](GOVERNMENT_PITCH.md)
- [Changelog](CHANGELOG.md)
- [Submission Log](SUBMISSION_LOG.md)

## 4. Features

- Responsive community library interface for browsing books, events, member profiles, donations, and reviews.
- Curated educational resource index with stable links and documented license expectations.
- Contributor workflow templates for bug reports, pull requests, and documentation updates.
- Public-sector policy documents covering licensing, sustainability, government adoption, and governance reflection.

## 5. Technology Stack

- [React 18](https://react.dev/) and [Vite 5](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- Markdown documentation for governance, resource catalogs, and portfolio evidence

## 6. Getting Started

```bash
npm install
npm run dev
```

The app runs at <http://localhost:5173>.

To build for production:

```bash
npm run build
npm run preview
```

## 7. Project Structure

```text
.github/
  CODEOWNERS
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
    refactor.md
    config.yml
  pull_request_template.md
public/
src/
  components/
  context/
  data/
  pages/
  utils/
CHANGELOG.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
GOVERNANCE.md
GOVERNMENT_PITCH.md
ISSUES_AND_PULL_REQUESTS.md
LANGUAGES.md
LEGAL_ANALYSIS.md
LICENSE
README.md
RESOURCE_DATABASE.md
SECURITY.md
SUBMISSION_LOG.md
SUSTAINABILITY.md
```

## 8. Demo Accounts

The app uses mock authentication, so any email and password will sign you in. Session data is stored in `localStorage` under the keys `biosc-library-state-v1` and `biosc-theme`.

To reset the app, clear those keys from your browser storage.

## 9. License

This repository is licensed under the [GNU General Public License v3.0](LICENSE).
