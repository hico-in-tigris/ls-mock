// Base44 SDKの代わりにMockDBを使用
import mockDB from './mockDB/index.js';

// Base44 SDK互換のクライアントオブジェクト
export const base44 = mockDB;
