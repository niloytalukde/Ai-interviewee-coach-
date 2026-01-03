import { Response, Router, Request, NextFunction } from "express";
import passport from "passport";
import { authController } from "./auth.contoraller";

const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  }
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/sign-in" }),
  authController.googleCallback
);
export default authRouter;
