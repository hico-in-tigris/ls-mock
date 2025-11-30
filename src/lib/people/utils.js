/**
 * PeopleOS - ユーティリティ関数
 * フィルタリング、ソート、データ変換などのヘルパー関数
 */

/**
 * 人物データを拡張して新しいフィールドを追加
 * 既存のAPIデータから新しいデータモデルに変換
 * 
 * @param {Object} person - 既存のPersonデータ
 * @returns {Object} 拡張されたPersonデータ
 */
export function enrichPersonData(person) {
  // 既存のデータから新しいフィールドを計算
  const projectCount = person.projects?.length || 0;
  const lastContactDays = person.lastContactAt 
    ? Math.floor((new Date() - new Date(person.lastContactAt)) / (1000 * 60 * 60 * 24))
    : 999;
  
  // ステータスの決定
  let status = '未接触';
  if (lastContactDays < 30) {
    status = '関係深化中';
  } else if (lastContactDays < 90) {
    status = '接触済み';
  }
  
  // アクティビティスコアの計算（簡易版）
  const activityScore = Math.min(100, Math.max(1,
    (projectCount * 15) +
    ((person.skills?.length || 0) * 5) +
    ((person.values?.length || 0) * 5) +
    (lastContactDays < 7 ? 30 : lastContactDays < 30 ? 20 : 10)
  ));
  
  // 思考ステージの決定（簡易版：プロジェクト数とスキル数から推定）
  let stage = '気づき';
  if (projectCount >= 3) {
    stage = '推進';
  } else if (projectCount >= 2) {
    stage = '仲間づくり';
  } else if (projectCount >= 1) {
    stage = 'プロジェクト化';
  } else if ((person.skills?.length || 0) >= 3) {
    stage = '検証';
  } else if ((person.values?.length || 0) >= 2) {
    stage = '仮説';
  }
  
  // 最近のアクティビティ（簡易版）
  const recentActivity = person.lastContactAt
    ? `${lastContactDays}日前に接触`
    : 'まだ接触していません';
  
  return {
    ...person,
    fullName: person.name || '',
    interests: person.values || [],
    skills: person.skills || [],
    area: [], // 今後追加予定
    recentActivity,
    projectCount,
    activityScore,
    stage,
    status
  };
}

/**
 * 人物リストをフィルタリング
 * 
 * @param {Object[]} people - 人物リスト
 * @param {Object} filters - フィルター条件
 * @returns {Object[]} フィルタリングされた人物リスト
 */
export function filterPeople(people, filters) {
  return people.filter(person => {
    // キーワード検索
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const matchesKeyword = 
        person.name?.toLowerCase().includes(keyword) ||
        person.fullName?.toLowerCase().includes(keyword) ||
        person.recentActivity?.toLowerCase().includes(keyword) ||
        person.interests?.some(i => i.toLowerCase().includes(keyword)) ||
        person.skills?.some(s => s.toLowerCase().includes(keyword));
      
      if (!matchesKeyword) return false;
    }
    
    // 関心タグ（OR条件）
    if (filters.interests && filters.interests.length > 0) {
      const matchesInterests = filters.interests.some(interest =>
        person.interests?.includes(interest)
      );
      if (!matchesInterests) return false;
    }
    
    // スキルタグ（OR条件）
    if (filters.skills && filters.skills.length > 0) {
      const matchesSkills = filters.skills.some(skill =>
        person.skills?.includes(skill)
      );
      if (!matchesSkills) return false;
    }
    
    // 思考ステージ
    if (filters.stage && filters.stage !== 'all') {
      if (person.stage !== filters.stage) return false;
    }
    
    // 役割
    if (filters.role && filters.role !== 'all') {
      if (person.role !== filters.role) return false;
    }
    
    // ステータス
    if (filters.status && filters.status !== 'all') {
      if (person.status !== filters.status) return false;
    }
    
    return true;
  });
}

/**
 * 人物リストをソート
 * 
 * @param {Object[]} people - 人物リスト
 * @param {string} sortBy - ソート基準 ('activityScore' | 'name' | 'projectCount')
 * @returns {Object[]} ソートされた人物リスト
 */
export function sortPeople(people, sortBy = 'activityScore') {
  const sorted = [...people];
  
  switch (sortBy) {
    case 'activityScore':
      return sorted.sort((a, b) => (b.activityScore || 0) - (a.activityScore || 0));
    case 'name':
      return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    case 'projectCount':
      return sorted.sort((a, b) => (b.projectCount || 0) - (a.projectCount || 0));
    default:
      return sorted;
  }
}

/**
 * すべての関心領域を抽出
 * 
 * @param {Object[]} people - 人物リスト
 * @returns {string[]} ユニークな関心領域のリスト
 */
export function extractAllInterests(people) {
  const interestsSet = new Set();
  people.forEach(person => {
    person.interests?.forEach(interest => interestsSet.add(interest));
  });
  return Array.from(interestsSet).sort();
}

/**
 * すべてのスキルを抽出
 * 
 * @param {Object[]} people - 人物リスト
 * @returns {string[]} ユニークなスキルのリスト
 */
export function extractAllSkills(people) {
  const skillsSet = new Set();
  people.forEach(person => {
    person.skills?.forEach(skill => skillsSet.add(skill));
  });
  return Array.from(skillsSet).sort();
}

