import mongoose, { mongo } from "mongoose";
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
      default:
        "https://files.oaiusercontent.com/file-AYszGRse4bWggsZbBEp6vB?se=2025-01-12T05%3A56%3A53Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D521a7440-96b1-4813-ae25-283386fb4fc6.webp&sig=EuCInCQfCVe3O9grTixU6riWm0u2UavJjRq/cYkGFc8%3D",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
