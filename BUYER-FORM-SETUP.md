# Buyer Form Email Setup

If form submissions don't trigger emails to eliteaccelerator@gmail.com, follow these steps:

## 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up (free)
2. **Use eliteaccelerator@gmail.com** as your sign-up email — Resend's free "onboarding" sender can only deliver to the account email until you verify a domain
3. In the dashboard: **API Keys** → **Create API Key**
4. Copy the key (starts with `re_`)

## 2. Add to .env.local

Create or edit `.env.local` in the project root:

```
RESEND_API_KEY=re_your_actual_key_here
```

## 3. Restart the Dev Server

After changing `.env.local`:

- Stop the server (Ctrl+C)
- Run `npm run dev` again

## 4. Test Again

Submit the form. Check:

- **Form shows "Thank you!"** → request reached the API; if no email arrives, see steps below
- **Form shows "Something went wrong"** → look at the error message and the terminal where `npm run dev` is running for details

## 5. Resend Limits

- **Onboarding sender** (`onboarding@resend.dev`): can send only to the Resend account email (eliteaccelerator@gmail.com) until you add a verified domain
- **Spam folder**: check Gmail Spam/Promotions
- **Dashboard**: [resend.com/emails](https://resend.com/emails) — inspect delivery status and logs

## 6. Optional: Custom "From" Address

To send from something like `hello@acquiretoscale.com`:

1. In Resend, add and verify your domain
2. Add to `.env.local`:
   ```
   RESEND_FROM=Acquire To Scale <hello@acquiretoscale.com>
   ```
