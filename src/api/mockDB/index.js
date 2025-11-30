/**
 * MockDB - Base44 SDKの代替実装
 * localStorageベースの擬似データベース
 */

import * as entities from './entities.js';
import * as integrations from './integrations.js';

// Base44 SDKと互換性のあるインターフェース
const mockDB = {
  entities: {
    Person: entities.Person,
    Interaction: entities.Interaction,
    Project: entities.Project,
    Action: entities.Action,
    Reflection: entities.Reflection,
    RegionData: entities.RegionData,
    Hypothesis: entities.Hypothesis,
    ThoughtEntry: entities.ThoughtEntry,
    Comment: entities.Comment,
    HypothesisShare: entities.HypothesisShare,
    Activity: entities.Activity,
  },
  auth: entities.auth,
  integrations: {
    Core: integrations.Core,
  },
};

// Seeder: 初期データの生成
function seedInitialData() {
  const { Person, Interaction, Hypothesis, Project } = entities;
  
  // Personデータが既にあるかチェック
  Person.list().then(people => {
    if (people.length === 0) {
      const roles = ['admin', 'coop', 'resident', 'npo', 'business', 'expert'];
      const roleLabels = {
        'admin': '行政',
        'coop': '協力隊',
        'resident': '住民',
        'npo': 'NPO',
        'business': '事業者',
        'expert': '専門家'
      };
      
      const skillsPool = [
        'ファシリテーション', '企画・イベント運営', '事業戦略', '農業・林業', 
        'デザイン・PR', 'マーケティング', '地域活性化', 'コミュニティ形成',
        '資金調達', 'プロジェクト管理', 'データ分析', 'SNS運用',
        '動画制作', 'Web制作', '写真撮影', 'ライティング', '翻訳',
        '会計・経理', '法律', '建築・設計', '医療・介護', '教育',
        '音楽', 'アート', '料理', '伝統工芸', 'スポーツ'
      ];
      
      const valuesPool = [
        '地域コミュニティの活性化', '持続可能な地域づくり', '若者の移住促進',
        '地域資源の活用', '高齢者支援', '子育て支援', '環境保護',
        '地域経済の活性化', '文化継承', '多様性の尊重',
        '防災', '健康・福祉', '教育', '観光振興', '農業振興',
        '空き家活用', '地域ブランディング', '起業支援', '働き方改革'
      ];
      
      const samplePeople = [
        {
          name: '田中 健一',
          role: 'resident',
          avatarUrl: null,
          skills: ['農業・林業', '地域コミュニティの活性化', '空き家活用'],
          values: ['持続可能な地域づくり', '地域資源の活用', '子育て支援'],
          description: '都市部からの移住希望。空き家活用に興味を持っている。子育て環境を重視。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'tanaka@example.com',
            phone: '090-1234-5678',
            sns: { twitter: null, instagram: null }
          }
        },
        {
          name: '佐藤 美咲',
          role: 'coop',
          avatarUrl: null,
          skills: ['企画・イベント運営', 'ファシリテーション', 'SNS運用', '動画制作'],
          values: ['若者の移住促進', '地域コミュニティの活性化', '観光振興'],
          description: '地域おこし協力隊2年目。イベント企画が得意で、観光振興に取り組んでいる。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'sato@example.com',
            phone: '090-2345-6789',
            sns: { twitter: '@sato_misaki', instagram: null }
          }
        },
        {
          name: '山田 太郎',
          role: 'admin',
          avatarUrl: null,
          skills: ['プロジェクト管理', '資金調達', '事業戦略'],
          values: ['地域経済の活性化', '持続可能な地域づくり'],
          description: '町役場まちづくり課。移住相談窓口担当。農業振興にも詳しい。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'yamada@kimobetsu.gov',
            phone: '0136-33-2211',
            sns: { twitter: null, instagram: null }
          }
        },
        {
          name: '鈴木 花子',
          role: 'business',
          avatarUrl: null,
          skills: ['マーケティング', 'デザイン・PR', '事業戦略', '写真撮影'],
          values: ['地域経済の活性化', '観光振興', '地域ブランディング'],
          description: '地元の民宿経営者。観光客誘致と地域イベントに積極的。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'suzuki@local-biz.com',
            phone: '090-3456-7890',
            sns: { twitter: '@suzuki_hana', instagram: '@suzuki_hana' }
          }
        },
        {
          name: '高橋 大学',
          role: 'expert',
          avatarUrl: null,
          skills: ['データ分析', '事業戦略', 'プロジェクト管理'],
          values: ['持続可能な地域づくり', '地域経済の活性化'],
          description: '農学部学生。地域の農業体験プログラムに参加中。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'takahashi@univ.ac.jp',
            phone: '090-4567-8901',
            sns: { twitter: null, instagram: null }
          }
        },
        {
          name: '伊藤 さくら',
          role: 'npo',
          avatarUrl: null,
          skills: ['コミュニティ形成', 'ファシリテーション', '高齢者支援'],
          values: ['高齢者支援', '地域コミュニティの活性化'],
          description: 'NPO法人代表。高齢者の見守り活動と地域コミュニティの形成に取り組む。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'ito@npo-example.org',
            phone: '090-5678-9012',
            sns: { twitter: null, instagram: '@ito_sakura' }
          }
        },
        {
          name: '中村 雄一',
          role: 'coop',
          avatarUrl: null,
          skills: ['農業・林業', '地域資源の活用', 'プロジェクト管理'],
          values: ['地域資源の活用', '持続可能な地域づくり'],
          description: '協力隊1年目。農業振興と地域資源の活用に取り組んでいる。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'nakamura@example.com',
            phone: '090-6789-0123',
            sns: { twitter: null, instagram: null }
          }
        },
        {
          name: '小林 みどり',
          role: 'resident',
          avatarUrl: null,
          skills: ['子育て支援', 'コミュニティ形成', 'イベント企画', 'ファシリテーション'],
          values: ['子育て支援', '地域コミュニティの活性化', '防災'],
          description: '子育て中の母親。地域の子育てサークルを運営。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'kobayashi@example.com',
            phone: '090-7890-1234',
            sns: { twitter: null, instagram: '@kobayashi_midori' }
          }
        },
        {
          name: '加藤 誠',
          role: 'business',
          avatarUrl: null,
          skills: ['事業戦略', '資金調達', 'マーケティング', '会計・経理'],
          values: ['地域経済の活性化', '若者の移住促進', '起業支援'],
          description: '地域の商工会会長。地域経済の活性化に取り組む。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'kato@shokokai.example.com',
            phone: '090-8901-2345',
            sns: { twitter: null, instagram: null }
          }
        },
        {
          name: '吉田 あかり',
          role: 'expert',
          avatarUrl: null,
          skills: ['デザイン・PR', 'SNS運用', 'マーケティング', 'Web制作', '写真撮影'],
          values: ['観光振興', '地域資源の活用', '地域ブランディング'],
          description: 'デザイナー。地域のPRとブランディングを支援。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'yoshida@design.example.com',
            phone: '090-9012-3456',
            sns: { twitter: '@yoshida_akari', instagram: '@yoshida_akari' }
          }
        },
        {
          name: '渡辺 翔太',
          role: 'expert',
          avatarUrl: null,
          skills: ['動画制作', 'Web制作', 'SNS運用', 'ライティング'],
          values: ['若者の移住促進', '観光振興', '地域ブランディング'],
          description: 'フリーランスの動画クリエイター。地域の魅力を動画で発信。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'watanabe@video.example.com',
            phone: '090-0123-4567',
            sns: { twitter: '@watanabe_shota', instagram: '@watanabe_shota' }
          }
        },
        {
          name: '斎藤 ゆり',
          role: 'resident',
          avatarUrl: null,
          skills: ['教育', 'コミュニティ形成', 'ファシリテーション'],
          values: ['教育', '子育て支援', '地域コミュニティの活性化'],
          description: '元教師。地域の教育活動と子育て支援に取り組む。',
          projects: [],
          hypotheses: [],
          interactions: [],
          lastContactAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          contact: {
            email: 'saito@example.com',
            phone: '090-1234-5678',
            sns: { twitter: null, instagram: null }
          }
        }
      ];
      
      // Personデータを作成
      samplePeople.forEach(person => {
        Person.create(person);
      });
    }
  });
}

// アプリ起動時に初期データをシード
if (typeof window !== 'undefined') {
  seedInitialData();
}

export default mockDB;
