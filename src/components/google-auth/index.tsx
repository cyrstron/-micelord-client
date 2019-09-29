import React from 'react';
import {
  GoogleLogin, 
  GoogleLoginResponse, 
  GoogleLoginResponseOffline 
} from 'react-google-login';

interface Props {
  className?: string;
  onSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure: (res: any) => void;
}

export const GoogleAuth = ({
  className,
  onFailure,
  onSuccess,
}: Props) => (
  <div className={className}>
    <GoogleLogin 
      clientId={process.env.GAPI_KEY}
      buttonText="LOGIN WITH GOOGLE"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  </div>
)