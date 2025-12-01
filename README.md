# Klarin Server

Klarin Server is a RESTful API backend for a To-Do List application. It provides user authentication (signup, login) using JWT and CRUD operations for managing todo items. The application is built using Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: Secure signup and login endpoints using JSON Web Tokens (JWT).
- **Todo Management**: Create, read, update, and delete todo items.
- **Data Persistence**: Uses PostgreSQL for reliable data storage.
- **Validation**: Request body validation using Joi.
- **API Documentation**: Swagger UI integrated for API exploration.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mas-andri/klarin_server.git
    cd klarin_server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following configuration:

    ```env
    PORT=3000
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=klarin_db
    SECRET=your_jwt_secret_key
    ```

4.  **Database Setup:**
    Execute the SQL commands in `models/klarin.sql` to create the necessary tables in your PostgreSQL database.

## Running the Application

- **Development Mode:**

  ```bash
  npm start
  ```

  This uses `nodemon` to restart the server on file changes.

- **Production Mode:**
  ```bash
  node index.js
  ```

The server will start on `http://localhost:3000` (or the port specified in your `.env`).

## API Documentation

Once the server is running, you can access the Swagger API documentation at:

```
http://localhost:3000/docs
```

## Project Structure

- `controllers/`: Request handlers for API endpoints.
- `lib/`: Helper modules (Database connection, Passport configuration).
- `middlewares/`: Express middlewares (Authentication, Validation).
- `models/`: Database models and queries.
- `routes/`: API route definitions.
- `validators/`: Joi validation schemas.
