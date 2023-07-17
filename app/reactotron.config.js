import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';

const scriptURL = NativeModules.SourceCode.scriptURL;
const packagerHostname = scriptURL.split('://')[1].split(':')[0];

console.disableYellowBox = true;

Reactotron.configure({
  name: 'diday',
  host: packagerHostname,
  createSocket: (path) => {
    console.log(path);
    return new ReactotronFlipper(path);
  },
});

Reactotron.setAsyncStorageHandler(AsyncStorage);
Reactotron.useReactNative();
Reactotron.use(reactotronRedux());

//  patch console.log to send log to reactotron
const consoledotlog = console.log;
console.log = (...args) => {
  consoledotlog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}
