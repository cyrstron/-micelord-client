import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ExternalAuthForm } from "./external-auth-form";
import { AppState } from "@state/index";
import { 
  selectSignInError, 
  selectIsAuthenticated, 
  selectAuthPending 
} from "@state/reducers/auth/auth-selectors";
import { signIn } from "@state/reducers/auth/auth-operations";
import { ComponentType } from "react";

const mapStateToProps = (state: AppState) => ({
  signInError: selectSignInError(state),
  isSignedIn: selectIsAuthenticated(state),
  isAuthPending: selectAuthPending(state),
});

export const ExternalSignUp = connect(mapStateToProps, {
  signIn
})(
  withRouter(ExternalAuthForm)
);
