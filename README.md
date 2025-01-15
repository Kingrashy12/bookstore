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
