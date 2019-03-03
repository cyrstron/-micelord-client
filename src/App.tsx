import classNames from 'classnames/bind';
import styles from './app.scss';
import React, { Component } from 'react';
import {PositionMap} from '@components/maps';
import DevTools from 'mobx-react-devtools';

const cx = classNames.bind(styles);

class App extends Component<{}, {string: string}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      string: 'hello',
    };
  }

  async componentDidMount() {
    try {
      const request = await fetch('/api/hello');
      const string = await request.text();
      this.setState({
        string,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {string} = this.state;

    return (
      <div className={cx('App')}>
        <header className={cx('App-header')}>
          {string}
        </header>
        <PositionMap/>
        <DevTools />
      </div>
    );
  }
}

export default App;
