# Bookstore API

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running the Tests](#running-the-tests)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Example Requests](#example-requests)

## Prerequisites

- Node.js v14.x or higher
- npm
- PostgreSQL (for local development)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kingrashy12/bookstore.git
   cd bookstore
   ```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

- Create a .env file in the root of the project and add the necessary variables

```env
PORT=5000
PG_DB=database_name
PG_HOST=localhost
PG_USER=username
PG_PASS=password
```

## Running the Application

To run the application locally:

```bash
npm start
```

The server will be running at `http://localhost:5000`.

## Running the Tests

To run the tests:

```bash
npm test
```

To run a specific test file:

```bash
npm run test-books
```

```
npm run test-authors
```

## API Documentation

API documentation is available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Features

- Manage books, authors, and categories
- Pagination for large datasets
- Sorting and filtering options
- RESTful API with clear documentation (via Swagger)

## Example Requests

### Get All Books

```bash
GET /books
```

### Get Books by Category

```bash
GET /books/category/:category_id
```

### Publish a New Book

```bash
POST /books/publish
Content-Type: application/json

{
  "title": "Book Title",
  "author_id": 1,
  "category_id": 2
}

```

## Folder Structure

The project is organized into the following folders for clarity and maintainability:

```graphql
bookstore/
├── __test__/        # Contains unit and integration tests
├── config/          # Configuration files, including database connection setup
├── controller/      # Handles business logic for each route
├── middleware/      # Custom middleware functions for validation, authentication, etc.
├── routes/          # Defines all API routes and maps them to controllers
├── types/           # TypeScript type definitions for strong typing
├── utils/           # Utility functions used across the application
├── swagger.ts       # Swagger setup for API documentation
├── tsconfig.json    # TypeScript configuration file
├── jest.config.json # Jest configuration file for testing
├── error.log        # Logs errors for debugging and analysis
├── app.ts           # Entry point for initializing the application
├── server.ts        # Starts the server and connects to the database
├── package.json     # Project metadata and dependencies
└── README.md        # Documentation for the project
```

## Folder and File Descriptions

Below is the structure of the project and a description of each folder and file:

### Folders

- **config/**  
  Contains configuration files for setting up the database connection and other essential configurations.

- **controller/**  
  Holds the logic for handling requests and responses for different API endpoints.

- **middleware/**  
  Includes middleware functions used for validation, and other request/response processing tasks.

- **routes/**  
  Defines the API routes and maps them to their corresponding controller functions.

- **types/**  
  Contains TypeScript type definitions to ensure type safety throughout the application.

- **utils/**  
  Includes utility functions for tasks such as logging, error handling, and general reusable methods.

- \***\*test**/\*\*  
  Stores test files for each feature or module in the application, ensuring proper functionality through unit and integration tests.

### Files

- **swagger.ts**  
  Configures Swagger for API documentation, enabling users to interact with and understand the available endpoints.

- **tsconfig.json**  
  TypeScript configuration file, defining compiler options and project settings for TypeScript.

- **jest.config.json**  
  Configuration file for Jest, specifying the setup for running tests in the project.

- **error.log**  
  Log file that captures runtime errors for debugging and troubleshooting purposes.
