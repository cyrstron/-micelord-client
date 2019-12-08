import {handleSignIn} from './handle-sign-in';
import {handleSignOut} from './handle-sign-out';

export const authMiddlewares = [
    handleSignIn,
    handleSignOut,
];