import jwt from "jsonwebtoken";
import { ENV } from "./env";

export function generateToken(user: any) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    ENV.JWT_SECRET,
    { expiresIn: "24h" },
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET);
}
