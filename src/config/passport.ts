import passport from "passport";
import { Strategy as googleStrategy, VerifyCallback,Profile  } from "passport-google-oauth20";
import User from "../modules/User/user.model";
import logger from "../utils/logger";

passport.use(
    new googleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID as string ,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL:process.env.CALLBACK_URL as string,
        },async  (accessToken :string,refreshToken: string, profile: Profile, done:VerifyCallback) =>{
            try {
                const email=profile?.emails?.[0].value
                if(!email){
                    return done(null,false,{message:"No Email Found"})
                }
              let user = await User.findOne({email})
              if(!user){
               user=await User.create({
                email,
                name:profile?.displayName,
                role:"user",
               })
              }
              return done(null,user,)
            } catch (error) {
                logger.error(error)
             done(error)
            }
        }
    )
)



//  Serialize
passport.serializeUser((user: any, done) => {
  done(null, user._id); // session এ শুধু ID
});

//  Deserialize
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});