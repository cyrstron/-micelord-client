import React, {Component} from 'react';

export interface FacebookUser {
  name: string;
  id: string;
  email: string;
}

interface FacebookLoginProps {
  className?: string;
  appId: string;
  onSuccess: (
    authResponce: fb.AuthResponse, 
    user: FacebookUser
  ) => void;
  onFailure?: (reason: { error: string }) => void;
}

declare global {
  interface Window {
    fbAsyncInit: () => void;
    checkFacebookLogin: () => void;
  }
}

export class FacebookLogin extends Component<FacebookLoginProps> {
  script?: HTMLScriptElement;
  isConnected: boolean = false;

  async componentDidMount() {
    const {
      appId,
    } = this.props;

    await new Promise((res, rej) => {   
      this.script = document.createElement('script');
      this.script.src = `http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=${appId}&autoLogAppEvents=1`;
      this.script.onerror = rej;
      this.script.onload = res;

      document.body.appendChild(this.script);
    });

    this.checkStatus();

    window.checkFacebookLogin = this.checkStatus;
  }

  checkStatus = async () => {
    const {onSuccess} = this.props;

    const response = await new Promise<fb.StatusResponse>((res) => {
      window.FB.getLoginStatus(res);
    });

    if (response.status !== 'connected') return;

    this.isConnected = true;

    const user = await new Promise<FacebookUser>((res) => {
      window.FB.api('/me?fields=name,id,email', res);
    });
    
    onSuccess(response.authResponse, user);
  }

  componentWillUnmount() {
    this.script && this.script.remove();

    if (!window.FB) return;

    if (this.isConnected) {
      window.FB.logout();
    }

    delete window.FB;
    delete window.checkFacebookLogin;
  }

  render() {
    const {className} = this.props;

    return (
      <div className={className}>
        <div
          className="fb-login-button" 
          data-width="220"
          data-size="large" 
          data-button-type="login_with" 
          data-auto-logout-link="false" 
          data-use-continue-as="false"
          data-scope="public_profile, email"
          data-onlogin='checkFacebookLogin'
        />
        <div id='fb-root' />
      </div>
    );
  }
}
