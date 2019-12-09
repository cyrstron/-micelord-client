import { connect } from "react-redux";
import { SignUp } from "./sign-up";
import { signIn } from "@state/reducers/auth/auth-operations";
import { withRouter } from "react-router";

const SignUpComponent = connect(null, {
  signIn
})(
  withRouter(SignUp)
);

export {SignUpComponent as SignUp}