import React, {Component} from 'react';
import classnames from 'classnames/bind';
import { GoogleLogin } from './components/google-auth';
import { observable } from 'mobx';

import styles from './external-auth.scss';
import { observer } from 'mobx-react';
import { ExternalSignUp } from './components/external-auth-form';
import { RouteComponentProps } from 'react-router';

const cx = classnames.bind(styles);

interface ExternalAuthProps extends RouteComponentProps {
  className?: string;
  signInWithGoogle: (googleToken: string) => Promise<void>;
  onAuthToken: (token: string) => void;
  isSignedIn: boolean;
}

@observer
class ExternalAuth extends Component<ExternalAuthProps> {
  @observable googleError?: string;
  @observable googleToken?: string;

  onGoogleSuccess = async (googleUser: gapi.auth2.GoogleUser) => {
    const {id_token: googleToken} = googleUser.getAuthResponse();
    const {signInWithGoogle} = this.props;

    await signInWithGoogle(googleToken);

    const {isSignedIn, history, onAuthToken} = this.props;

    if (isSignedIn) {
      history.push('/');

      return;
    }

    this.googleToken = googleToken;

    onAuthToken(googleToken);
  }

  onGoogleFailure = ({error}: {error: string}) => {
    this.googleError = error;
  }

  render() {
    const {className} = this.props;

    return (
      <>
        <div className={cx('wrapper', className)}>
          <GoogleLogin     
            clientId={process.env.GAPI_KEY}
            onSuccess={this.onGoogleSuccess}
            onFailure={this.onGoogleFailure}
          />
        </div>
        {this.googleToken && (
          <ExternalSignUp 
            googleToken={this.googleToken}
          />
        )}
      </>
    );
  }
}

export {ExternalAuth};