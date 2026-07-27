# Security Policy

## Supported Versions

Security fixes are provided for the latest released version of Fitness Tracker App.

| Version | Supported |
| --- | --- |
| 1.0.x | ✅ Yes |
| < 1.0.0 | ❌ No |

## Reporting a Vulnerability

Please do **not** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

Instead, contact the maintainer privately through [Tushar Verma’s GitHub profile](https://github.com/tusharbuildsdev) and include:

- A clear description of the vulnerability and its potential impact
- Affected files, components, versions, or configurations
- Step-by-step reproduction instructions or a proof of concept
- Suggested mitigations, if known
- Your preferred name and a way to receive follow-up, if you would like credit

Please remove tokens, keys, personal information, and any sensitive production data from your report.

## Response Expectations

We aim to acknowledge a report within **7 days** and provide a status update within **14 days**. Resolution timing depends on severity, reproducibility, and the availability of a safe fix. We will keep reporters informed about material progress where contact information is available.

If the report concerns immediate risk to user data, authentication, or Firestore access controls, please clearly mark it as **high severity** in the report.

## Responsible Disclosure

To protect users, please:

- Give maintainers a reasonable opportunity to investigate and remediate the issue before public disclosure.
- Avoid accessing, modifying, or deleting data that does not belong to you.
- Do not degrade service availability or use social engineering during testing.
- Report only vulnerabilities you have verified in an authorized environment.
- Do not publish exploit details until a fix is available and coordinated disclosure is agreed upon.

We appreciate responsible research that helps keep Fitness Tracker App and its users safe.

## Security Notes for Contributors

- Never commit `.env` files, Firebase credentials, access tokens, or user data.
- Keep Firebase Authentication and Cloud Firestore dependencies updated.
- Review changes to `firestore.rules` carefully; rules must enforce user-level data isolation.
- Treat `EXPO_PUBLIC_*` values as client-visible configuration and never store server secrets in them.
