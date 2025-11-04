// ===============================
// LocalSuccess - Reflection Data
// ===============================

// Sample reflection data
const reflectionData = {
    daily: [
        {
            date: '2024-01-20',
            selectedProject: 1, // デジタル移住サポートプログラム
            actions: [
                { time: '09:00', action: '田中さんとの打診会議', result: '移住相談のニーズ確認完了', type: 'meeting', projectId: 1 },
                { time: '14:00', action: 'プロジェクト企画書更新', result: 'VR体験機能の詳細を追加', type: 'work', projectId: 1 },
                { time: '16:30', action: '地域課題調査', result: '3件の新しい課題を発見', type: 'research', projectId: 2 }
            ],
            reflection: {
                good: '田中さんからの具体的なフィードバックが得られた',
                challenge: 'VR体験の技術的な実装方法を明確にする必要',
                next: '明日はVR技術パートナーと相談予定'
            },
            projectReflections: {
                1: {
                    good: '田中さんからの具体的なフィードバックが得られ、移住相談のニーズが明確になった',
                    challenge: 'VR体験の技術的な実装方法を明確にする必要がある',
                    next: '明日はVR技術パートナーと相談予定'
                },
                2: {
                    good: '新しい地域課題を3件発見できた',
                    challenge: '課題の優先度付けが必要',
                    next: '課題の詳細分析を実施'
                }
            }
        },
        {
            date: '2024-01-19',
            actions: [
                { time: '10:00', action: '移住体験ツアー企画', result: '初回プランを作成', type: 'planning' },
                { time: '15:00', action: '地域住民インタビュー', result: '5名からフィードバック収集', type: 'research' }
            ],
            reflection: {
                good: '住民の生の声を聞くことができた',
                challenge: 'ツアー内容をもっと具体化が必要',
                next: '体験内容の詳細設計を進める'
            }
        }
    ],
    weekly: [
        {
            week: '2024年1月第3週',
            period: '2024-01-15 〜 2024-01-21',
            dailySummary: '5日間で12のアクションを実施',
            achievements: [
                '移住相談システムの基本設計完了',
                'VR体験プロトタイプの企画策定',
                '地域住民からの初期フィードバック収集'
            ],
            challenges: [
                'VR技術の実装方法が未確定',
                '移住希望者のニーズ調査が不十分'
            ],
            nextWeekPlan: [
                'VR技術パートナーとの連携開始',
                '移住希望者アンケート実施',
                'プロトタイプ開発着手'
            ],
            kpiProgress: {
                '移住相談件数': { target: 50, actual: 12, progress: '24%' },
                '移住決定者数': { target: 5, actual: 1, progress: '20%' },
                '満足度': { target: 85, actual: 78, progress: '92%' }
            }
        }
    ],
    monthly: [
        {
            month: '2024年1月',
            period: '2024-01-01 〜 2024-01-31',
            weeklySummary: '4週間で計48のアクションを実施',
            majorAchievements: [
                '移住サポートプログラムの基盤構築',
                'デジタル移住相談システムの企画完成',
                '地域課題データベースの初期構築'
            ],
            mainChallenges: [
                'VRによる地域体験システムの技術選定',
                '移住希望者との継続的な関係構築方法',
                '地域住民の協力体制の強化'
            ],
            nextMonthFocus: [
                'VR体験システムのプロトタイプ開発',
                '移住希望者向けオンライン相談の本格運用',
                '地域住民との連携強化プログラム開始'
            ],
            kpiSummary: {
                '移住相談件数': { target: 50, actual: 32, growth: '+128%' },
                '移住決定者数': { target: 5, actual: 3, growth: '+200%' },
                '満足度': { target: 85, actual: 81, growth: '+8%' }
            },
            projectStatus: {
                try: { count: 2, promoted: 1 },
                plan: { count: 1, completed: 0 }
            }
        }
    ],
    yearly: [
        {
            year: '2024年',
            period: '2024-01-01 〜 2024-12-31',
            monthlySummary: '12ヶ月間で計576のアクションを実施',
            annualAchievements: [
                'デジタル移住サポートプログラムの完全運用開始',
                'VRによる地域体験システムの実装と普及',
                '移住希望者向け包括的サポート体制の確立',
                '地域課題解決プラットフォームの構築'
            ],
            yearlyLessons: [
                'デジタル技術と人的サポートの組み合わせが重要',
                '地域住民との信頼関係が成功の鍵',
                '継続的なフィードバック収集とシステム改善が必要'
            ],
            nextYearVision: [
                '他地域への展開モデルの確立',
                'AI活用による個別最適化サポート',
                '移住後の定着支援システムの強化'
            ],
            annualKPI: {
                '移住相談件数': { target: 200, actual: 245, achievement: '122%' },
                '移住決定者数': { target: 20, actual: 28, achievement: '140%' },
                '移住後定着率': { target: 80, actual: 89, achievement: '111%' },
                '地域満足度': { target: 85, actual: 91, achievement: '107%' }
            }
        }
    ]
};