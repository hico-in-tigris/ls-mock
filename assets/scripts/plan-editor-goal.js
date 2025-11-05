(function(){
  // ===== 目標設定ワークスペースモジュール =====
  
  /**
   * 目標設定ワークスペースのUIを描画
   * @returns {string} HTML文字列
   */
  function renderGoalWorkspace() {
    return `
      <div class="card p-6">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">最終ゴール</label>
            <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="このプロジェクトで最終的に達成したいゴールは何ですか？"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">主要KPI（3〜5個）</label>
            <div class="space-y-3">
              <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="KPI 1: 例）月間利用者数 100名">
              <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="KPI 2: 例）顧客満足度 4.5/5.0以上">
              <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="KPI 3: 例）収支プラス転換（6ヶ月以内）">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">マイルストーン</label>
            <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="目標達成までの主要なマイルストーンを時系列で記載してください"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn-secondary" onclick="handleWorkspaceSave()">保存</button>
            <button class="btn" onclick="aiPolishWorkspace()">AIにブラッシュアップ</button>
            <button class="btn-primary" onclick="goToNextWorkspaceModule()">次のステップへ</button>
          </div>
        </div>
      </div>
    `;
  }

  // 公開API: plan-editor.jsから参照できるようにグローバルに配置
  window.renderGoalWorkspace = renderGoalWorkspace;
})();
