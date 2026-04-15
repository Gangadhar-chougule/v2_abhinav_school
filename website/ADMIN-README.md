# Admin Portal Setup

## Overview
The admin portal is now integrated into the school website. It uses environment variables for authentication (no database required).

## Credentials
- **Username:** `admin123`
- **Password:** `Admin@1234`

These are stored in `.env.local` file.

## Access
- **Login Page:** `/admin/login`
- **Dashboard:** `/admin/dashboard` (protected, requires login)
- **Admin Home:** `/admin` (redirects to login)

## How It Works

### Authentication Flow
1. User visits `/admin/login`
2. Enters username and password
3. Credentials are verified against environment variables via API route `/api/admin/login`
4. On success, a token is stored in `localStorage`
5. User is redirected to `/admin/dashboard`
6. Dashboard checks for valid token; if missing, redirects back to login

### File Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── layout.js          # AuthProvider wrapper
│   │   ├── page.js            # Redirects to login
│   │   ├── login/
│   │   │   └── page.js        # Login page
│   │   └── dashboard/
│   │       └── page.js        # Protected dashboard
│   └── api/
│       └── admin/
│           └── login/
│               └── route.js   # Authentication API
└── contexts/
    └── AuthContext.js         # Auth state management
```

## Deployment on Vercel

### Important Steps:
1. **DO NOT commit `.env.local`** to git (it's already in `.gitignore`)
2. In your Vercel project settings, go to **Settings > Environment Variables**
3. Add these two environment variables:
   - `ADMIN_USERNAME=admin123`
   - `ADMIN_PASSWORD=Admin@1234`
4. Redeploy your application

### Local Development:
- The `.env.local` file is already created and will work automatically
- Run `npm run dev` to test locally

## Security Notes
- Credentials are stored server-side (environment variables)
- Password verification happens in API route (server-side)
- Token-based authentication using localStorage
- For production, consider:
  - Using stronger passwords
  - Implementing token expiration
  - Adding rate limiting
  - Using HTTPS

## Adding More Admin Users
To add multiple admin users, you can:
1. **Simple approach:** Modify the API route to check against multiple hardcoded credentials
2. **Better approach:** Use a JSON file with user data (read-only, requires redeploy to add users)
3. **Advanced:** Integrate a lightweight database (Vercel KV, Supabase, etc.)

## Troubleshooting

### Login not working on Vercel?
- Check if environment variables are set correctly in Vercel dashboard
- Redeploy after adding environment variables

### Can't access dashboard?
- Clear localStorage and try logging in again
- Check browser console for errors

### Build failing?
- Ensure all files are properly created
- Check that no syntax errors exist
