# Architecture

Return to the [README](../README.md).

FitTrack Pro uses a feature-first React Native architecture. `App.tsx` owns provider composition and navigation; feature folders own behavior and UI for their domain.

```text
React Navigation
      │
      ▼
Screen ──► feature components
  │
  ▼
Hook ──► Zod schema / feature types
  │
  ▼
Service ──► Firestore · Firebase Auth · AsyncStorage · Expo Notifications
```

## Layers

| Layer | Owns | Should not own |
| --- | --- | --- |
| Navigation | Routes, stacks, tabs, provider assembly | Persistence logic |
| Screens | Layout, route parameters, feature composition | Direct database queries |
| Components | Presentational and focused interactive UI | Cross-feature orchestration |
| Hooks | State transitions, loading/error state, calls to services | Route registration |
| Services | Firebase/device API access and mapping | View rendering |
| Schemas/types | Validation and domain contracts | Side effects |

## Navigation

The root tab navigator exposes Workouts, Track, Analytics, Profile, and Settings. Nested stacks handle workout actions, individual trackers, and settings subpages. Route parameter types are defined in `App.tsx` and should be updated whenever a route contract changes.

## Data and configuration

Firebase initialization is centralized in `src/app/config/firebase.ts`. It validates the six required environment variables before initializing the app and exports `auth`, `firestore`, and `firebaseApp`. Keep all Firebase configuration changes there and all domain-specific reads/writes in feature services.

Firestore rules and indexes are version-controlled at the repository root. A change to a Firestore query may require a matching index update; review both the client query and deployed rules.

## UI and state

React Native Paper provides core components. Theme and settings providers wrap the navigation tree, while feature hooks encapsulate screen state. Forms should use React Hook Form and Zod schemas so validation is consistent before persistence.

## Design decisions

- Feature locality keeps related changes discoverable.
- Typed route and domain contracts make refactors safer.
- Service boundaries make persistence replaceable and testable.
- Fast configuration validation prevents accidental execution against an incomplete Firebase setup.

See [Project structure](PROJECT_STRUCTURE.md) and [Firebase setup](FIREBASE_SETUP.md).
