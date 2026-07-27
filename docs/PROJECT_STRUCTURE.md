# Project structure

Return to the [README](../README.md).

```text
Fitness-Tracker-App/
|-- App.tsx                     # Root providers and navigation trees
|-- app.json                    # Expo app identity and native settings
|-- firestore.rules             # Firestore authorization rules
|-- firestore.indexes.json      # Firestore indexes
|-- src/
|   |-- app/config/firebase.ts  # Firebase initialization and exports
|   |-- features/
|   |   |-- analytics/
|   |   |-- calories/
|   |   |-- profile/
|   |   |-- settings/
|   |   |-- sleep/
|   |   |-- steps/
|   |   |-- water/
|   |   |-- weight/
|   |   `-- workouts/
|   |-- theme/appTheme.ts       # Shared theme definition
|   `-- utils/date.ts           # Date helpers
|-- docs/                       # Indexed project documentation
|-- .github/                    # CI, issue templates, funding, and README assets
|-- README.md                   # Project overview and screenshots
|-- CONTRIBUTING.md             # Contribution process
|-- SECURITY.md                 # Security reporting policy
|-- CODE_OF_CONDUCT.md          # Community standards
|-- CHANGELOG.md                # Release history
|-- LICENSE                     # MIT license
`-- package.json                # Scripts and dependencies
```

Each feature normally contains the following, where needed:

| Directory/file | Responsibility |
| --- | --- |
| `screens/` | Route-level UI and screen composition. |
| `components/` | Reusable feature UI. |
| `hooks/` | Stateful UI orchestration and service coordination. |
| `services/` | Firestore, storage, notifications, and other persistence boundaries. |
| `schemas/` | Zod validation rules. |
| `types.ts` | Feature-owned TypeScript contracts. |

Avoid importing across unrelated feature internals. Promote genuinely shared code to `src/theme`, `src/utils`, or a deliberately created shared location.

See the [documentation index](README.md), [Architecture](ARCHITECTURE.md), and [Data API](API.md).
