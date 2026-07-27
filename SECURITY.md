# Security policy

## Supported versions

Security fixes are considered for the latest code on the default branch. Historical releases are not guaranteed to receive patches.

| Version | Supported |
| --- | --- |
| Current default branch | Yes |
| Earlier releases | Best effort |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for a suspected vulnerability.

Report it privately to [Tushar Verma](https://github.com/tusharbuildsdev) using GitHub’s private vulnerability reporting feature for this repository when enabled. If it is unavailable, contact the maintainer through the GitHub profile and include `Security report: Fitness-Tracker-App` in the subject or opening line.

Provide:

- A clear description and affected component/version.
- Reproduction steps or a proof of concept.
- Impact assessment and any suggested mitigation.
- Whether you have disclosed the issue elsewhere.

Please avoid accessing, altering, or retaining other people’s data. Do not disrupt services or run denial-of-service tests.

## What to expect

The maintainer will acknowledge a good-faith report as soon as practical, investigate it, and coordinate a fix or mitigation. Timing depends on severity and reproducibility. Please allow a reasonable private remediation period before public disclosure.

## Security practices for contributors

- Never commit `.env`, access tokens, service-account files, or user data.
- Keep Firebase authorization in Firestore rules; client checks are not authorization.
- Review package updates and use locked dependency installs in CI.
- Report accidental credential exposure immediately through the process above.

Return to the [README](README.md).
