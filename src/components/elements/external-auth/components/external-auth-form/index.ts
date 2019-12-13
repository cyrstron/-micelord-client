import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ExternalAuthForm as ExternalAuthFormComponent } from "./external-auth-form";
import { AppState } from "@state/index";
import { 
  selectSignInError, 
  selectIsAuthenticated, 
  selectAuthPending 
} from "@state/reducers/auth/auth-selectors";
import { signIn } from "@state/reducers/auth/auth-operations";
import { Dispatch } from "redux";
import { ExternalAuthData } from "@state/actions/auth-request/actions";

const mapStateToProps = (state: AppState) => ({
  signInError: selectSignInError(state),
  isSignedIn: selectIsAuthenticated(state),
  isAuthPending: selectAuthPending(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: async (authData: ExternalAuthData) => {
    if ('googleToken' in authData) {
      await signIn(authData)(dispatch);
    }
  }
})

export const ExternalAuthForm = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ExternalAuthFormComponent)
);
