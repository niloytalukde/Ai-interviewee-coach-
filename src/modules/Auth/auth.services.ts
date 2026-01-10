import bcrypt from "bcryptjs";
import AppError from "../../middleware/AppError";
import User from "../User/user.model";
import { createUserToken } from "../../utils/createUserToken";
import { Response } from "express";

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ILoginPayload{
  email: string;
  password: string;
}
const registerUser = async (payload: IRegisterPayload ) => {
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

 const login = async (loginInfo: ILoginPayload) => {
  const { email, password } = loginInfo
  const user = await User.findOne({ email:email })

  if (!user || !user.password) {
  throw new AppError(404, "User not found");
}


  //  password match check
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(404, "Invalid credentials");
  }

  //  create  token
 const payload ={
      _id: user._id,
      email: user.email,
      role: user.role,
 }
   
  const tokenInfo = createUserToken(payload)
  return {
    tokenInfo,
    user:{
       _id: user._id,
      email: user.email,
      role: user.role,
    }
   
  };
};

const logout = async(res:Response)=>{

// Passport logout
      // Clear refresh and accessToken token cookie
       res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
     
    




}





export const authServices = { registerUser, login,logout };
