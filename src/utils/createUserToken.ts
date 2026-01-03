import jwt from "jsonwebtoken";


export const createUserToken = (payload:any) => {
  //  Access Token 
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  //  Refresh Token 
  const refreshToken = jwt.sign(
    { _id: payload._id },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
