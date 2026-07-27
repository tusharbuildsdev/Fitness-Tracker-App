# Installation

Return to the [README](../README.md).

## Prerequisites

- Node.js 20 LTS or newer
- npm (the committed lockfile is npm-based)
- Expo Go on a physical device, or an Android/iOS simulator
- A Firebase project configured as described in [Firebase setup](FIREBASE_SETUP.md)

## Install

```bash
git clone https://github.com/tusharbuildsdev/Fitness-Tracker-App.git
cd Fitness-Tracker-App
npm ci
```

Create your local environment file from the template:

```powershell
Copy-Item .env.example .env
```

```bash
cp .env.example .env
```

Fill every `EXPO_PUBLIC_FIREBASE_*` variable. They are checked at application initialization, so a missing value fails fast with the variable names.

## Start the app

```bash
npm run start
npm run android
npm run ios
npm run web
```

Use `npm run start` to open Expo’s development server and choose a target. iOS requires macOS with Xcode.

## Quality checks

```bash
npm run typecheck
npm run lint
```

## Troubleshooting

| Symptom | Resolution |
| --- | --- |
| Missing Firebase environment variables | Ensure `.env` exists at the repository root and restart Expo after editing it. |
| Dependency mismatch | Delete only local install artifacts if necessary, then run `npm ci`; do not modify the lockfile for a local workaround. |
| Expo cache issue | Restart with `npx expo start --clear`. |
| Device cannot reach Metro | Confirm the device and computer can communicate on the selected Expo connection mode. |

Next: [Firebase setup](FIREBASE_SETUP.md) · [Project structure](PROJECT_STRUCTURE.md)
