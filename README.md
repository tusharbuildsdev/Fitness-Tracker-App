<div align="center">

# Fitness Tracker App

### A polished, cloud-synced fitness companion built with React Native and Expo

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Cloud%20Sync-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Explore features](#-features) · [Get started](#-getting-started) · [Contribute](#-contributing) · [Report a bug](https://github.com/tusharbuildsdev/Fitness-Tracker-App/issues)

</div>

<!--
Banner placeholder: add a repository banner at .github/images/banner.png, then
uncomment the line below.

![Fitness Tracker App banner](.github/images/banner.png)
-->

## ✨ About

**Fitness Tracker App** is a cross-platform mobile app that helps people build healthier routines through a single, thoughtful workspace for activity, workouts, nutrition, hydration, sleep, weight, and goals. Authentication and Firestore-backed cloud sync keep each user’s data private and available across sessions.

The project is designed as a practical example of a modern React Native application: typed domain models, feature-oriented organization, validated forms, clear navigation, and a clean Material-inspired interface.

## 🚀 Features

- Secure Firebase Authentication for user sign-in and account management
- Personalized profiles and fitness-goal tracking
- Workout creation, editing, details, and history management
- Daily steps, water, calorie, sleep, and weight tracking
- Progress charts and analytics for trend comparison
- Cloud persistence and synchronization with Cloud Firestore
- Input validation powered by React Hook Form and Zod
- Responsive light/dark themes, settings, and notification preferences
- Bottom-tab and stack navigation with React Navigation

## 🧰 Technology Stack

| Area | Technology |
| --- | --- |
| Mobile framework | React Native |
| Development platform | Expo |
| Language | TypeScript |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Navigation | React Navigation |
| UI components | React Native Paper |
| Forms & validation | React Hook Form + Zod |
| Charts | react-native-chart-kit |
| Local preferences | AsyncStorage and Expo Secure Store |

## 🗂️ Project Structure

```text
Fitness-Tracker-App/
├── .github/
│   └── images/                 # Add banner and screen captures here
├── src/
│   ├── app/config/             # Firebase configuration
│   ├── features/               # Feature-first app modules
│   │   ├── analytics/ calories/ profile/ settings/ sleep/
│   │   └── steps/ water/ weight/ workouts/
│   ├── theme/                  # Theme definitions
│   └── utils/                  # Shared utilities
├── App.tsx                     # App entry point and navigation composition
├── firestore.indexes.json      # Firestore index definitions
├── firestore.rules             # Firestore security rules
├── .env.example                # Required Firebase variable template
└── package.json
```

Each feature keeps its screens, components, hooks, schemas, services, and types close together. This makes the codebase easier to extend without creating a large, shared components layer.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm 9 or later
- Expo Go on a physical device, or an Android/iOS simulator
- A Firebase project with **Authentication** and **Cloud Firestore** enabled

## 🛠️ Getting Started

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/Fitness-Tracker-App.git
   cd Fitness-Tracker-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Add your Firebase web-app configuration to `.env`.

5. Start the Expo development server:

   ```bash
   npm start
   ```

Scan the QR code with Expo Go, or select a platform from the Expo developer tools.

### Run on a specific platform

```bash
npm run android
npm run ios
npm run web
```

### Quality checks

```bash
npm run lint
npm run typecheck
```

## 🔐 Environment Variables

Copy `.env.example` to `.env` and provide values from **Firebase Console → Project settings → Your apps → SDK setup and configuration**.

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> [!IMPORTANT]
> Never commit `.env`. Firebase web configuration identifies your project but is not a substitute for Firestore Security Rules; deploy and review the included `firestore.rules` before using a production project.

## 📸 Screenshots

Screenshots belong in `.github/images/`. Add the following files to showcase the app, then GitHub will render them below.

| Home | Workouts | Profile |
| --- | --- | --- |
| `home.png` | `workout.png` | `profile.png` |
| _Add `.github/images/home.png`_ | _Add `.github/images/workout.png`_ | _Add `.github/images/profile.png`_ |

<!--
![Home screen](.github/images/home.png)
![Workout screen](.github/images/workout.png)
![Profile screen](.github/images/profile.png)
-->

## 🏗️ Architecture Overview

```text
UI screens & reusable components
            ↓
Feature hooks (state and orchestration)
            ↓
Feature services (data access)
            ↓
Firebase Authentication + Cloud Firestore
```

- **Screens and components** present an accessible, consistent UI.
- **Hooks** encapsulate feature state and data-flow behavior.
- **Schemas** validate user input before data is persisted.
- **Services** isolate Firestore operations from presentation code.
- **Firebase** supplies identity and cloud-backed persistence.

## 🌟 Project Highlights

- **Feature-first design:** related code lives together, improving discoverability and maintainability.
- **Type-safe by default:** TypeScript types and Zod schemas reduce invalid states and unsafe input.
- **Cloud-native experience:** Firebase Authentication and Firestore support private, synchronized user data.
- **Built for real habits:** tracking spans the most useful daily health signals rather than a single metric.

## 🎯 Learning Objectives

This repository is useful for developers who want hands-on experience with:

- Building a production-style Expo and React Native application
- Modeling feature domains with TypeScript
- Integrating Firebase Authentication and Cloud Firestore
- Structuring scalable feature modules, hooks, and services
- Building validated mobile forms with React Hook Form and Zod
- Creating navigation flows and polished interfaces with React Navigation and React Native Paper

## 🛣️ Roadmap

- [ ] Social sharing and accountability features
- [ ] Custom workout templates and recurring workout plans
- [ ] Health platform integrations (Apple Health and Health Connect)
- [ ] Richer goal insights and personalized recommendations
- [ ] Offline-first queueing with conflict resolution
- [ ] Automated test coverage and CI workflows
- [ ] Localization and expanded accessibility support

Feature ideas and implementation help are welcome—please open an issue before beginning substantial work.

## 🤝 Contributing

Contributions of all sizes are appreciated. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before opening an issue or pull request.

## 📄 License

Distributed under the [MIT License](LICENSE). Copyright © 2026 Tushar Verma.

## 👨‍💻 Developer

Built and maintained by [Tushar Verma](https://github.com/tusharbuildsdev).

## 💬 Support

- Open a [GitHub issue](https://github.com/tusharbuildsdev/Fitness-Tracker-App/issues) for bugs and feature requests.
- Review [SECURITY.md](SECURITY.md) for privately reporting security vulnerabilities.

## 🙏 Acknowledgements

- [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)

---

If this project helped you, please consider giving it a ⭐. It helps others discover the project and motivates continued improvement.
