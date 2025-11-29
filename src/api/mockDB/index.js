/**
 * MockDB - Base44 SDKの代替実装
 * localStorageベースの擬似データベース
 */
import { entities } from './entities.js';
import { Core } from './integrations.js';
import { auth } from './auth.js';

/**
 * Base44 SDK互換のクライアントオブジェクト
 */
export const mockDB = {
  entities,
  integrations: {
    Core,
  },
  auth,
};

export default mockDB;

