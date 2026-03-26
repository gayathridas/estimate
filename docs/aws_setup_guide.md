# AWS Setup Guide: Secure Static Hosting

Follow these steps to set up a professional and secure AWS environment for the "Estimate" app.

## 1. Create a Private S3 Bucket
1. Go to **S3 Console** > **Create bucket**.
2. **Bucket name:** `estimate-app-[your-random-suffix]`
3. **Region:** `us-east-1` (or your preferred region).
4. **Object Ownership:** ACLs disabled (recommended).
5. **Block all public access:** Keep this **checked** (On). We will only allow access via CloudFront.
6. **Create bucket.**

## 2. Set up GitHub OIDC (Best Practice!)
Instead of using long-lived Access Keys, we use a temporary role.
1. **Find IAM:** At the very top of the AWS Console, type **"IAM"** in the search bar and click the first result (Identity and Access Management). 
   - *Alternatively: Click the "Services" icon (9 dots) in the top left, find "Security, Identity, & Compliance," then click "IAM."*
2. In the left-hand sidebar, click **Identity providers** > **Add provider**.
2. **Provider type:** OpenID Connect.
3. **Provider URL:** `https://token.actions.githubusercontent.com`
4. **Audience:** `sts.amazonaws.com`
5. Click **Add provider**.

## 3. Create the Deployment Role
1. In the same **IAM Console**, click **Roles** in the left-hand sidebar.
2. Click the blue **Create role** button on the right.
2. **Trusted entity type:** Web identity.
3. **Identity provider:** Choose the one created in Step 2.
4. **Audience:** `sts.amazonaws.com`
5. **GitHub organization:** `gayathridas`
6. **Repository:** `estimate`
7. Click **Next**.
8. **Permissions:** Create a policy that allows `s3:Sync` and `s3:PutObject` to your bucket, and `cloudfront:CreateInvalidation`.
   - *Example Policy:*
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "S3ObjectLevel",
          "Effect": "Allow",
          "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
          "Resource": ["arn:aws:s3:::YOUR_BUCKET_NAME/*"]
        },
        {
          "Sid": "S3BucketLevel",
          "Effect": "Allow",
          "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
          "Resource": ["arn:aws:s3:::YOUR_BUCKET_NAME"]
        },
        {
          "Sid": "CloudFrontInvalidation",
          "Effect": "Allow",
          "Action": ["cloudfront:CreateInvalidation"],
          "Resource": ["*"]
        }
      ]
    }
    ```
9. **Role Name:** `GitHubActionsEstimateDeploy`.

## 4. GitHub Configuration
Go to your GitHub repository > **Settings** > **Secrets and variables** > **Actions**.

### Use **Repository Secrets** (Simplest for now):
These are found under the **"Secrets"** tab (not variables). Click **New repository secret**.

1.  **Secret 1:**
    *   **Name:** `AWS_ROLE_ARN`
    *   **Secret (Value):** `arn:aws:iam::123456789012:role/GitHubActionsEstimateDeploy`
2.  **Secret 2:**
    *   **Name:** `AWS_S3_BUCKET`
    *   **Secret (Value):** `estimate-app-12345`

### Use **Repository Variables**:
Switch to the **"Variables"** tab next to Secrets. Click **New repository variable**.

1.  **Variable 1:**
    *   **Name:** `AWS_REGION`
    *   **Value:** `us-east-1`

> [!TIP]
> **Advanced Note (Environment level):** If you want even more security, you can create a GitHub **Environment** named "production" and put these secrets there. This allows you to require a human to click "Approve" before a deployment happens!

---

## 5. CloudFront Setup (Secure CDNs)
To make your app fast and truly secure (so nobody can bypass CloudFront and go straight to S3), we use **Origin Access Control (OAC)**.

1. Go to **CloudFront Console** > **Create distribution**.
2. **Origin domain:** Select your S3 bucket.
3. **Origin access:** Choose **"Origin access control settings (recommended)"**.
   - Click **Create control setting**.
   - Keep defaults and click **Create**.
4. **Web Application Firewall (WAF):**
   - Look for the section titled **"Web Application Firewall (WAF)"**.
   - Select the option: **"Do not enable security protections"**.
   - *Note: This is to avoid WAF costs while we are just testing!*
5. **Default cache behavior:**
   - **Viewer protocol policy:** Redirect HTTP to HTTPS.
6. **Default root object:** Type `index.html`.
7. **Create distribution.**
8. **CRITICAL STEP: Update S3 Bucket Policy**
   If you don't see a yellow banner with a "Copy policy" button, follow these steps:
   1. Click on your **Distribution ID** (e.g., `E1M0...`).
   2. Click the **Origins** tab at the top.
   3. Select your S3 origin and click **Edit**.
   4. Look for the **Origin access** section and click the **"Copy policy"** button.
   5. Go to your **S3 Bucket** (in a new tab) > **Permissions** > **Bucket policy** > **Edit**.
   6. Paste the policy and **Save**. This allows CloudFront to talk to your private bucket!

## 6. Trigger Your First Secure Deploy
Now that everything is ready:
1. Make a tiny change to your code (e.g., add a comment in `src/main.ts`).
2. Commit and push: `git add .`, `git commit -m "chore: trigger aws deploy"`, `git push origin main`.
3. Go to your **GitHub Repo** > **Actions** tab.
4. Watch as the **🛡️ Security Scan** runs first, followed by the **🏗️ Build**, and finally the **🚀 Deploy to AWS**.

## 7. Find Your App's Public URL
Once the deployment is finished:
1. Go to the **CloudFront Console**.
2. Click on the **Distribution ID** you just created.
3. On the **General** tab, look for **Distribution domain name** (e.g., `d123456abcdef.cloudfront.net`).
4. **Copy and paste it into your browser.** This is your app's live URL!

> [!TIP]
> **Custom Domains:** If you have your own domain name (e.g., `myestimate.com`), you can later link it to this CloudFront distribution using **Route 53**.
