# Firebase Hosting Free Tier (Spark Plan) Limits

Your app is currently on the **Spark Plan**, which is completely free. Here are the limits:

## 1. Hosting Limits
- **Storage:** 10 GB (Space for your HTML, CSS, JS, images)
- **Data Transfer:** 360 MB per day (Bandwidth used when people visit your site)
  - *Note:* If you exceed this, your site might be temporarily disabled until the next day, or you can upgrade to the Blaze plan (pay-as-you-go).

## 2. Other Free Limits (Spark Plan)
- **Authentication:** Unlimited active users (for Email/Password login).
- **Firestore Database:**
  - **Stored Data:** 1 GB total
  - **Writes:** 20,000 per day
  - **Reads:** 50,000 per day
  - **Deletes:** 20,000 per day

## 3. Where to Check Usage
To see how much of the free tier you have used:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on your project (`task-manager-app`).
3. In the left sidebar, click **Build** -> **Hosting**.
4. Click the **Usage** tab at the top.
   - Here you will see graphs for "Storage" and "Data transfer".

You can also check Database usage under **Build** -> **Firestore Database** -> **Usage**.
