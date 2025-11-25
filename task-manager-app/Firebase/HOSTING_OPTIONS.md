# Free Hosting Options for Your Angular App

Since your app is already using **Firebase** for Authentication and Database, **Firebase Hosting** is your best option. It's free, fast, and integrates perfectly with your existing setup.

Here are the top free ways to host your app:

## 1. Firebase Hosting (⭐ Recommended)
**Best for:** Your specific app, since you already use Firebase Auth & Firestore.
**Free Tier:** 10 GB storage, 360 MB/day data transfer.

### How to Deploy:
1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **Initialize** (run in your project folder):
   ```bash
   firebase init hosting
   ```
   - Select **"Use an existing project"** -> Choose `task-manager-app`
   - Public directory: `dist/task-manager-app/browser`
   - Configure as a single-page app? **Yes**
   - Set up automatic builds and deploys with GitHub? **No** (for now)
   - Overwrite index.html? **No**

4. **Build & Deploy**:
   ```bash
   ng build
   firebase deploy
   ```

---

## 2. Vercel
**Best for:** Easiest setup, automatic deployments from GitHub.
**Free Tier:** Generous limits for hobby projects.

### How to Deploy:
1. Push your code to a **GitHub repository**.
2. Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
3. Click **"Add New..."** -> **"Project"**.
4. Import your repository.
5. Vercel automatically detects Angular. Just click **Deploy**.

---

## 3. Netlify
**Best for:** Drag-and-drop deployment, simple interface.
**Free Tier:** 100 GB bandwidth/month.

### How to Deploy (Drag & Drop):
1. Run `ng build` in your terminal.
2. Go to [Netlify.com](https://netlify.com) and sign up.
3. Drag the `dist/task-manager-app/browser` folder onto the Netlify dashboard.
4. **Important**: You need to add a `_redirects` file to the `src` folder containing `/* /index.html 200` to support Angular routing, then rebuild.

---

## 4. GitHub Pages
**Best for:** Hosting directly from your code repository.
**Free Tier:** Unlimited bandwidth (within reason).

### How to Deploy:
1. Install the deployer: `npm install angular-cli-ghpages --save-dev`
2. Build with base-href:
   ```bash
   ng build --base-href "https://<username>.github.io/<repo-name>/"
   ```
3. Deploy:
   ```bash
   npx angular-cli-ghpages --dir=dist/task-manager-app/browser
   ```

---

## Summary Recommendation
Stick with **Firebase Hosting**. You keep everything (Auth, Database, Hosting) in one console, and it prevents "CORS" issues that can happen when your frontend and backend are on different domains.
