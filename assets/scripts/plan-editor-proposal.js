(function(){
  // ===== 提案作成ワークスペースモジュール =====
  
  /**
   * 提案作成ワークスペースのUIを描画
   * @returns {string} HTML文字列
   */
  function renderProposalWorkspace() {
    return `
      <div class="card p-6">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">提案の背景</label>
            <textarea class="w-full min-h-[80px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="なぜこの提案が必要なのか"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">提案内容</label>
            <textarea class="w-full min-h-[120px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="具体的に何を提案するのか"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">期待される効果</label>
            <textarea class="w-full min-h-[80px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="実施することでどんな効果が期待できるか"></textarea>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">必要な予算</label>
              <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="例）初期費用200万円、月次30万円">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">実施スケジュール</label>
              <input type="text" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="例）3ヶ月（準備1ヶ月、実施2ヶ月）">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">リスクと対策</label>
            <textarea class="w-full min-h-[80px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="想定されるリスクとその対策"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn-secondary">保存</button>
            <button class="btn-primary">提案書をエクスポート</button>
          </div>
        </div>
      </div>
    `;
  }

  // 公開API: plan-editor.jsから参照できるようにグローバルに配置
  window.renderProposalWorkspace = renderProposalWorkspace;
})();
