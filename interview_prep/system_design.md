
# System Design of MERN Estate

This document outlines the system design and architecture of the MERN Estate project.

## 1. Architectural Style

The MERN Estate project is designed as a **three-tier architecture**, which is a well-established software architecture pattern that separates applications into three logical and physical computing tiers:

1.  **Presentation Tier (Client-Side):** This is the user interface and the user-facing part of the application. In MERN Estate, this is a **React Single-Page Application (SPA)**.
2.  **Application Tier (Server-Side):** This tier contains the business logic of the application. It is a **Node.js and Express.js server** that exposes a RESTful API.
3.  **Data Tier (Database):** This tier is responsible for storing and managing the application's data. It consists of a **MongoDB NoSQL database**.

This architecture promotes separation of concerns, scalability, and flexibility.

## 2. System Components

### a. Client (Front-End)

*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API or a similar state management library (e.g., Redux Toolkit) is used for managing global state like the current user.
*   **Routing:** `react-router-dom` is used for client-side routing, enabling navigation between different pages without a full page reload.
*   **API Communication:** The client communicates with the back-end API using a library like `axios` or the built-in `fetch` API to make HTTP requests.

### b. Server (Back-End)

*   **Runtime Environment:** Node.js
*   **Framework:** Express.js
*   **Database Interaction:** Mongoose ODM is used to interact with the MongoDB database.
*   **Authentication:** JWT-based authentication is implemented to secure the API.
*   **Architecture:** The back-end follows the Model-View-Controller (MVC) pattern to organize the code.

### c. Database

*   **Database:** MongoDB
*   **Data Models:** Mongoose schemas are used to define the structure of the data for users and listings.
    *   **Users Collection:** Stores user information, including username, email, hashed password, and profile picture.
    *   **Listings Collection:** Stores property listing details, such as name, description, address, price, images, and a reference to the user who created it.

## 3. Data Flow

Here is an example of the data flow for a user creating a new listing:

1.  **User Interaction:** The user fills out a form in the React front-end to create a new listing and clicks the "Create Listing" button.
2.  **API Request:** The React application sends a `POST` request to the `/api/listing/create` endpoint of the back-end server. The request includes the listing data in the request body and the user's JWT in an HTTP-only cookie.
3.  **Authentication Middleware:** The back-end server's authentication middleware intercepts the request, verifies the JWT, and attaches the user's information to the request object.
4.  **Controller:** The `createListing` controller function is executed. It validates the incoming data.
5.  **Model:** The controller creates a new `Listing` model instance with the provided data and saves it to the MongoDB database.
6.  **API Response:** The server sends a `201` (Created) response to the client with the newly created listing data.
7.  **UI Update:** The React application receives the response and updates the UI to show the new listing or a success message.

## 4. Scalability and Performance

*   **Stateless Back-End:** The use of JWT for authentication makes the back-end stateless, which allows for horizontal scaling. You can run multiple instances of the back-end server behind a load balancer.
*   **Asynchronous Operations:** The non-blocking, asynchronous nature of Node.js allows the server to handle a large number of concurrent connections efficiently.
*   **Database Indexing:** To improve database query performance, indexes can be added to the MongoDB collections on frequently queried fields (e.g., the `email` field in the `users` collection).
*   **Client-Side Rendering:** As a Single-Page Application, the front-end is loaded once, and subsequent navigation is handled on the client-side, which can result in a faster user experience after the initial load.

## 5. Security Considerations

*   **Password Hashing:** User passwords are not stored in plain text. They are hashed using `bcryptjs` before being saved to the database.
*   **JWT Security:** JWTs are stored in HTTP-only cookies to mitigate XSS attacks.
*   **Environment Variables:** Sensitive information like database connection strings and JWT secrets are stored in environment variables and not committed to version control.
*   **Input Validation:** The back-end should perform validation on all incoming data to prevent malicious input.
*   **Error Handling:** A centralized error handling middleware is used to prevent sensitive information from being leaked in error messages.
