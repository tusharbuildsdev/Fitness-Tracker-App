# Frequently asked questions

Return to the [README](../README.md).

## Why does the app fail at startup with a Firebase error?

The Firebase initializer requires all six `EXPO_PUBLIC_FIREBASE_*` variables. Copy `.env.example` to `.env`, populate every value, and restart the Expo server. See [Firebase setup](FIREBASE_SETUP.md).

## Should I commit `.env`?

No. `.env` is ignored. Commit only `.env.example` with empty values. Even public Firebase configuration belongs in environment-specific configuration, and server credentials must never be included in a client app.

## Which commands should I run before a pull request?

Run `npm run typecheck` and `npm run lint`, then exercise the affected flow on a relevant device, simulator, or web target. Include the results in your pull request.

## Where should a new feature live?

Start in `src/features/<feature>/` and colocate its screen, components, hook, service, schema, and types as needed. Read [Project structure](PROJECT_STRUCTURE.md).

## How do I report a vulnerability?

Do not open a public issue. Follow the private reporting guidance in [SECURITY.md](../SECURITY.md).

## Can I use this project commercially?

Yes, subject to the [MIT License](../LICENSE). The license does not grant rights to third-party services, branding, or user data.

## Where do screenshots belong?

Place the named files in [`.github/images`](../.github/images/README.md). The README already references them with relative paths.
