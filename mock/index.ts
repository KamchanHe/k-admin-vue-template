import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import Organization from './organization';
import Table from './table';
import User from './user';

export function setupProdMockServer() {
  createProdMockServer([...Organization, ...Table, ...User]);
}

export default {};
