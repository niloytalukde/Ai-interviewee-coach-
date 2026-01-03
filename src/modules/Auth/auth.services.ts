import bcrypt from "bcryptjs";
import AppError from "../../middleware/AppError";
import logger from "../../utils/logger";
import User from "../User/user.model";

interface IPayload {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (payload: IPayload) => {
  const { name, email, password } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _, ...safeUser } = user.toObject();

  return safeUser;
};


const login = async () => {};

export const authServices = { registerUser, login };
