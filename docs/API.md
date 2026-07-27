# Data API and service contracts

Return to the [README](../README.md).

FitTrack Pro does not expose a public HTTP API. This document describes the internal client-side data boundary: feature hooks call feature services, which interact with Firestore or device storage.

## Service conventions

Services should accept explicit, typed input; return typed domain data; and keep provider-specific details out of screens. Do not call Firestore directly from a screen or component.

| Feature | Primary concern | Service |
| --- | --- | --- |
| Workouts | CRUD for workout records | `src/features/workouts/services/workoutService.ts` |
| Profile | Profile and goals data | `src/features/profile/services/profileService.ts` |
| Steps | Step history | `src/features/steps/services/stepsService.ts` |
| Calories | Calorie history | `src/features/calories/services/caloriesService.ts` |
| Water | Hydration history | `src/features/water/services/waterService.ts` |
| Sleep | Sleep history | `src/features/sleep/services/sleepService.ts` |
| Weight | Weight history | `src/features/weight/services/weightService.ts` |
| Analytics | Derived progress insights | `src/features/analytics/services/analyticsService.ts` |
| Settings | Local preferences and notifications | `src/features/settings/services/` |

Domain shapes live next to their feature in `types.ts`; user input rules live in `schemas/`. Consult those source files as the canonical, versioned contract because fields may evolve independently by feature.

## Firestore safety

Every Firestore operation must be authorized by deployed [`firestore.rules`](../firestore.rules). Client validation improves UX but is not an authorization boundary. When adding a collection or query:

1. Define the domain type and Zod validation schema.
2. Add the service operation with predictable errors.
3. Update and test Firestore rules for least-privilege access.
4. Add an index to `firestore.indexes.json` if the query requires one.
5. Update this guide or feature documentation if the user-visible data contract changes.

## Error handling

Preserve enough context for hooks to show a useful recoverable state, but never surface credentials, tokens, or raw sensitive provider details to users. See [Security](../SECURITY.md).
