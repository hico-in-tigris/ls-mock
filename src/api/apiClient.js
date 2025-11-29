/**
 * API Client - MockDBを使用したAPIクライアント
 * Base44 SDK互換のインターフェースを提供
 */
import mockDB from './mockDB/index.js';

// Base44 SDK互換のクライアントオブジェクト
// 既存コードとの互換性のため、base44という名前でエクスポート
export const base44 = mockDB;
