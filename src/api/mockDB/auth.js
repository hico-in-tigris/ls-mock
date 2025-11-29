/**
 * MockDB Auth - Base44 authの代替実装
 */

/**
 * 現在のユーザー情報を取得
 */
export const me = async () => {
  // モックユーザー情報
  return Promise.resolve({
    id: 'mock_user_1',
    name: 'モックユーザー',
    email: 'mock@example.com',
    avatar: null,
    created_at: new Date().toISOString(),
  });
};

/**
 * 認証オブジェクト（Base44 SDK互換）
 */
export const auth = {
  me,
  // 必要に応じて他の認証メソッドを追加
  login: async (email, password) => {
    console.log('MockDB: login called with:', email);
    return Promise.resolve({
      success: true,
      user: await me(),
      token: 'mock_token'
    });
  },
  logout: async () => {
    console.log('MockDB: logout called');
    return Promise.resolve({ success: true });
  },
};

