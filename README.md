This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Steps:
1-> npm install
2-> npx prisma generate
3-> npx prisma db push
4-> npx prisma migrate dev --name init

## Getting Started

1-> Install the dependencies:

```bash
npm install
```

2-> Generate Prisma ORM

```bash
npx prisma generate
```

3-> Push Schemas to DB

```bash
npx prisma db push
```

4-> Make migrations and seed

```bash
npx prisma migrate dev --name init
```

5-> Run the development server:

```bash
npm run dev
```

6-> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

7-> Register a User

8-> To test the Admin and Manager features you need at least one Admin User to achive that you need to change user_role of created user to 1

ENUMS:

- user roles:

  - staff: 3
  - manager: 2
  - admin: 1

- transaction type:
  - sale: 1
  - purchase: 2
