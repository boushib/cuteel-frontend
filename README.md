# Cuteel

This is the frontend for _Cuteel_, the final project for my Master / Engineering Degree.
Built on top of [Next.js](https://nextjs.org/)

## Dependencies

- Node.js
- TypeScript

## Tools

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension (consistent code formatting)

## Dev Environment

Create an `.env` file in your root directory and add theses entries to it:

```lang-none
API_URL=http://localhost:8080 # adjust to use the backend API port if needed
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SOCKET_IO_URL=http://localhost:8081/
```

Install the dependencies

```lang-none
yarn
```

Run the app in development mode.

```lang-none
yarn dev
```

## Production

To build the app for production:

```lang-none
yarn build
```
