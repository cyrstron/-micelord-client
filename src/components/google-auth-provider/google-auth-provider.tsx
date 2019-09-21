import React, { Component, createContext, ReactNode } from "react";
import { GoogleAuthService } from "./service/google-auth-service";

export interface Gapi {
  auth2: Auth2;
  load: (lib: string, callback: () => void) => void;
}

export interface Auth2 {
  getAuthInstance: () => gapi.auth2.GoogleAuth;
  init: () => Promise<Auth2>;
  currentUser: gapi.auth2.CurrentUser;
}

declare global {
  interface Window {
    gapi: Gapi
  }
};

export interface GoogleAuthProviderProps {
  clientId: string;
  children: ReactNode;
}

export interface GoogleAuthProviderState {
  gapi?: Gapi;
}

const GoogleAuthContext = createContext<Gapi | undefined>(undefined);

export const GoogleAuthConsumer = GoogleAuthContext.Consumer;

export class GoogleAuthProvider extends Component<
  GoogleAuthProviderProps,
  GoogleAuthProviderState
> {
  metaScope: HTMLMetaElement = document.createElement('meta');
  metaClientId: HTMLMetaElement = document.createElement('meta');
  apiScript: HTMLScriptElement = document.createElement('script');

  constructor(props: GoogleAuthProviderProps) {
    super(props);

    const {clientId} = props;

    this.metaScope.setAttribute('name', "google-signin-scope");
    this.metaScope.setAttribute('content', "profile email");
    
    this.metaClientId.setAttribute('name', "google-signin-client_id");
    this.metaClientId.setAttribute('content', `${clientId}.apps.googleusercontent.com`);

    this.apiScript.setAttribute('src', "https://apis.google.com/js/platform.js");
    this.apiScript.setAttribute('async', '');

    this.state = {
      gapi: undefined,
    }
  }

  onApiLoad = async () => {
    const {gapi} = window;

    let googleUser: gapi.auth2.GoogleUser | undefined; 

    try {
      await new Promise((res) => {
        gapi.load('auth2', () => {
          res();
        });
      });
  
      const auth2 = await gapi.auth2.init();

      googleUser = auth2.currentUser.get();
    } catch (err) {
      console.error(err);
    }

    if (!googleUser) return;

    const {'id_token': idToken} = googleUser.getAuthResponse();

    const googleAuthService = new GoogleAuthService(gapi.auth2.getAuthInstance());

    this.setState({
      gapi: window.gapi,
    });
  }

  componentDidMount() {
    this.apiScript.addEventListener('load', this.onApiLoad);

    document.head.append(
      this.metaScope,
      this.metaClientId,
      this.apiScript
    );
  }

  componentWillUnmount() {
    this.apiScript.removeEventListener('load', this.onApiLoad);

    this.metaScope.remove();
    this.metaClientId.remove();
    this.apiScript.remove();
  }

  render() {
    const {children} = this.props;
    const {gapi} = this.state;

    return (
      <GoogleAuthContext.Provider
        value={gapi}
      >
        {children}
      </GoogleAuthContext.Provider>
    );
  }
}