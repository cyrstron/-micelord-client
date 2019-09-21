import React, { ComponentType } from 'react';
import { Gapi, GoogleAuthConsumer } from '../google-auth-provider';

export interface GoogleApiCtxProps {
  gapi?: Gapi;
}

export const withGoogleAuthCtx = <Props extends {}>(
  Component: ComponentType<Props & GoogleApiCtxProps>
) => {
  const WithGoogleAuthCtx = (props: Props) => (
    <GoogleAuthConsumer>
      {(gapi?: Gapi) => (
        <Component 
          {...props}
          gapi={gapi}
        />
      )}
    </GoogleAuthConsumer>
  );

  return WithGoogleAuthCtx;
}