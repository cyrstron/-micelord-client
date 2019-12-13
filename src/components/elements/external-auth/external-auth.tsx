import React, {Component, ReactNode} from 'react';
import classnames from 'classnames/bind';
import { GoogleLogin } from './components/google-auth';
import { FacebookLogin, FacebookUser } from './components/facebook-auth';
import { observer } from 'mobx-react';
import { ExternalAuthForm } from './components/external-auth-form';
import { RouteComponentProps } from 'react-router';
import { observable, computed } from 'mobx';

import { FacebookAuthData, ExternalAuthData } from '@state/actions/auth-request/actions';
import styles from './external-auth.scss';

const cx = classnames.bind(styles);

interface ExternalAuthProps extends RouteComponentProps {
  className?: string;
  signInWithGoogle: (googleToken: string) => Promise<void>;
  signInWithFacebook: (
    email: string,
    facebookToken: string,
  ) => Promise<void>;
  isSignedIn: boolean;
  authError?: Error;
  children: ReactNode
}

@observer
class ExternalAuth extends Component<ExternalAuthProps> {
  @observable googleToken?: string;
  @observable fbInfo?: FacebookAuthData;

  @computed
  get hasToken(): boolean {
    return !!this.googleToken || !!this.fbInfo;
  }

  onGoogleSuccess = async (googleUser: gapi.auth2.GoogleUser) => {
    const {id_token: googleToken} = googleUser.getAuthResponse();
    const {signInWithGoogle} = this.props;

    await signInWithGoogle(googleToken);

    const {isSignedIn, history, authError} = this.props;

    if (isSignedIn) {
      history.push('/');

      return;
    }

    if (authError) return;

    this.googleToken = googleToken;
  }

  onFacebookSuccess = async (
    fbResponse: fb.AuthResponse,
    user: FacebookUser,
  ) => {
    const {accessToken} = fbResponse;
    const {email} = user;
    
    const {signInWithFacebook} = this.props;

    await signInWithFacebook(email, accessToken);

    const {isSignedIn, history, authError} = this.props;

    if (isSignedIn) {
      history.push('/');

      return;
    }

    if (authError) return;
    
    this.fbInfo = {
      email,
      facebookToken: accessToken,
    };
  }

  render() {
    const {
      className, 
      authError, 
      children,
    } = this.props;

    return (
      <>
        <div className={cx('wrapper', className)}>
          <GoogleLogin
            className={cx('auth-item')}
            clientId={process.env.GAPI_KEY}
            onSuccess={this.onGoogleSuccess}
          />
          <FacebookLogin
            className={cx('auth-item')}
            appId={process.env.FB_KEY}
            onSuccess={this.onFacebookSuccess}
          />
        </div>
        {authError && (
          authError.message
        )}
        {!authError && this.hasToken && (
          <ExternalAuthForm 
            authData={{
              googleToken: this.googleToken,
              ...this.fbInfo,
            } as ExternalAuthData}
          />
        )}
        {!this.hasToken && (
          children
        )}
      </>
    );
  }
}

export {ExternalAuth};