/**
 * @typedef {'OK' | 'NG'} AutoJudgeStatus
 * @typedef {'UNSET' | 'OK' | 'NG' | 'NEEDS_DISCUSSION'} ReviewerJudgeStatus
 * @typedef {'意向把握' | '情報提供' | '適合性' | '不適切勧誘' | '重要事項'} IntentCheckCategory
 */

const intentCases = [
  {
    id: 'case-001',
    caseNo: 'IC-2025-0001',
    channel: '対面（店舗）',
    agentName: '佐藤 花子',
    intentConfirmedAt: '2025-12-05',
    productName: '○○生命 終身保険（低解約返戻金型）',
    status: 'UNAPPROVED',
    customerInfo: {
      name: '山田 太郎',
      insuredName: '山田 太郎',
      age: 42,
      familyStructure: '配偶者・子供2人（小学生）',
      job: '会社員（製造業）',
      incomeRange: '500万円～700万円',
      hasMortgage: true,
      existingPoliciesSummary: '医療保険（終身型）加入中、死亡保障は現在なし',
    },
    intentContent: {
      trigger: '住宅ローン返済中のため、万が一の際の保障を確保したい',
      purpose: '死亡保障の確保（住宅ローン残高相当額）',
      desiredPremium: '月額10,000円～15,000円',
      desiredPeriod: '終身',
      customerWords: '「子供がまだ小さいので、もしもの時のことを考えておきたい。住宅ローンも残っているので、最低限その分はカバーしたい」',
      agentSummary: 'お客様は住宅ローン返済中で、死亡保障の必要性を強く認識されています。現在加入中の医療保険は終身型で継続予定。死亡保障は現在加入していないため、住宅ローン残高相当額（約3,000万円）の保障を希望。保険料は月額10,000円～15,000円の範囲で検討可能。',
    },
    proposedPlans: [
      {
        productName: '○○生命 終身保険（低解約返戻金型）',
        coverageSummary: '死亡保障：3,000万円（終身）',
        premium: '月額12,500円',
        payMethod: '口座振替（月払い）',
        notes: '解約返戻金は低めに設定されているが、その分保険料を抑えている。',
      },
    ],
    explanationRecords: [
      {
        id: 'exp-001',
        label: '商品概要',
        explained: true,
      },
      {
        id: 'exp-002',
        label: '保障内容',
        explained: true,
      },
      {
        id: 'exp-003',
        label: '保険料',
        explained: true,
      },
      {
        id: 'exp-004',
        label: 'リスク説明',
        explained: true,
      },
      {
        id: 'exp-005',
        label: '解約返戻金',
        explained: true,
      },
      {
        id: 'exp-006',
        label: '契約者貸付',
        explained: false,
        notApplicable: true,
      },
    ],
    qandas: [
      {
        id: 'qa-001',
        question: 'この保険はいつまで保障が続きますか？',
        answer: '終身保険なので、お支払いいただいている限り、一生涯保障が続きます。',
        flagged: false,
      },
      {
        id: 'qa-002',
        question: '途中で解約した場合、お金は戻ってきますか？',
        answer: 'はい、解約返戻金があります。ただし、この商品は低解約返戻金型のため、解約返戻金は一般的な終身保険と比べて低めに設定されています。',
        flagged: true,
      },
      {
        id: 'qa-003',
        question: '保険料の支払い方法は選べますか？',
        answer: 'はい、月払い、半年払い、年払いからお選びいただけます。月払いが最も一般的です。',
        flagged: false,
      },
    ],
    checkItems: [
      {
        id: 'check-001',
        category: '意向把握',
        label: 'お客様の意向が明確に把握されている',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
      {
        id: 'check-002',
        category: '意向把握',
        label: '相談のきっかけが記録されている',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
      {
        id: 'check-003',
        category: '情報提供',
        label: '商品の概要が説明されている',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
      {
        id: 'check-004',
        category: '情報提供',
        label: 'リスクが適切に説明されている',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
      {
        id: 'check-005',
        category: '適合性',
        label: 'お客様のニーズに適合している',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
      {
        id: 'check-006',
        category: '適合性',
        label: '保険料負担が適切である',
        autoJudge: 'NG',
        reviewerJudge: 'UNSET',
        hasComment: true,
      },
      {
        id: 'check-007',
        category: '不適切勧誘',
        label: '不適切な勧誘行為がない',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
      {
        id: 'check-008',
        category: '重要事項',
        label: '重要事項説明書の交付が記録されている',
        autoJudge: 'OK',
        reviewerJudge: 'UNSET',
        hasComment: false,
      },
    ],
    approvalComments: [
      {
        id: 'comment-001',
        author: '田中 一郎',
        role: '承認者',
        status: 'PENDING',
        comment: '保険料負担について、お客様の収入範囲内か確認が必要です。',
        createdAt: '2025-12-06 10:30',
      },
    ],
  },
];

/**
 * @param {string} caseId
 * @returns {typeof intentCases[0] | undefined}
 */
export function getIntentCaseById(caseId) {
  return intentCases.find((c) => c.id === caseId || c.caseNo === caseId);
}

