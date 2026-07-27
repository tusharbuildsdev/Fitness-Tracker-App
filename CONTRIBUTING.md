# Contributing to FitTrack Pro

Thank you for improving FitTrack Pro. This guide keeps changes reviewable, predictable, and safe for users.

## Before you begin

Read the [README](README.md), [Code of Conduct](CODE_OF_CONDUCT.md), [security policy](SECURITY.md), and relevant documentation in [`docs`](docs/). For a substantial change, open an issue first so maintainers and contributors can agree on scope.

Do not report security vulnerabilities in public issues. Follow [SECURITY.md](SECURITY.md).

## Local development

1. Fork the repository and create a branch from the default branch: `git switch -c feat/short-description`.
2. Install the locked dependency tree with `npm ci`.
3. Copy `.env.example` to `.env` and configure Firebase as described in [Firebase setup](docs/FIREBASE_SETUP.md).
4. Start the app with `npm run start`.
5. Validate your change with `npm run typecheck` and `npm run lint`.

## Working conventions

- Keep feature code inside `src/features/<feature>/` and colocate components, hooks, schemas, services, types, and screens when practical.
- Use TypeScript types rather than `any`; validate user-entered data with the feature’s Zod schema.
- Keep Firebase and storage access in services, not presentation components.
- Preserve existing accessibility labels, touch targets, and theme behavior.
- Never commit `.env`, credentials, generated build outputs, or personal device data.

## Pull requests

Use a focused title in the imperative mood, such as `feat: add hydration reminder settings`. Include:

- The user-facing outcome and implementation summary.
- Linked issue(s), if applicable.
- Screenshots or a short recording for UI changes.
- Manual test steps, target platform(s), and any Firebase or migration requirements.
- Documentation updates when behavior, setup, or data contracts change.

Maintainers may request changes to scope, naming, tests, documentation, or accessibility before merging.

## Commit messages

Conventional-style messages are encouraged:

```text
feat: add weekly sleep target
fix: prevent duplicate workout saves
docs: clarify Firebase configuration
chore: update Expo dependencies
```

## Issue etiquette

Search existing issues before opening a new one. Use the provided templates, include reproducible details, and keep one concern per issue. Questions belong in Discussions when available.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).

Return to the [README](README.md).
