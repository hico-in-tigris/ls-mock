/**
 * PeopleOS - 型定義
 * LocalSuccess の思考フローに基づく人物データモデル
 */

/**
 * @typedef {Object} Person
 * @property {string} id - 人物ID
 * @property {string} name - 名前
 * @property {string} fullName - フルネーム
 * @property {"住民" | "協力隊" | "行政" | "企業" | "学生" | "その他"} role - 役割
 * @property {"未接触" | "接触済み" | "関係深化中"} status - 接触ステータス
 * @property {string[]} interests - 関心領域
 * @property {string[]} skills - スキル
 * @property {string[]} area - 活動エリア
 * @property {string} recentActivity - 最近の1行アクティビティ
 * @property {number} projectCount - 関わったプロジェクト数
 * @property {number} activityScore - アクティブ度（1〜100）
 * @property {"気づき" | "仮説" | "検証" | "プロジェクト化" | "仲間づくり" | "推進"} stage - 思考ステージ
 */

/**
 * 思考ステージの定義
 */
export const STAGES = [
  '気づき',
  '仮説',
  '検証',
  'プロジェクト化',
  '仲間づくり',
  '推進'
];

/**
 * 役割の定義
 */
export const ROLES = [
  '住民',
  '協力隊',
  '行政',
  '企業',
  '学生',
  'その他'
];

/**
 * ステータスの定義
 */
export const STATUSES = [
  '未接触',
  '接触済み',
  '関係深化中'
];

/**
 * ステージの色設定
 */
export const STAGE_COLORS = {
  '気づき': 'bg-ls-bg text-ls-text-light border-ls-border',
  '仮説': 'bg-ls-primary/10 text-ls-primary border-ls-primary/20',
  '検証': 'bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20',
  'プロジェクト化': 'bg-ls-accent/10 text-ls-accent border-ls-accent/20',
  '仲間づくり': 'bg-ls-success/10 text-ls-success border-ls-success/20',
  '推進': 'bg-ls-warning/10 text-ls-warning border-ls-warning/20'
};

/**
 * 役割の色設定
 */
export const ROLE_COLORS = {
  '住民': 'bg-ls-accent/10 text-ls-accent border-ls-accent/20',
  '協力隊': 'bg-ls-primary/10 text-ls-primary border-ls-primary/20',
  '行政': 'bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20',
  '企業': 'bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20',
  '学生': 'bg-ls-primary-light/10 text-ls-primary-light border-ls-primary-light/20',
  'その他': 'bg-ls-bg text-ls-text-light border-ls-border'
};

/**
 * ステータスの色設定
 */
export const STATUS_COLORS = {
  '未接触': 'bg-ls-bg text-ls-text-light border-ls-border',
  '接触済み': 'bg-ls-primary/10 text-ls-primary border-ls-primary/20',
  '関係深化中': 'bg-ls-success/10 text-ls-success border-ls-success/20'
};

