import { Strategy as JWTStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

// dummy
const DUMMY_TOKEN_ID = 'dummy';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

const jwtVerify: VerifyCallback = async (jwtPayload, done) => {
  try {
    if (jwtPayload.id === DUMMY_TOKEN_ID) {
      // success
      done(null, {});
      return;
    }
    // failure
    done(null, false, 'ERROR MESSAGE');
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const jwt = new JWTStrategy(JWTConfig, jwtVerify);

export default jwt;
