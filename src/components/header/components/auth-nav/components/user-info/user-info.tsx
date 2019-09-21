import React, { Component } from 'react';
import { axios } from '@services/axios';

export interface UserInfoProps {
  signOut: () => void;
}

export interface UserInfoState {
  isPending: boolean;
  userName?: string;
}

export class UserInfoComponent extends Component<UserInfoProps, UserInfoState> {
  constructor(props: UserInfoProps) {
    super(props);

    this.state = {
      isPending: true,
      userName: undefined,
    };
  }

  async componentDidMount() {
    const {signOut} = this.props;

    try {
      const {data: {name}} = await axios.get<{
        name: string,
        email: string,
        _id: string
      }>('/api/users/current');

      this.setState({
        userName: name,
      })
    } catch (err) {
      signOut();
      console.error(err);
    } finally {
      this.setState({
        isPending: false
      });
    }
  }

  onSignOut = () => {
    const {signOut} = this.props;

    signOut();
  }

  render() {
    const {isPending, userName} = this.state;

    if (isPending) return 'Loading...';

    return (
      <div>
        Hello, {userName}!
        <button onClick={this.onSignOut}>Sign Out</button>
      </div>
    )
  }
}