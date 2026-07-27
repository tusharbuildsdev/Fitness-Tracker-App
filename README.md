<div align="center">
  <img src=".github/images/banner.png" alt="FitTrack Pro banner" width="100%" />
  <br />
  <img src=".github/images/logo.png" alt="FitTrack Pro logo" width="120" />

# FitTrack Pro

**A thoughtful, privacy-conscious companion for logging workouts and building healthier daily habits.**

<!-- Replace this line with a hosted typing SVG when one is available. -->
<sub>Track workouts • Build habits • Understand your progress</sub>

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-2ea44f.svg)](LICENSE)
[![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Getting started](docs/INSTALLATION.md) · [Firebase setup](docs/FIREBASE_SETUP.md) · [Contribute](CONTRIBUTING.md) · [Report a bug](../../issues/new?template=bug_report.md)
</div>

## Overview

FitTrack Pro is an Expo-powered React Native app for recording workouts and daily wellness signals in one focused experience. It pairs structured forms and validation with Firebase-backed cloud data, local preferences, and concise progress visualizations.

## Preview

| Home / workouts | Trackers | Profile |
| --- | --- | --- |
| <img src=".github/images/home.png" alt="Workout list screen" width="230" /> | <img src=".github/images/workout.png" alt="Habit trackers screen" width="230" /> | <img src=".github/images/profile.png" alt="Profile screen" width="230" /> |

| Dashboard | Login | Splash |
| --- | --- | --- |
| <img src=".github/images/dashboard.png" alt="Analytics dashboard" width="230" /> | <img src=".github/images/login.png" alt="Login screen placeholder" width="230" /> | <img src=".github/images/splash.png" alt="Splash screen placeholder" width="230" /> |

<div align="center">
  <img src=".github/images/demo.gif" alt="FitTrack Pro demo" width="300" />
</div>

> Add the image assets named above to [`.github/images`](.github/images/README.md). The repository deliberately ships no fake bitmap files.

## Features

| Area | What you can do |
| --- | --- |
| Workouts | Create, edit, inspect, and manage workout entries. |
| Daily tracking | Record steps, calories, water, sleep, and weight. |
| Insights | Review historical charts, weekly progress, and trend comparisons. |
| Profile & goals | Maintain profile details and view goal summaries. |
| Preferences | Manage theme and notification-related settings stored locally. |
| Cloud data | Firebase Authentication and Cloud Firestore services are configured for cloud-backed workflows. |

## Technology stack

| Layer | Tools |
| --- | --- |
| App platform | Expo SDK 54, React Native 0.81, React 19 |
| Language | TypeScript |
| Navigation | React Navigation |
| UI | React Native Paper, Expo Vector Icons |
| Forms & validation | React Hook Form, Zod |
| Data & identity | Firebase Authentication, Cloud Firestore |
| Device services | Expo Notifications, Secure Store, AsyncStorage |
| Visualization | react-native-chart-kit, react-native-svg |

## Architecture

The application is organized by feature. Screens compose components and hooks; hooks coordinate services; services provide persistence and Firebase boundaries.

```text
App.tsx → navigation → feature screens → hooks → services → Firebase / device storage
                                  └──── components, schemas, types
```

<div align="center">
  <img src=".github/images/architecture.png" alt="FitTrack Pro architecture diagram" width="760" />
</div>

Read the full [architecture guide](docs/ARCHITECTURE.md) and [project structure](docs/PROJECT_STRUCTURE.md).

## Folder structure

```text
src/
├── app/config/          # Firebase configuration
├── features/            # Feature-first screens, components, hooks, services, schemas, types
└── theme/               # Shared visual tokens
docs/                    # Contributor and implementation documentation
.github/                 # Community health files, CI, and repository assets
```

## Installation

```bash
git clone https://github.com/tusharbuildsdev/Fitness-Tracker-App.git
cd Fitness-Tracker-App
npm ci
copy .env.example .env
```

Then configure Firebase values in `.env`; see [Firebase setup](docs/FIREBASE_SETUP.md). For macOS/Linux, use `cp .env.example .env`.

## Environment variables

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

These are required at app startup by [`src/app/config/firebase.ts`](src/app/config/firebase.ts). Never commit a populated `.env` file.

## Run locally

```bash
npm run start
npm run android
# or
npm run ios
npm run web
```

Before opening a pull request, run:

```bash
npm run typecheck
npm run lint
```

## Build an Android APK

This repository does not currently include an EAS build profile. Install and authenticate with the EAS CLI, create an `eas.json` profile appropriate for internal distribution, then run an APK build:

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

See Expo’s [Android build documentation](https://docs.expo.dev/build/setup/) for signing and profile options.

## Roadmap and future scope

The project roadmap tracks planned improvements such as richer goals, export options, accessibility reviews, and automated testing. Read [ROADMAP.md](docs/ROADMAP.md) before proposing a large feature.

## Documentation

| Guide | Purpose |
| --- | --- |
| [Installation](docs/INSTALLATION.md) | Local setup and troubleshooting |
| [Firebase setup](docs/FIREBASE_SETUP.md) | Firebase project and Firestore configuration |
| [Architecture](docs/ARCHITECTURE.md) | Application boundaries and data flow |
| [Project structure](docs/PROJECT_STRUCTURE.md) | Directory-by-directory map |
| [Data API](docs/API.md) | Service contracts and data model guidance |
| [FAQ](docs/FAQ.md) | Common setup and contribution questions |

## Contributing

Contributions are welcome. Please read the [contributing guide](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and review the [security policy](SECURITY.md) before opening an issue or pull request.

## License

Distributed under the [MIT License](LICENSE).

## Developer

Built and maintained by [Tushar Verma](https://github.com/tusharbuildsdev).

## Acknowledgements

Thanks to the Expo, React Native, Firebase, React Navigation, React Native Paper, React Hook Form, and Zod communities.

## Support

Use [GitHub Discussions](../../discussions) for questions and ideas, or open an issue using the appropriate template. Please do not disclose vulnerabilities in public issues; use the process in [SECURITY.md](SECURITY.md).

---

<div align="center">If FitTrack Pro is useful to you, please consider giving it a ⭐.</div>
