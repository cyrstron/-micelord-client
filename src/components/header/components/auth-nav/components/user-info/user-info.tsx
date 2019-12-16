import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { User } from '@state/actions/users-requests/actions';
import { CancelBtn } from '@components/buttons';

import styles from './user-info.scss';

const cx = classnames.bind(styles);

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
      <div className={cx('user-container')}>
        <div className={cx('user-info')}>
          <div className={cx('user-desc')}>
            Hello, {currentUser.name}!
          </div>
          <CancelBtn 
            className={cx('sign-out-btn')}
            onClick={this.onSignOut}
          >
            Sign Out
          </CancelBtn>
        </div>
        <img 
          className={cx('user-icon')}
          src="/static/user.svg"
        />
      </div>
    )
  }
}