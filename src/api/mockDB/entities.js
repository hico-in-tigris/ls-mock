/**
 * MockDB Entities - 各エンティティのラッパー
 * Base44 SDKのentities APIと互換性を保つ
 */

import { createEntity } from './db.js';

/**
 * エンティティラッパークラス
 */
class EntityWrapper {
  constructor(entityName) {
    this.db = createEntity(entityName);
  }

  /**
   * リスト取得
   */
  list(sortBy = null) {
    return Promise.resolve(this.db.list(sortBy));
  }

  /**
   * IDで取得
   */
  get(id) {
    const item = this.db.findById(id);
    if (!item) {
      return Promise.reject(new Error(`Item with id ${id} not found`));
    }
    return Promise.resolve(item);
  }

  /**
   * 作成
   */
  create(data) {
    return this.db.create(data);
  }

  /**
   * 更新
   */
  update(id, data) {
    return this.db.update(id, data);
  }

  /**
   * 削除
   */
  delete(id) {
    return this.db.delete(id);
  }
}

/**
 * 認証ラッパー（簡易版）
 */
class AuthWrapper {
  /**
   * 現在のユーザー情報を取得
   */
  me() {
    // モックユーザーを返す
    return Promise.resolve({
      id: 'mock_user_1',
      name: 'テストユーザー',
      email: 'test@example.com',
      role: 'user',
    });
  }

  /**
   * ログイン（モック）
   */
  login(credentials) {
    return Promise.resolve({
      user: {
        id: 'mock_user_1',
        name: 'テストユーザー',
        email: credentials.email || 'test@example.com',
      },
      token: 'mock_token',
    });
  }

  /**
   * ログアウト（モック）
   */
  logout() {
    return Promise.resolve({ success: true });
  }
}

// エンティティをエクスポート
export const Person = new EntityWrapper('Person');
export const Project = new EntityWrapper('Project');
export const Action = new EntityWrapper('Action');
export const Reflection = new EntityWrapper('Reflection');
export const RegionData = new EntityWrapper('RegionData');
export const Hypothesis = new EntityWrapper('Hypothesis');
export const ThoughtEntry = new EntityWrapper('ThoughtEntry');
export const Comment = new EntityWrapper('Comment');
export const HypothesisShare = new EntityWrapper('HypothesisShare');
export const Activity = new EntityWrapper('Activity');

// 認証
export const auth = new AuthWrapper();
