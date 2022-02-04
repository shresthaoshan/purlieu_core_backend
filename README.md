# PURLIEU

## CORE Backend

---

### Operation Instructions

Follow the following instructions in their order carefully.

# Installation

Once the repository has been downloaded, open a terminal in the repository folder and install the required packages.

```bash
npm install
```

or

```bash
yarn install
```

# Setup

### 1. Environment Variables

Copy the `.env.example` file into `.env`. Update the values in the `.env` file to your available data.

### 2. Database

Before the application can start correctly, it is essential to sync the database in your environment with the application.

To sync your database with the application, run the following command.

```bash
yarn db:sync <sync_message>
```

This command will also generate the corresponding database client essential to run the application.

# Operate

If you're running the application in `development` mode:

```bash
yarn app:dev
```

If you're building the application for `production` mode:

```bash
yarn app:build
```

or, just

```bash
yarn build
```

Once the build is complete, you can start `production` server:

```bash
yarn app:start
```

or, just

```bash
yarn start
```

---

If you encounter any problem, please, contact the author of the repository accordingly.
