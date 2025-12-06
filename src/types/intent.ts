export type AutoJudgeStatus = 'OK' | 'NG';

export type ReviewerJudgeStatus = 'UNSET' | 'OK' | 'NG' | 'NEEDS_DISCUSSION';

export type IntentCheckCategory =
  | '意向把握'
  | '情報提供'
  | '適合性'
  | '不適切勧誘'
  | '重要事項';

export interface IntentCheckItem {
  id: string;
  category: IntentCheckCategory;
  label: string; // チェック項目名
  autoJudge: AutoJudgeStatus;
  reviewerJudge: ReviewerJudgeStatus;
  hasComment: boolean;
}

export interface CustomerInfo {
  name: string;
  insuredName: string;
  age: number;
  familyStructure: string;
  job: string;
  incomeRange: string;
  hasMortgage: boolean;
  existingPoliciesSummary: string;
}

export interface IntentContent {
  trigger: string; // 相談のきっかけ
  purpose: string; // 目的
  desiredPremium: string; // 希望保険料レンジ
  desiredPeriod: string; // 希望期間
  customerWords: string; // お客様の言葉（フリー）
  agentSummary: string; // 担当者要約
}

export interface ProposedPlan {
  productName: string;
  coverageSummary: string;
  premium: string;
  payMethod: string;
  notes?: string;
}

export interface ExplanationRecord {
  id: string;
  label: string; // 「商品概要」「リスク説明」など
  explained: boolean;
  notApplicable?: boolean;
}

export interface QandAItem {
  id: string;
  question: string;
  answer: string;
  flagged?: boolean; // 理解に懸念あり 等
}

export interface ApprovalComment {
  id: string;
  author: string;
  role: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
  comment: string;
  createdAt: string;
}

export interface IntentCase {
  id: string;
  caseNo: string;
  channel: string; // 対面 / Web 等
  agentName: string;
  intentConfirmedAt: string;
  productName: string;
  status: 'UNAPPROVED' | 'APPROVED' | 'REJECTED' | 'PENDING';
  customerInfo: CustomerInfo;
  intentContent: IntentContent;
  proposedPlans: ProposedPlan[];
  explanationRecords: ExplanationRecord[];
  qandas: QandAItem[];
  checkItems: IntentCheckItem[];
  approvalComments: ApprovalComment[];
}

