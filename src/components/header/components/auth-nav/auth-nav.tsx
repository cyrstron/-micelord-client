import React, {Component} from 'react';
import classNames from 'classnames/bind';

import styles from './auth-nav.scss';
import { Link } from 'react-router-dom';
import { UserInfo } from './components/user-info';

const cx = classNames.bind(styles);

export interface AuthInfoProps {
  isAuthenticated: boolean;
  needValidation: boolean;
  isPending: boolean;
  validateToken: () => Promise<void>
  className?: string;
}

export class AuthNavComponent extends Component<AuthInfoProps> {
  componentDidMount() {
    const {
      needValidation,
      validateToken,
    } = this.props;

    if (!needValidation) return;

    validateToken();
  }

  render() {
    const {isAuthenticated, isPending} = this.props;

    return (
      <div className={cx(classNames)}>
        {isPending && (
          'Loading...'
        )}
        {isAuthenticated && (
          <UserInfo />
        )}
        {!isAuthenticated && (
          <>
            <Link to='/sign-up'>Sign Up</Link>
            <Link to='/sign-in'>Sign In</Link>
          </>
        )}
      </div>
    );
  }
}
