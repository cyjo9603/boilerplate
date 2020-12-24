import passport from 'passport';

import passportJWT from './jwt';
import passportLocal from './local';

export default () => {
  passport.use('local', passportLocal);
  passport.use('jwt', passportJWT);
};
