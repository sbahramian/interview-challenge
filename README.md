# Interview NodeJs Challenge 

```bash
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
╱╱                                             ╱╱
╱╱  ╭━━━╮╱╱╱╱╱╱╱╱╭╮╭━━╮╱╱╱╭╮                   ╱╱
╱╱  ┃╭━╮┃╱╱╱╱╱╱╱╱┃┃┃╭╮┃╱╱╱┃┃                   ╱╱
╱╱  ┃╰━━┳━━┳━━┳┳━╯┃┃╰╯╰┳━━┫╰━┳━┳━━┳╮╭┳┳━━┳━╮   ╱╱
╱╱  ╰━━╮┃╭╮┃┃━╋┫╭╮┃┃╭━╮┃╭╮┃╭╮┃╭┫╭╮┃╰╯┣┫╭╮┃╭╮╮  ╱╱
╱╱  ┃╰━╯┃╭╮┃┃━┫┃╰╯┃┃╰━╯┃╭╮┃┃┃┃┃┃╭╮┃┃┃┃┃╭╮┃┃┃┃  ╱╱
╱╱  ╰━━━┻╯╰┻━━┻┻━━╯╰━━━┻╯╰┻╯╰┻╯╰╯╰┻┻┻┻┻╯╰┻╯╰╯  ╱╱
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
```

### Technologies used in this project:
   * NodeJs
   * Nest.js
   * JWT
   * Mysql
   * Prisma
   * Redis
   * DDD architecture
   * CQRS
   * i18n
   * Swagger
   * Docker


Welcome to Interview NodeJs Challenge! This README will guide you through setting up the project, accessing documentation, understanding the database design and backend architecture, as well as explaining the backend routes and sample APIs.

## Table of Contents

1. [Backend Architecture](#backend-architecture)
2. [Installation](#installation)
3. [Database Design](#database-design)
4. [Accessing Swagger Documentation](#accessing-swagger-documentation)
5. [Explaining Backend Routes and Sample APIs](#explaining-backend-routes-and-sample-apis)

## Backend Architecture

The backend architecture of this project follows the principles of Domain-Driven Design (DDD) and Clean Architecture. The architecture is structured into layers, including:

- **Presentation Layer**: Controllers, decorators, DTOs, and OpenAPI.
- **Application Layer**: Interfaces, mapping, service (commands, queries, utilities), and use cases.
- **Domain Layer**: Domain models and services (factories, repositories).
- **Infrastructure Layer**: Interfaces, localization, and modules.

### Project Architecture

This document outlines the architecture of the project.

### Presentation Layer

The presentation layer deals with the user interface. It includes the following components:

- Controllers: Handle incoming requests.
- Decorators: Add functionality to classes or methods.
- DTOs (Data Transfer Objects): Exchange data between layers.
- OpenAPI: Document the API.

### Application Layer

The application layer contains the business logic of the application. It consists of the following components:

- Interfaces: Define contracts.
- Mapping: Transform data between layers.
- Service:
  - Commands: Execute specific actions.
  - Queries: Retrieve data.
  - Utilities: Common functionality.
- Use Cases: Represent high-level actions.

### Domain Layer

The domain layer represents the core domain logic of the application. It includes the following components:

- Services:
  - Factories: Create domain objects.
  - Repositories: Persist and retrieve domain objects.

### Infrastructure Layer

The infrastructure layer provides support to the upper layers. It includes the following components:

- Interfaces: Define contracts with external systems.
- Localization: Handle internationalization and localization concerns.
- Modules: Encapsulate reusable infrastructure components.

Each layer is responsible for specific concerns, and the sublayers help organize and manage the complexity of the application architecture. This architecture follows the principles of Domain-Driven Design (DDD) and CQRS (Command Query Responsibility Segregation), which promote a clear separation of concerns and maintainability of the codebase.

## Installation

### Local Installation

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
      git clone https://github.com/sbahramian/interview-challenge.git
   ```

2. Navigate to the project directory:

   ```bash
      cd interview-challenge
   ```

3. Install dependencies:

   ```bash
      npm install --legacy-peer-deps
   ```

4. Please create `.env` file. you can use from sample `.env.example`:

   ```bash
      IS_DEVELOPMENT=
      LOG_LEVEL=
      LOG_PRETTY=
      JWT_SLAT=
      MYSQL_DATABASE_URL=
      REDIS_DB=
      REDIS_HOST=
      REDIS_USER=
      REDIS_PASS=
      REDIS_PORT=
   ```
5. Pushing Prisma Schema to the Database:

   This command will generate the Prisma Client based on the schema defined in your Prisma schema file.
   To push the Prisma schema to the database, ensuring that the database schema matches the schema defined in your Prisma schema file, run the following command in your terminal:

   ```bash
      npx prisma generate
   ```
6. This command will apply any pending migrations and update the database schema accordingly.

   ```bash
      npx prisma db push
   ```

7. Start the server:

   ```bash
      npm run start:dev
   ```

8. If get this error:
```bash
   Oops! Something went wrong! :(

   ESLint: 8.57.0

   ESLint couldn't find a configuration file. To set up a configuration file for this project, please run:

      npm init @eslint/config

   ESLint looked for configuration files in /interview-challenge/src/auth/application/guards and its ancestors. If it found none, it then looked in your home directory.

   If you think you already have a configuration file or if you need more help, please stop by the ESLint Discord server: https://eslint.org/chat
```
Please add this file `.eslintrc.js`:
```bash
   module.exports = {
      parser: '@typescript-eslint/parser',
      parserOptions: {
         project: 'tsconfig.json',
         tsconfigRootDir: __dirname,
         sourceType: 'module',
      },
      plugins: [
         '@typescript-eslint/eslint-plugin',
         'prettier'
      ],
      extends: [
         'plugin:@typescript-eslint/recommended',
         'plugin:prettier/recommended',
      ],
      root: true,
      env: {
         node: true,
         jest: true,
      },
      ignorePatterns: ['.eslintrc.js'],
      rules: {
         '@typescript-eslint/interface-name-prefix': 'off',
         '@typescript-eslint/explicit-function-return-type': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
         '@typescript-eslint/no-explicit-any': 'error',
         'prettier/prettier': 'error',
      },
   };
```

## Database Design

```bash
   User table:
      Columns:
         id (Primary Key, autoincrementing integer)
         username (String)
         password (String)
         email (String)
         avatar (String, nullable)
         firstName (String)
         lastName (String)
         createdAt (DateTime, defaulting to current timestamp)
         updatedAt (DateTime, updating automatically)
         latitude (Float, nullable)
         longitude (Float, nullable)
      Unique constraints on username and email
      Indexes on createdAt and updatedAt columns

   Like table:
      Columns:
         id (Primary Key, autoincrementing integer)
         userId (Foreign Key referencing User table)
         likedById (Integer)
         createdAt (DateTime, defaulting to current timestamp)
      Index on userId column
      
   Dislike table:
      Columns:
         id (Primary Key, autoincrementing integer)
         userId (Foreign Key referencing User table)
         dislikedById (Integer)
         createdAt (DateTime, defaulting to current timestamp)
      Index on userId column
```

### Docker Installation

Coming soon.

## Accessing Swagger Documentation

Once the server is running, you can access the Swagger documentation by navigating to:

```
   http://localhost:3000/doc/v1#/
```

This will open up the Swagger UI, where you can explore and interact with the available APIs.

## Explaining Backend Routes and Sample APIs

The backend routes and sample APIs are documented in the Swagger documentation mentioned earlier. Additionally, you can find detailed explanations and examples of each API endpoint in the \`[api-documentation-file]\` file.

```
   Interview NodeJs Challenge
   The Interview NodeJs Challenge API description


   Authorize
   Auth [Client]

   [POST] /client/v1/auth/sing-up
   Verify user email

   [POST] /client/v1/auth/sing-up/verify
   Verify otp code

   [POST] /client/v1/auth/sing-in
   Sing in

   [POST] /client/v1/auth/oauth/refresh-token
   Refresh Token


   User [Client]

   [GET] /client/v1/user/profile
   Get user profile information

   [PATCH] /client/v1/user/profile/update 
   Update user profile information

   [PATCH] /client/v1/user/location/update 
   Update user profile information
```

1. Sign up user
   Please enter this url:
   http://localhost:3000/doc/v1#/Auth%20%5BClient%5D/ClientV1AuthController_SignUp
   and send sample this body:
   ```json
      {
      "email": "john.deo@mail.com"
      }
   ```
   After run and call this endpoint, Now send otp code for user mail. Default OTP code is: `123456`.

   Now, please call this endpoint for complete sing up.
   http://localhost:3000/doc/v1#/Auth%20%5BClient%5D/ClientV1AuthController_VerifyCode
   send user data:
   ```json
      {
         "confirmation_code": "123456",
         "email": "john.deo@mail.com",
         "first_name": "John",
         "last_name": "Deo",
         "password": "PassWORD123@"
      }
   ```
   And get response for complete sign up user.
   ```json
      {
         "data": {
            "user": {
               "user_id": 1,
               "avatar": null,
               "username": "john.deo@mail.com",
               "first_name": "John",
               "last_name": "Deo"
            },
            "access_token": "U2FsdGVkX1+V+BLKWoBGS8nc86z1oAh404IcroMpdc6kRUgQi/yZBQDvsEhQvsWAeBamw/DhN+rsYMPL+wsbcMUPXEecBI2mm6+W1dCbg45C/Fzt1bJep2O5D9fwz2ujE+iwOC1ZSjozEEXSBM+IrKYdBsVhGSudWB7y7PKVm0L+1qpgdJ2zl2p8p1rBBuboY5Z5PJP6KPbAd+YAPhKzp8X1l219k587Pht7TC/GZoDbprL7mWvvqgBw6HeNyJI0lu5s+IL2/N6nvdDwOUnG+w==",
            "refresh_token": "U2FsdGVkX1+lU4CFrDR4xqvkSbgLUK7udOVETtMT6botepsr2FE8+mDSivCPESQGJyxSuGkS3pUyRLmgLxO63lLmZH28u7RTFQ7Uo+nIsTDdh/5g5h1urle52/lQ8j2vs3oA1sNCNKPeMOXeT1j9Vkn2CMP+24b8/Ew4eiw/mrWqTq10aXwNFHsrWFyiFmKvlBZTvGLkFmxXzq22PLCU61Eki70SoNO0w0RCjAG5uKapDT4U9kCBoN7f8H4HHPnQHv2+5cO+X03EYRhKL9/0ag=="
         },
         "meta": {
            "server_time": "2024-03-09T17:48:04.282Z",
            "has_error": false,
            "message": [
               {
               "code": {
                  "enum": "AUTH.VERIFY_CODE_CREATED",
                  "number": 10201
               },
               "text": {
                  "developer": "The user created!",
                  "client": "Congrats your user registerd on InterviewNodeJsChallenge!"
               }
               }
            ]
         }
      }
   ```

   2. Login user
   http://localhost:3000/doc/v1#/Auth%20%5BClient%5D/ClientV1AuthController_SingIn
   ```json
      {
         "email": "john.deo@mail.com",
         "password": "PassWORD123@"
      }
   ```
   And get access and refresh token:
   ```json
      {
         "data": {
            "user": {
               "user_id": 1,
               "avatar": null,
               "username": "john.deo@mail.com",
               "first_name": "John",
               "last_name": "Deo"
            },
            "access_token": "U2FsdGVkX19eTDrHkFvCMWWxBzHHmM3fPn+9pb6ggRcO1v3wiS1HP2rHXkZwtBLWh/XtIqYLyVr2ADrcF9pf9XRx9scqzzWiKIWXov36yDPs83SqaB7DPACCindsku/zgUZ1Rd0ahOEPUFJOr/W1XuvJ7/tJ8FbuoGkDI5tdhGysVbMgcb8stlYFNrBMe+ZuBMaZSX8/PGz1ENd0Gb5dm+TuAyOyPyShNDyxUpvWK43HMkzAoviiWV9DsDBmfvEaPa1SuU26ulPQYrQd+ujnIw==",
            "refresh_token": "U2FsdGVkX18sweKsK1Siv4vFbUyjl9Bz/HzYPFxZft/tNRmNIRLLuCcQsXq6Vven+ee48nJ7L+sZ20yEIOji4ne3F2xVG6s5PaJ8qDhiHw+/npKmYvhBG8rv0UcFWypCKAOg4bjO8rKeV//PRswdH2ozKOoXJ6XkHWf8HClJbBTffffCWofYBg61dNKXF17tJIvdS46FVWdDrBAFKPGimEX6cU+c2LcmmXmd/hyhz1T3B0BSpb9bbc9/IDu14gMTOZaF3iWJTFL4wi/i5BMMiQ=="
         },
         "meta": {
            "server_time": "2024-03-09T17:51:19.517Z",
            "has_error": false,
            "message": [
               {
               "code": {
                  "enum": "AUTH.VERIFY_CODE_COMPLETED",
                  "number": 10409
               },
               "text": {
                  "developer": "The confirmation code or otp token already completed to user!",
                  "client": "User already registered. Please sign in!"
               }
               }
            ]
         }
      }
   ```

   3. Get new access token with refresh token:
   http://localhost:3000/doc/v1#/Auth%20%5BClient%5D/ClientV1AuthController_RefreshToken
   Send current user refresh-token:
   ```json
      {
         "refresh_token": "U2FsdGVkX18sweKsK1Siv4vFbUyjl9Bz/HzYPFxZft/tNRmNIRLLuCcQsXq6Vven+ee48nJ7L+sZ20yEIOji4ne3F2xVG6s5PaJ8qDhiHw+/npKmYvhBG8rv0UcFWypCKAOg4bjO8rKeV//PRswdH2ozKOoXJ6XkHWf8HClJbBTffffCWofYBg61dNKXF17tJIvdS46FVWdDrBAFKPGimEX6cU+c2LcmmXmd/hyhz1T3B0BSpb9bbc9/IDu14gMTOZaF3iWJTFL4wi/i5BMMiQ=="
      }
   ```
   for get new access-token. If send not valid token get error:
   ```json
      {
         "meta": {
            "server_time": "2024-03-09T17:54:02.416Z",
            "has_error": true,
            "message": [
               "auth.REFRESH_TOKEN_UNAUTHORIZED"
            ]
         }
      }
   ```

   4. Get User profile:
   http://localhost:3000/doc/v1#/User%20%5BClient%5D/ClientV1UserController_GetMe
   sample response:
   ```json
      {
         "data": {
            "user": {
               "user_id": 1,
               "avatar": null,
               "first_name": "John",
               "last_name": "Deo",
               "email": "john.deo@mail.com",
               "username": "john.deo@mail.com",
               "latitude": null,
               "longitude": null
            }
         },
         "meta": {
            "server_time": "2024-03-09T17:55:32.923Z",
            "has_error": false,
            "message": [
               {
               "code": {
                  "enum": "GET_USER_PROFILE_SUCCESSFULLY",
                  "number": 10200
               },
               "text": {
                  "developer": "Get user profile successfully.",
                  "client": "Get user profile successfully."
               }
               }
            ]
         }
      }
   ```

   5. Update user profile:
   http://localhost:3000/doc/v1#/User%20%5BClient%5D/ClientV1UserController_UpdateUserProfile
   sample request:
   ```json
      {
         "first_name": "Saeid",
         "last_name": "Bahramian",
         "username": "saeid_b",
         "avatar": "https://avatar.com/sample-10.png"
      }
   ```
   sample response:
   ```json
      {
         "data": {
            "is_updated": true
         },
         "meta": {
            "server_time": "2024-03-09T17:58:31.996Z",
            "has_error": false,
            "message": [
               {
               "code": {
                  "enum": "UPDATING_USER_PROFILE_SUCCESSFULLY",
                  "number": 10200
               },
               "text": {
                  "developer": "User profile update successfully.",
                  "client": "User profile update successfully."
               }
               }
            ]
         }
      }
   ```

   6. Update user location
   http://localhost:3000/doc/v1#/User%20%5BClient%5D/ClientV1UserController_UpdateUserLocation
   sample request:
   ```json
      {
         "latitude": 10.52,
         "longitude": 10.52
      }
   ```
   sample response:
   ```json
      {
         "data": {
            "is_updated": true
         },
         "meta": {
            "server_time": "2024-03-09T17:59:27.771Z",
            "has_error": false,
            "message": [
               {
               "code": {
                  "enum": "UPDATING_USER_LOCATION_SUCCESSFULLY",
                  "number": 10200
               },
               "text": {
                  "developer": "User location update successfully.",
                  "client": "User location update successfully."
               }
               }
            ]
         }
      }
   ```

