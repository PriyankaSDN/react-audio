import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Recorder from './recorder/Recorder'
import Player from './player/Player'

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key='recorder' title='Recorder' component={Recorder} />
        <Scene key='player' title='Player' component={Player} />
      </Scene>
      </Router>
    )
  }
}
