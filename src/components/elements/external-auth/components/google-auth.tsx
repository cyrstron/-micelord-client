import React, {Component} from 'react';

interface GoogleLoginProps {
  className?: string;
  clientId: string;
  onSuccess: (user: gapi.auth2.GoogleUser) => void;
  onFailure?: (reason: { error: string }) => void;
}

export class GoogleLogin extends Component<GoogleLoginProps> {
  auth2?: gapi.auth2.GoogleAuth;

  script?: HTMLScriptElement;

  async componentDidMount() {
    await new Promise((res, rej) => {
      if (window.gapi && window.gapi.auth2) {
        res();
        return;
      }

      this.script = document.createElement('script');
      this.script.src = 'https://apis.google.com/js/api.js';

      this.script.onload = res;
      this.script.onerror = rej;

      document.body.appendChild(this.script);
    });

    const {clientId} = this.props;

    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: clientId,
      });

      window.gapi.load('signin2', () => {
        window.gapi.signin2.render('google-login-btn', {
          width: 220,
          longtitle: true,
          height: 40,
          onsuccess: this.props.onSuccess,
          onfailure: this.props.onFailure,
        });
      });
    });
  }

  componentWillUnmount() {
    this.script && this.script.remove();

    if (!window.gapi.auth2) return;

    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signOut();
  }

  render() {
    const {className} = this.props;

    return (
      <div className={className}>
        <div id='google-login-btn' />
      </div>
    );
  }
}
