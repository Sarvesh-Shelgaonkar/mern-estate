
# RESTful API in MERN Estate

This document explains the principles of REST (Representational State Transfer) and how they are applied in the MERN Estate project's back-end API.

## 1. What is a RESTful API?

A RESTful API is an architectural style for designing networked applications. It is based on a set of constraints that, when applied, result in a system that is scalable, performant, and easy to maintain. The core idea of REST is to treat all server-side resources as objects that can be created, read, updated, or deleted (CRUD) using standard HTTP methods.

### Key Principles of REST:

*   **Client-Server Architecture:** The client (front-end) and server (back-end) are separate and independent. This separation of concerns allows each to evolve independently.
*   **Statelessness:** Each request from a client to the server must contain all the information needed to understand and process the request. The server does not store any client context between requests.
*   **Cacheability:** Responses from the server can be cached by the client to improve performance.
*   **Uniform Interface:** A consistent and uniform interface between the client and server simplifies the architecture. This includes:
    *   **Resource-Based:** Resources are identified by URIs (e.g., `/api/users`, `/api/listings`).
    *   **Manipulation of Resources Through Representations:** The client interacts with a representation of the resource (e.g., JSON), not the resource itself.
    *   **Self-Descriptive Messages:** Each message includes enough information to describe how to process it.
    *   **Hypermedia as the Engine of Application State (HATEOAS):** Responses can include links to other related resources.

## 2. REST API in the MERN Estate Project

The MERN Estate back-end is built with Express.js and provides a RESTful API for the React front-end to consume. The API exposes a set of endpoints for interacting with the application's resources (users and listings).

### Example: User Authentication API

The user authentication API (`/api/auth`) provides endpoints for user signup, sign-in, and sign-out.

*   **`POST /api/auth/signup`**: Creates a new user.
    *   **Request Body:** A JSON object containing the user's `username`, `email`, and `password`.
    *   **Response:** A success message and a `201` (Created) status code.
*   **`POST /api/auth/signin`**: Authenticates an existing user.
    *   **Request Body:** A JSON object containing the user's `email` and `password`.
    *   **Response:** A JSON object with the user's details (excluding the password) and a `200` (OK) status code. A JWT is also sent in an HTTP-only cookie.
*   **`GET /api/auth/signout`**: Signs out the currently authenticated user.
    *   **Response:** A success message and a `200` (OK) status code.

### HTTP Methods Used:

The API uses standard HTTP methods to perform CRUD operations:

*   **`GET`**: To retrieve resources (e.g., get a user's listings).
*   **`POST`**: To create new resources (e.g., create a new user or a new listing).
*   **`PUT` / `PATCH`**: To update existing resources (e.g., update a user's profile or a listing).
*   **`DELETE`**: To delete resources (e.g., delete a listing).

### Data Format:

The API uses JSON (JavaScript Object Notation) as the data format for both request bodies and responses. This is a lightweight and easy-to-parse format that is well-suited for web APIs.
