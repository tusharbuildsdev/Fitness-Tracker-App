# Firebase setup

Return to the [README](../README.md).

FitTrack Pro initializes Firebase in [`src/app/config/firebase.ts`](../src/app/config/firebase.ts). The app uses the Firebase JavaScript SDK for Authentication and Cloud Firestore.

## 1. Create a project

1. Create or select a project in the [Firebase console](https://console.firebase.google.com/).
2. Add a **Web** app. Expo reads the web SDK configuration at build time through `EXPO_PUBLIC_` variables.
3. Copy the generated configuration values; do not commit them to source control.

## 2. Configure environment variables

Copy `.env.example` to `.env` and provide every value:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

`EXPO_PUBLIC_` values are embedded in the client bundle. Firebase API keys are identifiers, not server secrets; protect data with Authentication, Firestore Security Rules, App Check where appropriate, and least-privilege project access. Never put service-account credentials in this app.

## 3. Enable products

- Enable the sign-in provider(s) that your product supports under **Authentication**.
- Create the Firestore database in the intended region and select rules appropriate for the environment.
- Review and deploy [`firestore.rules`](../firestore.rules) and [`firestore.indexes.json`](../firestore.indexes.json) using the Firebase CLI in the correct Firebase project.

Example deployment commands after authenticating and selecting the correct project:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules,firestore:indexes
```

Treat rule changes as security-sensitive code reviews. Test them with accounts that should and should not have access.

## 4. Verify

Run `npm run start`, open the app, and confirm that it starts without a missing-configuration error. Validate authentication and database reads/writes with a non-production test account.

For responsible disclosure, see [SECURITY.md](../SECURITY.md).
