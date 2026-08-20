import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import { env } from "../../config/env";
import { LoginInput } from "./auth.types";

export async function registerUser(data: {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });

  if (existing) {
    throw new AppError(409, "User already exists", "USER_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: { email: data.email, username: data.username, passwordHash, firstname: data.firstname, lastname: data.lastname },
  });
  const payload: JwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return {
    token,
    user,
  };
}

export async function loginUser(data: { email: string; password: string;}) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    throw new AppError(401, "Invalid Credentials", "INVALID_CREDENTIALS");
  }

  const passwordCompare = await bcrypt.compare(data.password, user.passwordHash);

  if (!passwordCompare) {
    throw new AppError(401, "Invalid Credentials", "INVALID_CREDENTIALS");
  }

  const payload: JwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return {
    token,
    user,
  };
}
