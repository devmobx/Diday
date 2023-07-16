import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const scriptURL = NativeModules.SourceCode.scriptURL;
packagerHostname = scriptURL.split('://')[1].split(':')[0];

Reactotron.configure({ name: 'open-chat', host: packagerHostname })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .connect();

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
