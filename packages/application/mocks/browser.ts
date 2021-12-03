import {setupWorker} from 'msw';
import {handlers as analysisHandlers} from '../analysis';

export const worker = setupWorker(
  ...analysisHandlers
);

const __DEV__ = process.env.NODE_ENV === 'development';
if (__DEV__) {
  worker.start({onUnhandledRequest: 'bypass'});
}
