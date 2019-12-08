import React, {Component} from 'react';
import classnames from 'classnames/bind';
import { GoogleLogin } from './components/google-auth';
import { observable } from 'mobx';

import styles from './external-auth.scss';
import { observer } from 'mobx-react';

const cx = classnames.bind(styles);

interface ExternalAuthProps {
  className?: string;
  onGoogleAuth: (googleToken: string) => void;
}

@observer
class ExternalAuth extends Component<ExternalAuthProps> {
  @observable googleError?: string;

  onGoogleSuccess = (googleUser: gapi.auth2.GoogleUser) => {
    const authResponse = googleUser.getAuthResponse();

    this.props.onGoogleAuth(authResponse.id_token);
  }

  onGoogleFailure = ({error}: {error: string}) => {
    this.googleError = error;
  }

  render() {
    const {className} = this.props;

    return (
      <div className={cx('wrapper', className)}>
        <GoogleLogin     
          clientId={process.env.GAPI_KEY}
          onSuccess={this.onGoogleSuccess}
          onFailure={this.onGoogleFailure}
        />
      </div>
    );
  }
}

export {ExternalAuth};