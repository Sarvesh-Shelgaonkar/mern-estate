
# Authentication and Authorization in MERN Estate

This document explains the authentication and authorization mechanisms implemented in the MERN Estate project.

## 1. Authentication vs. Authorization

*   **Authentication** is the process of verifying the identity of a user. It answers the question, "Who are you?". In MERN Estate, this is done through email/password sign-in and Google authentication.
*   **Authorization** is the process of determining whether an authenticated user has permission to access a specific resource or perform a specific action. It answers the question, "What are you allowed to do?".

## 2. Authentication Strategy

The MERN Estate project uses **JSON Web Tokens (JWT)** for authentication. This is a stateless authentication mechanism, which means the server does not need to store session information about the user.

### How JWT Authentication Works:

1.  **User Sign-in:** The user provides their credentials (email and password) or authenticates via Google.
2.  **Token Generation:** If the credentials are valid, the server generates a JWT. This token contains a payload with user information (e.g., the user's ID) and is signed with a secret key.
3.  **Token Storage:** The server sends the JWT to the client, which stores it in an **HTTP-only cookie**. Storing the token in an HTTP-only cookie helps to prevent Cross-Site Scripting (XSS) attacks, as the token cannot be accessed by JavaScript.
4.  **Authenticated Requests:** For subsequent requests to protected routes, the client automatically sends the JWT in the cookie.
5.  **Token Verification:** The server has a middleware that intercepts incoming requests. This middleware verifies the JWT's signature to ensure its authenticity and extracts the user's information from the payload.
6.  **Authorization:** If the token is valid, the user is considered authenticated, and the server processes the request. If the token is invalid or missing, the server sends a `401` (Unauthorized) error.

### Key Libraries Used:

*   **`jsonwebtoken`**: A library for generating and verifying JWTs.
*   **`bcryptjs`**: A library for hashing passwords before storing them in the database. This ensures that even if the database is compromised, the user's passwords are not exposed.
*   **`cookie-parser`**: Middleware for handling cookies in Express.js, used to read the JWT from the cookie.

## 3. Authorization Strategy

Authorization is implemented using a middleware that checks for a valid JWT in the request. This middleware is applied to all routes that require authentication.

### Protected Routes:

In the MERN Estate project, routes for actions like creating a new listing, updating a user's profile, or deleting a listing are protected. Only authenticated users can access these routes.

The authorization middleware performs the following steps:

1.  **Extract Token:** It extracts the JWT from the HTTP-only cookie.
2.  **Verify Token:** It verifies the token's signature using the secret key.
3.  **Attach User to Request:** If the token is valid, it decodes the payload to get the user's ID and attaches the user's information to the request object (e.g., `req.user`).
4.  **Next Middleware:** It calls the `next()` function to pass control to the next middleware or the route handler.

If the token is invalid or missing, the middleware sends a `401` (Unauthorized) error, preventing the user from accessing the protected resource.
