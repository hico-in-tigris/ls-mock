// region-inference.js - 地域課題の自動推定ロジック

/**
 * 地域プロフィールとユーザープロフィールから地域課題を推定
 * @param {Object} regionProfile - 地域情報
 * @param {Object} userProfile - ユーザープロフィール
 * @returns {Array} 推定された課題の配列
 */
function inferRegionIssues(regionProfile, userProfile) {
    const issues = [];
    
    if (!regionProfile) return issues;
    
    const { population, agingRate, industries = [], tourismSpots = [] } = regionProfile;
    const interests = userProfile?.interests || [];
    
    // 高齢化率による課題推定
    if (agingRate >= 35) {
        issues.push({
            title: "移動・買い物の足の不足",
            reason: `高齢化率${agingRate}%と高く、公共交通や生活支援サービスの必要性が高い`,
            source: "inference"
        });
        
        issues.push({
            title: "地域コミュニティの維持",
            reason: "高齢化により地域活動の担い手不足が懸念される",
            source: "inference"
        });
    }
    
    // 人口規模による課題推定
    if (population && population < 3000) {
        issues.push({
            title: "人手不足と担い手の継承",
            reason: `人口${population.toLocaleString()}人と小規模で、各分野での人材確保が困難`,
            source: "inference"
        });
        
        issues.push({
            title: "基幹インフラの維持・更新",
            reason: "小規模自治体でのインフラ維持負担が重い",
            source: "inference"
        });
    }
    
    // 産業構造による課題推定
    if (industries.some(industry => industry.includes("農業"))) {
        issues.push({
            title: "収穫期の労働力確保・販路多角化",
            reason: "農業地域での季節労働力不足と販路開拓の必要性",
            source: "inference"
        });
        
        if (interests.includes("#DX")) {
            issues.push({
                title: "農業のスマート化・DX推進",
                reason: "ユーザーのDX関心と農業地域特性の組み合わせ",
                source: "inference"
            });
        }
    }
    
    // 観光業による課題推定
    if (industries.some(industry => industry.includes("観光")) || tourismSpots.length > 0) {
        issues.push({
            title: "観光の季節変動・オフシーズン対策",
            reason: "観光地での通年稼働率向上が重要",
            source: "inference"
        });
        
        if (interests.includes("#観光")) {
            issues.push({
                title: "回遊性不足とオフシーズン課題",
                reason: "ユーザーの観光関心と地域の観光資源を活用した課題解決",
                source: "inference"
            });
        }
        
        if (tourismSpots.length >= 3) {
            issues.push({
                title: "観光資源の効果的な組み合わせ",
                reason: `${tourismSpots.length}つの観光資源を活かした回遊促進`,
                source: "inference"
            });
        }
    }
    
    // ユーザーの関心領域による課題推定
    if (interests.includes("#空き家")) {
        issues.push({
            title: "空き家の流通・利活用スキーム不足",
            reason: "ユーザーの空き家関心と地域ニーズの組み合わせ",
            source: "inference"
        });
    }
    
    if (interests.includes("#教育")) {
        issues.push({
            title: "子育て世代の定住促進・教育環境整備",
            reason: "ユーザーの教育関心と地域の人口維持ニーズ",
            source: "inference"
        });
    }
    
    if (interests.includes("#福祉")) {
        issues.push({
            title: "地域包括ケア・見守り体制の充実",
            reason: "ユーザーの福祉関心と地域の高齢化対応",
            source: "inference"
        });
    }
    
    if (interests.includes("#起業")) {
        issues.push({
            title: "起業・創業支援環境の整備",
            reason: "地域での新規事業創出による活性化",
            source: "inference"
        });
    }
    
    // 重複除去（タイトルベース）
    const uniqueIssues = issues.filter((issue, index, self) =>
        index === self.findIndex(i => i.title === issue.title)
    );
    
    return uniqueIssues;
}

/**
 * 課題からプロジェクトプランを生成
 * @param {Object} issue - 選択された課題
 * @param {Object} userProfile - ユーザープロフィール
 * @param {Object} regionProfile - 地域プロフィール
 * @returns {Object} 生成されたプロジェクトプラン
 */
function createPlanFromIssue(issue, userProfile, regionProfile) {
    const planId = Date.now();
    const regionName = regionProfile?.name || "地域";
    
    // aspirationsの最初の1文を取得
    const aspirationSnippet = userProfile?.aspirations 
        ? userProfile.aspirations.split('。')[0] + '。'
        : "地域の課題解決に貢献したい。";
    
    const plan = {
        id: planId,
        title: `【${issue.title}】に対する90日プラン`,
        purpose: `${regionName}の「${issue.title}」に対して、${aspirationSnippet}`,
        status: "Plan",
        createdAt: new Date().toISOString().split('T')[0],
        tags: ["#プラン生成", "#課題解決"],
        relatedPeople: [],
        
        // 課題タイプに応じた具体的なスコープとKPI
        ...generatePlanDetails(issue, userProfile, regionProfile)
    };
    
    return plan;
}

function generatePlanDetails(issue, userProfile, regionProfile) {
    const skills = userProfile?.skills || [];
    const experiences = userProfile?.experiences || [];
    
    // 課題タイプの判定とそれに応じた計画詳細
    const issueTitle = issue.title.toLowerCase();
    
    if (issueTitle.includes("空き家")) {
        return {
            kpi: "空き家マッチング件数: 3件/90日、利活用プラン数: 5案",
            scope: "1. 空き家現状調査とデータベース化\n2. 利活用ニーズ調査と関係者マッピング\n3. マッチング促進イベントとスキーム設計",
            nextTry: "空き家所有者3名にヒアリング実施"
        };
    }
    
    if (issueTitle.includes("観光") || issueTitle.includes("回遊")) {
        return {
            kpi: "観光スポット回遊率: +15%、オフシーズン集客: +20%",
            scope: "1. 現在の観光動線と課題分析\n2. 地域資源の再編集と新ルート設計\n3. 実証イベントとフィードバック収集",
            nextTry: "観光案内所で現状ヒアリングと課題整理"
        };
    }
    
    if (issueTitle.includes("移動") || issueTitle.includes("買い物")) {
        return {
            kpi: "移動支援利用者数: 20名/月、満足度: 80%以上",
            scope: "1. 住民の移動・買い物実態調査\n2. 既存サービスとギャップ分析\n3. 新サービス実証実験",
            nextTry: "高齢者10名に移動・買い物の困りごとヒアリング"
        };
    }
    
    if (issueTitle.includes("農業") || issueTitle.includes("労働力")) {
        return {
            kpi: "労働力マッチング: 5組/月、収穫効率: +10%",
            scope: "1. 農家の労働力ニーズと時期の詳細調査\n2. 労働力供給源の開拓とマッチング\n3. 効率的な働き方モデルの検証",
            nextTry: "農協で農家5軒の労働力課題ヒアリング"
        };
    }
    
    if (issueTitle.includes("人手不足") || issueTitle.includes("担い手")) {
        return {
            kpi: "新規担い手候補: 3名、スキル継承完了項目: 5項目",
            scope: "1. 各分野の担い手状況と継承すべきスキル調査\n2. 担い手候補の発掘と関心喚起\n3. スキル継承プログラムの設計・実施",
            nextTry: "商工会で各業界の担い手状況ヒアリング"
        };
    }
    
    // デフォルトプラン
    return {
        kpi: "関係者接点数: 15件、課題理解度: 80%、解決案数: 3案",
        scope: "1. 課題の詳細調査と関係者ヒアリング\n2. 他地域事例調査と解決アプローチ検討\n3. 解決策プロトタイプの設計・検証",
        nextTry: "関係者5名にヒアリングアポ取得"
    };
}

// グローバルスコープに公開
window.inferRegionIssues = inferRegionIssues;
window.createPlanFromIssue = createPlanFromIssue;