import React, { Component } from 'react';
import { axios } from '@services/axios';
import { User } from '@state/actions/users-requests/actions';

export interface UserInfoProps {
  signOut: () => void;
  getCurrentUser: () => Promise<any>;
  error?: Error;
  isPending: boolean;
  currentUser?: User;
}

export class UserInfoComponent extends Component<UserInfoProps> {
  async componentDidMount() {
    const {
      getCurrentUser, 
      currentUser
    } = this.props;

    if (currentUser) return;

    getCurrentUser();
  }

  onSignOut = () => {
    const {signOut} = this.props;

    signOut();
  }

  render() {
    const {
      isPending, 
      currentUser,
      error,
    } = this.props;

    if (isPending) return 'Loading...';

    if (error) return error.message;

    if (!currentUser) return null;

    return (
      <div>
        Hello, {currentUser.name}!
        <button onClick={this.onSignOut}>Sign Out</button>
      </div>
    )
  }
}