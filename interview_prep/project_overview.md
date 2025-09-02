
# MERN Estate: Project Overview

This document provides a high-level overview of the MERN Estate project, a full-stack web application for real estate listings.

## 1. Project Description

MERN Estate is a modern, responsive, and feature-rich real estate marketplace. It allows users to browse, search, and view property listings. Authenticated users can also create, manage, and delete their own listings. The project also includes user authentication features, including email/password signup and sign-in, as well as Google authentication.

## 2. Technology Stack

The project is built using the MERN stack, which includes:

*   **MongoDB:** A NoSQL database used to store application data, including user information and property listings.
*   **Express.js:** A back-end web application framework for Node.js, used to build the RESTful API.
*   **React:** A front-end JavaScript library for building user interfaces. The client-side of the application is a single-page application (SPA) built with React.
*   **Node.js:** A JavaScript runtime environment that executes JavaScript code on the server-side.

### Key Libraries and Tools:

*   **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. It is used to define the schema for the data and interact with the database.
*   **JSON Web Tokens (JWT):** Used for implementing user authentication and authorization.
*   **Bcrypt.js:** A library for hashing passwords before storing them in the database.
*   **Cookie-parser:** Middleware for handling cookies in Express.js.
*   **Tailwind CSS:** A utility-first CSS framework used for styling the front-end.
*   **Vite:** A build tool that provides a faster and leaner development experience for modern web projects.

## 3. Core Features

*   **User Authentication:**
    *   User signup with email and password.
    *   User sign-in with email and password.
    *   Google authentication (OAuth).
    *   Password hashing for security.
    *   Protected routes for authenticated users.
*   **Property Listings:**
    *   Create, read, update, and delete (CRUD) operations for property listings.
    *   Ability to upload images for listings.
    *   Search and filtering functionality for listings.
*   **User Profiles:**
    *   User profile page with the ability to update user information.
    *   View of user's own property listings.

## 4. Architecture

The application follows a client-server architecture:

*   **Client (Frontend):** A React single-page application (SPA) responsible for the user interface and user experience. It communicates with the back-end API to fetch and display data.
*   **Server (Backend):** A Node.js and Express.js application that provides a RESTful API for the client. It handles business logic, interacts with the MongoDB database, and manages user authentication.

The back-end is structured using the Model-View-Controller (MVC) pattern, which separates the application's concerns into three interconnected components:

*   **Models:** Define the data structure (schema) and interact with the database.
*   **Views:** (In the context of a REST API) The data returned to the client in JSON format.
*   **Controllers:** Handle the application's logic, process incoming requests, and send responses.
