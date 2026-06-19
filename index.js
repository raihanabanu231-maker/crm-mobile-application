/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Register for standard native builds
AppRegistry.registerComponent(appName, () => App);

// Register for Expo Go compatibility
AppRegistry.registerComponent('main', () => App);
