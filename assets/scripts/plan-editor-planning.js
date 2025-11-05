/**
 * plan-editor-planning.js
 * 企画構成ワークスペースとフレームワーク群（5W1H / SWOT / 4P / BMC / Lean Canvas）
 */
(function() {
  'use strict';

  // 選択中のフレームワークを保持（デフォルト: 5W1H）
  let planningFramework = '5w1h';

  /**
   * フレームワークタブ切り替え（インラインonclick から呼び出される）
   */
  window.selectPlanningFramework = function(framework) {
    planningFramework = framework;
    // planning ワークスペースを再レンダリング
    if (typeof window.toggleWorkspaceModule === 'function') {
      window.toggleWorkspaceModule('planning');
    }
  };

  /**
   * 企画構成ワークスペースのメイン UI レンダリング
   */
  window.renderPlanningWorkspace = function() {
    const frameworks = [
      { id: '5w1h', label: '5W1H' },
      { id: 'swot', label: 'SWOT' },
      { id: '4p', label: '4P' },
      { id: 'bmc', label: 'BMC' },
      { id: 'lean', label: 'Lean Canvas' }
    ];

    const tabButtons = frameworks.map(f => `
      <button
        onclick="selectPlanningFramework('${f.id}')"
        class="px-4 py-2 rounded ${planningFramework === f.id ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}"
      >
        ${f.label}
      </button>
    `).join('');

    return `
      <div class="space-y-6">
        <div class="flex gap-2 flex-wrap">
          ${tabButtons}
        </div>
        <div class="border rounded-lg p-6 bg-white shadow-sm">
          ${renderPlanningFrameworkContent()}
        </div>
        <div class="flex gap-4">
          <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            <i class="fas fa-save mr-2"></i>保存
          </button>
          <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            <i class="fas fa-file-export mr-2"></i>エクスポート
          </button>
        </div>
      </div>
    `;
  };

  // --- フレームワーク別コンテンツ生成 ---

  function renderPlanningFrameworkContent() {
    switch(planningFramework) {
      case '5w1h': return renderPlanning5W1H();
      case 'swot': return renderPlanningSWOT();
      case '4p': return renderPlanning4P();
      case 'bmc': return renderPlanningBMC();
      case 'lean': return renderPlanningLeanCanvas();
      default: return renderPlanning5W1H();
    }
  }

  function renderPlanning5W1H() {
    return `
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">なぜやるのか（Why）</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="目的・理由・背景"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">何をやるのか（What）</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="実施する内容・サービス・商品"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">誰がやるのか（Who）</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="担当する人・組織"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">いつやるのか（When）</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="開始時期・期間・スケジュール"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">どこでやるのか（Where）</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="場所・エリア・拠点"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">どうやるのか（How）</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="手段・手法・運営方法"></textarea>
        </div>
      </div>
    `;
  }

  function renderPlanningSWOT() {
    return `
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">強み</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="活かせる資源、経験、スキルなど"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">弱み</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="足りないもの、改善が必要なこと"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">機会</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="追い風になりそうなこと（制度、流行、ニーズなど）"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">脅威</label>
          <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="向かい風になりそうなこと（競合、規制、代替手段など）"></textarea>
        </div>
      </div>
    `;
  }

  function renderPlanning4P() {
    return `
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-2">何を提供するか（製品・サービス）</label>
          <textarea class="w-full min-h-[90px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="お客さまにどんな価値を届けるか"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">価格はいくらか</label>
          <textarea class="w-full min-h-[90px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="料金プランや割引の考え方"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">どこで/どう届けるか（チャネル）</label>
          <textarea class="w-full min-h-[90px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="オンライン/オフラインなどの提供方法"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">どうやって知ってもらうか（告知・集客）</label>
          <textarea class="w-full min-h-[90px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="SNS、広告、イベントなど"></textarea>
        </div>
      </div>
    `;
  }

  function renderPlanningBMC() {
    return `
      <div class="grid md:grid-cols-3 gap-4">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium mb-1">重要なパートナー</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="協力先、連携する団体・企業"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">主要な活動</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="価値を生むための中核活動"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">主要な資源</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="人・物・お金・知識など"></textarea>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium mb-1">価値提案</label>
            <textarea class="w-full min-h-[150px] px-2 py-2 border rounded-md" placeholder="お客さまにとっての嬉しい点・解決する困りごと"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">顧客との関係</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="どのように関係を築き維持するか"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">チャネル</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="価値を届ける経路（Web、店舗など）"></textarea>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium mb-1">顧客セグメント</label>
            <textarea class="w-full min-h-[150px] px-2 py-2 border rounded-md" placeholder="どんな人に価値を届けるか"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">コスト構造</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="主な費用の種類（固定費・変動費など）"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">収益の流れ</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="どのようにお金が入るか（料金、手数料など）"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlanningLeanCanvas() {
    return `
      <div class="grid md:grid-cols-3 gap-4">
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium mb-1">問題</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="お客さまが抱える困りごと"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">解決策</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="その困りごとをどう解決するか"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">大事な指標</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="成功を測るための数字（登録数、継続率など）"></textarea>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium mb-1">独自の価値</label>
            <textarea class="w-full min-h-[100px] px-2 py-2 border rounded-md" placeholder="他では得られない価値は何か"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">他に真似できない強み</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="自分たちだけが持っている優位性"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">チャネル</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="どの経路で価値を届けるか"></textarea>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium mb-1">顧客セグメント</label>
            <textarea class="w-full min-h-[100px] px-2 py-2 border rounded-md" placeholder="価値を届けたい相手（ペルソナなど）"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">コスト構造</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="主にかかる費用（固定費・変動費）"></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">収益の流れ</label>
            <textarea class="w-full min-h-[90px] px-2 py-2 border rounded-md" placeholder="どのようにお金が入るか"></textarea>
          </div>
        </div>
      </div>
    `;
  }

})();
