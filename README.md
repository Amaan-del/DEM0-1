# Saakhuvan Eco Retreat — Hotel & Restaurant Portfolio

Responsive React portfolio for Saakhuvan Eco Retreat. It uses the logo and property photos supplied by the client. Restaurant photos were not included in the supplied set, so the restaurant area uses retreat and grounds photography. The page uses the client-provided Instagram handle and the public Google listing for location context. Room and facility information is summarized from a third-party property listing and should be confirmed with the client before publication. A client phone number, email address, and restaurant hours were not supplied, so they are not shown.

## Run locally

1. Install Node.js (LTS).
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the Vite URL it prints.

The contact form posts to the local Express service. To enable email, copy `.env.example` to `.env` and enter the client's SMTP credentials and receiving address. Keep `.env` private; never put SMTP credentials in React or commit the file. If SMTP is not configured, the form directs the visitor to the client's Instagram account.

## Client details to confirm

Confirm the address, room facilities, meal plan, and distance details against the client-approved information. Add the client's phone number, email, and opening hours if they want them displayed. Replace or supplement the client photos in `public/client` as needed. Update the SEO title and description in `index.html`.
