# Contributing to Fitness Tracker App

Thanks for investing time in improving Fitness Tracker App. Contributions can include bug reports, documentation improvements, feature proposals, tests, and code changes. By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Before You Start

- Search existing [issues](https://github.com/tusharbuildsdev/Fitness-Tracker-App/issues) and pull requests to avoid duplicate work.
- For a substantial feature or behavior change, open an issue first to discuss scope and approach.
- Do not include secrets, personal data, Firebase credentials, or generated build artifacts in a contribution.

## Development Workflow

1. **Fork** this repository on GitHub.
2. **Clone** your fork and install dependencies:

   ```bash
   git clone https://github.com/<your-username>/Fitness-Tracker-App.git
   cd Fitness-Tracker-App
   npm install
   ```

3. **Create a branch** from the current default branch. Use a descriptive prefix:

   ```bash
   git checkout -b feat/water-goal-reminders
   # or: fix/profile-validation
   # or: docs/setup-guide
   ```

4. **Make focused changes.** Keep one pull request scoped to one concern. Add or update documentation when behavior, setup, or user-facing flows change.

5. **Validate your work** before committing:

   ```bash
   npm run lint
   npm run typecheck
   ```

   Run the app with `npm start` and test the affected flow on the target platform(s).

6. **Commit** with a concise, imperative message:

   ```bash
   git add .
   git commit -m "feat: add water goal reminders"
   ```

7. **Push** your branch:

   ```bash
   git push origin feat/water-goal-reminders
   ```

8. **Open a pull request** against the default branch. Complete the PR description with the problem, solution, testing performed, screenshots for UI changes, and any follow-up work.

## Coding Standards

- Use TypeScript and preserve strict, meaningful types; avoid `any` unless a documented boundary requires it.
- Follow the project’s feature-first structure. Keep screens, components, hooks, schemas, services, and types with their feature when practical.
- Use React Hook Form and Zod for new user-input flows.
- Keep Firestore access inside feature services rather than UI components.
- Prefer clear, small components and functions with descriptive names.
- Match the existing React Native Paper theme and accessibility patterns. Provide readable labels, touch targets, and accessible text for interactive controls.
- Format code consistently with the existing codebase and resolve all lint/type-check errors.
- Do not commit `.env`, credentials, API keys, or private user data.

## Reporting Issues

A useful issue includes:

- A clear, descriptive title
- What you expected to happen and what actually happened
- Reproduction steps, including relevant screen or action sequence
- Device, OS, Expo SDK, and app version where applicable
- Screenshots, recordings, logs, or error messages with sensitive details removed
- A minimal proposed solution, if you have one

Use a security report—not a public issue—for vulnerabilities. See [SECURITY.md](SECURITY.md).

## Pull Request Review

Maintainers may request changes to improve correctness, clarity, accessibility, security, or maintainability. Please respond constructively and keep the branch updated when requested. A pull request is ready to merge when it has a clear purpose, passes project checks, addresses review feedback, and is approved by a maintainer.

Thank you for helping make Fitness Tracker App better.
