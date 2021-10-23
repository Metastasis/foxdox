import {setupWorker} from 'msw';
import {handlers as analysisHandlers} from '../analysis';

export const worker = setupWorker(
  ...analysisHandlers
);
