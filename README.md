<div align="center">
  <img src=".github/images/banner.png" alt="FitTrack Pro - Fitness Tracker App" width="100%" />

# FitTrack Pro

**A React Native fitness tracker for logging workouts and monitoring daily health habits.**

[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-2ea44f)](LICENSE)
</div>

## Overview

FitTrack Pro is an Expo app for recording workouts and keeping daily fitness data in one place. It provides workout logging, trackers for key health habits, progress analytics, profile management, and app settings.

## App preview

<p align="center">
  <img src=".github/images/dashboard.jpeg" alt="Analytics dashboard showing weekly progress" width="220" />
  <img src=".github/images/workout.jpeg" alt="Workout screen with an empty-state prompt" width="220" />
  <img src=".github/images/track.jpeg" alt="Steps tracker with daily entry form" width="220" />
</p>

<p align="center">
  <img src=".github/images/add_workout.jpeg" alt="Add workout form dated 2026-07-28" width="220" />
  <img src=".github/images/setting.jpeg" alt="Application settings screen" width="220" />
</p>

All screenshots above are real project screens. The add-workout sample uses the date shown in the app: **2026-07-28**.

## Features

| Area | Available functionality |
| --- | --- |
| Workouts | Add, edit, view, and manage workout entries. |
| Daily tracking | Log steps, calories, water, sleep, and weight. |
| Analytics | Review weekly progress and comparison trends. |
| Profile | Maintain profile details and goal summaries. |
| Settings | Manage theme, units, notifications, privacy, and app information. |

## Technology

| Purpose | Tools used |
| --- | --- |
| Mobile app | Expo, React Native, TypeScript |
| Navigation | React Navigation |
| UI | React Native Paper, Expo Vector Icons |
| Forms and validation | React Hook Form, Zod |
| Data | Firebase Authentication and Cloud Firestore |
| Local/device storage | AsyncStorage, Secure Store, Expo Notifications |
| Charts | react-native-chart-kit, react-native-svg |

## Project structure

```text
Fitness-Tracker-App/
|-- App.tsx                 # Navigation and application entry point
|-- src/
|   |-- app/config/         # Firebase configuration
|   |-- features/           # Feature modules: screens, hooks, services, schemas, types
|   |-- theme/              # Shared visual theme
|   `-- utils/              # Shared utilities
|-- .github/images/         # Repository banner and real app screenshots
|-- firestore.rules         # Firestore security rules
`-- package.json            # Scripts and dependencies
```

## Run locally

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure Firebase

Create a local `.env` file from `.env.example` and add your Firebase project values:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

### 3. Start the app

```bash
npm run start
```

Optional platform commands:

```bash
npm run android
npm run ios
npm run web
```

## Quality checks

```bash
npm run typecheck
npm run lint
```

## License

This project is available under the [MIT License](LICENSE).

## Developer

Built by [Tushar Verma](https://github.com/tusharbuildsdev).
