/**
 * Mock Database - localStorageベースの擬似DB
 * Base44 SDKの代替として使用
 */

const DB_PREFIX = 'mockdb_';

/**
 * データベース操作の基本クラス
 */
class MockDB {
  constructor(entityName) {
    this.entityName = entityName;
    this.storageKey = `${DB_PREFIX}${entityName}`;
  }

  /**
   * 全データを取得
   */
  getAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${this.entityName}:`, error);
      return [];
    }
  }

  /**
   * データを保存
   */
  saveAll(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving ${this.entityName}:`, error);
      return false;
    }
  }

  /**
   * IDで検索
   */
  findById(id) {
    const all = this.getAll();
    return all.find(item => String(item.id) === String(id));
  }

  /**
   * リスト取得（ソート対応）
   */
  list(sortBy = null) {
    let data = this.getAll();

    if (sortBy) {
      const isDesc = sortBy.startsWith('-');
      const field = isDesc ? sortBy.slice(1) : sortBy;
      
      data.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return isDesc 
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return isDesc ? bVal - aVal : aVal - bVal;
        }
        
        // 日付文字列の比較
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return isDesc 
            ? bDate.getTime() - aDate.getTime()
            : aDate.getTime() - bDate.getTime();
        }
        
        return 0;
      });
    }

    return data;
  }

  /**
   * 新規作成
   */
  create(data) {
    const all = this.getAll();
    const newItem = {
      ...data,
      id: data.id || this.generateId(),
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
    };
    all.push(newItem);
    this.saveAll(all);
    return Promise.resolve(newItem);
  }

  /**
   * 更新
   */
  update(id, data) {
    const all = this.getAll();
    const index = all.findIndex(item => String(item.id) === String(id));
    
    if (index === -1) {
      return Promise.reject(new Error(`${this.entityName} with id ${id} not found`));
    }

    all[index] = {
      ...all[index],
      ...data,
      id: all[index].id, // IDは変更不可
      updated_at: new Date().toISOString(),
    };
    
    this.saveAll(all);
    return Promise.resolve(all[index]);
  }

  /**
   * 削除
   */
  delete(id) {
    const all = this.getAll();
    const filtered = all.filter(item => String(item.id) !== String(id));
    
    if (filtered.length === all.length) {
      return Promise.reject(new Error(`${this.entityName} with id ${id} not found`));
    }
    
    this.saveAll(filtered);
    return Promise.resolve({ success: true });
  }

  /**
   * ID生成
   */
  generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 全データ削除（デバッグ用）
   */
  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

/**
 * エンティティファクトリー
 */
export function createEntity(entityName) {
  return new MockDB(entityName);
}

/**
 * 全データベースをクリア（デバッグ用）
 */
export function clearAllDB() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(DB_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}



