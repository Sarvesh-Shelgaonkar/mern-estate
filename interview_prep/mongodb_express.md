
# MongoDB and Express.js in MERN Estate

This document explains how MongoDB and Express.js are used together in the MERN Estate project to create a robust back-end.

## 1. The Role of Express.js and MongoDB

*   **Express.js** is a minimal and flexible Node.js web application framework that provides a set of features for building web and mobile applications. In the MERN Estate project, it is used to create the RESTful API that the React front-end consumes.
*   **MongoDB** is a NoSQL, document-oriented database. It stores data in flexible, JSON-like documents, which means fields can vary from document to document and data structure can be changed over time. In this project, MongoDB is used to store user data, property listings, and other application data.

## 2. Connecting Express.js to MongoDB

The connection between the Express.js application and the MongoDB database is established using the **Mongoose** library. Mongoose is an Object Data Modeling (ODM) library that provides a straightforward, schema-based solution to model your application data.

### The Connection Process:

1.  **Installation:** The `mongoose` library is added as a dependency in the `package.json` file.
2.  **Configuration:** The MongoDB connection string is stored in an environment variable (`MONGO`) in the `.env` file for security. This prevents hardcoding sensitive information in the source code.
3.  **Connection Logic:** In `api/index.js`, the `mongoose.connect()` method is used to establish a connection to the MongoDB database. This is typically done when the application starts.

```javascript
// in api/index.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB connection error:', err.message));
```

## 3. Defining Data Models with Mongoose

Mongoose allows you to define a **schema** for your data. A schema defines the structure of the documents within a collection, including the data types, default values, validators, etc.

### Example: User Model

In the MERN Estate project, there is a `user.model.js` file that defines the schema for the `User` collection.

```javascript
// in api/models/user.model.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'default-avatar.png',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
```

*   **Schema Definition:** The `userSchema` defines the fields for a user document (`username`, `email`, `password`, `avatar`).
*   **Timestamps:** The `{ timestamps: true }` option automatically adds `createdAt` and `updatedAt` fields to the documents.
*   **Model Creation:** The `mongoose.model('User', userSchema)` line creates a `User` model from the schema. This model is then used to perform CRUD operations on the `users` collection in the database.

## 4. Performing CRUD Operations

Once the models are defined, you can use them in your Express.js controllers to interact with the database.

### Example: Creating a New User

In the `auth.controller.js` file, the `User` model is used to create a new user in the `signup` function.

```javascript
// in api/controllers/auth.controller.js

import User from '../models/user.model.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created Successfully');
  } catch (error) {
    next(error);
  }
};
```

*   **`new User(...)`**: Creates a new user instance based on the `User` model.
*   **`newUser.save()`**: Saves the new user instance to the MongoDB database.

By combining Express.js and MongoDB with Mongoose, the MERN Estate project has a powerful and flexible back-end that can easily handle data persistence and provide a robust API for the front-end.
