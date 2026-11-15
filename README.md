# Saakhuvan Eco Retreat — Hotel & Restaurant Portfolio

Responsive React portfolio for Saakhuvan Eco Retreat. It uses the logo and property photos supplied by the client. Restaurant photos were not included in the supplied set, so the restaurant area uses retreat and grounds photography. Opening hours, address, and contact information are demo content and should be replaced with client-approved details before publication.

## Run locally

1. Install Node.js (LTS).
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the Vite URL it prints.

The contact form posts to the local Express service. To enable email, copy `.env.example` to `.env` and enter the client's SMTP credentials and receiving address. Keep `.env` private; never put SMTP credentials in React or commit the file. If SMTP is not configured, the form displays a helpful fallback message and the visitor can use the listed email/phone.

## Replace demo details

Update the address, phone, email, social account, and opening hours in `src/main.jsx`. Replace or supplement the client photos in `public/client` as needed. Update the SEO title and description in `index.html`.
