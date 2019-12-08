import React, {Component} from 'react';

interface GoogleLoginProps {
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
          width: 250,
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
  }

  render() {
    return (
      <div id='google-login-btn' />
    );
  }
}