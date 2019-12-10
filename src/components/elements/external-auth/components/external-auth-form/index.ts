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
import { Dispatch } from "redux";

const mapStateToProps = (state: AppState) => ({
  signInError: selectSignInError(state),
  isSignedIn: selectIsAuthenticated(state),
  isAuthPending: selectAuthPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: async (googleToken: string) => {
    await signIn({googleToken})(dispatch);
  }
})

export const ExternalSignUp = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ExternalAuthForm)
);
