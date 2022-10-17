import { InjectionKey } from 'vue';
import type { ControlDataType } from '../types';

export const controlDataKey: InjectionKey<ControlDataType | undefined> =
  Symbol('controlData');

export default {};
