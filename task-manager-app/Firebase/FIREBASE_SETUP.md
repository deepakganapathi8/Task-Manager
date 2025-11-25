# Firebase Setup Guide for Task Manager App

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `task-manager-app` (or your preferred name)
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register app with nickname: `Task Manager Web App`
3. **Do NOT** check "Also set up Firebase Hosting" (we'll do this later)
4. Click "Register app"
5. **Copy the firebaseConfig object** - you'll need this!

Example config (yours will be different):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "task-manager-xxxxx.firebaseapp.com",
  projectId: "task-manager-xxxxx",
  storageBucket: "task-manager-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxx"
};
```

## Step 3: Enable Firebase Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Click on **"Email/Password"** in the Sign-in providers list
4. **Enable** the Email/Password provider
5. (Optional) You can also enable **"Google"** sign-in if desired
6. Click "Save"

## Step 4: Enable Cloud Firestore

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **"Start in production mode"** (recommended)
   - We'll add custom security rules next
4. Select your Cloud Firestore location (choose closest to your users)
5. Click "Enable"

## Step 5: Set Up Firestore Security Rules

1. In Firestore Database, go to the **"Rules"** tab
2. Replace the default rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Users can only access their own tasks
      match /tasks/{taskId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Click "Publish"

## Step 6: Update Your Angular App Configuration

1. Open `src/environments/environment.ts`
2. Replace the placeholder values with your Firebase config:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY_FROM_STEP_2',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
```

3. **DO THE SAME** for `src/environments/environment.prod.ts`

## Step 7: Test Your Setup

1. Run your Angular app:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:4200`

3. You should see the login page!

4. Click "Sign Up" and create a test account

5. After signing up, you should be redirected to the tasks page

6. Try creating a task - it should save to Firestore!

## Step 8: Verify Data in Firebase

1. Go back to Firebase Console
2. Navigate to **Firestore Database**
3. You should see the `users` collection
4. Under your user ID, you should see a `tasks` subcollection
5. Your task should be there!

## Optional: Set Up Firebase Hosting (For Deployment)

1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select **Hosting**
   - Choose your Firebase project
   - Set public directory to: `dist/task-manager-app/browser`
   - Configure as single-page app: **Yes**
   - Don't overwrite index.html

4. Build your Angular app:
   ```bash
   npm run build
   ```

5. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

6. Your app will be live at: `https://YOUR_PROJECT_ID.web.app`

## Troubleshooting

### "Permission denied" errors
- Check your Firestore security rules
- Make sure you're signed in
- Verify the user ID matches in the Firestore path

### "Failed to load tasks"
- Check browser console for errors
- Verify Firebase config is correct
- Ensure Firestore is enabled
- Check network connection

### "Authentication error"
- Make sure Email/Password provider is enabled
- Check Firebase Auth settings
- Verify environment configuration

## Security Best Practices

✅ Never commit your `environment.ts` files to public repositories  
✅ Use different Firebase projects for development and production  
✅ Regularly review Firestore security rules  
✅ Enable email verification for better security  
✅ Set up password strength requirements  
✅ Monitor Authentication and Firestore usage in Firebase Console  

## Free Tier Limits

Firebase Spark (Free) Plan includes:
- **Firestore**: 50K reads/day, 20K writes/day, 20K deletes/day
- **Authentication**: Unlimited
- **Hosting**: 10GB storage, 360MB/day bandwidth
- **Storage**: 1GB

Perfect for personal projects and small user bases!

---

Need help? Check out:
- [Firebase Documentation](https://firebase.google.com/docs)
- [AngularFire Documentation](https://github.com/angular/angularfire)
