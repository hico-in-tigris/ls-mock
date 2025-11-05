(function(){
  // ===== ステークホルダー管理モジュール =====
  let stakeholders = []; // 追加されたステークホルダーのリスト

  // ステークホルダーワークスペースの描画
  window.renderStakeholderWorkspace = function() {
    return `
      <div class="card p-6">
        <div class="space-y-6">
          <!-- ネットワークから候補を選択 -->
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
            <div class="flex items-start gap-3 mb-3">
              <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <div class="flex-1">
                <p class="text-sm font-medium text-blue-900 mb-2">ネットワークから候補を選ぶ</p>
                <div class="flex items-center gap-2">
                  <button onclick="openNetworkPicker()" class="inline-flex items-center text-sm px-3 py-1.5 rounded-md bg-white border border-blue-300 text-blue-700 hover:bg-blue-50">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    ネットワークから選択
                  </button>
                  <span class="text-xs text-blue-700">登録されている人物から簡単に追加できます</span>
                </div>
              </div>
            </div>
          </div>

          <!-- スキル・役割の充足状況 -->
          <div id="gap-analysis-section" class="hidden">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div class="flex-1">
                  <p class="text-sm font-medium text-yellow-900 mb-2">スキル・役割の不足分析</p>
                  <div id="gap-analysis-content" class="text-sm text-yellow-800"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <label class="block text-sm font-medium">ステークホルダーマップ</label>
              <button onclick="analyzeGaps()" class="text-xs px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                不足分析を表示
              </button>
            </div>
            <div class="grid grid-cols-1 gap-4">
              <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium">主要ステークホルダー</h4>
                  <button onclick="addStakeholderRow()" class="text-sm text-primary hover:underline">+ 手動で追加</button>
                </div>
                <div id="stakeholder-list" class="space-y-2">
                  <!-- ステークホルダー行が動的に追加される -->
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">コミュニケーション計画</label>
            <textarea id="stakeholder-comm-plan" class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="各ステークホルダーとどのように連携・報告していきますか？"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn-secondary" onclick="handleWorkspaceSave()">保存</button>
            <button class="btn" onclick="aiPolishWorkspace()">AIにブラッシュアップ</button>
            <button class="btn-primary" onclick="goToNextWorkspaceModule()">次のステップへ</button>
          </div>
        </div>
      </div>

      <!-- ネットワークピッカーモーダル -->
      <div id="network-picker-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
          <div class="p-4 border-b flex items-center justify-between">
            <h3 class="text-lg font-semibold">ネットワークから関係者を選択</h3>
            <button onclick="closeNetworkPicker()" class="text-muted-foreground hover:text-foreground">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-4">
            <input 
              type="text" 
              id="network-search" 
              placeholder="名前や役割で絞り込み..."
              class="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              oninput="filterNetworkPicker(this.value)"
            />
            <div id="network-picker-list" class="space-y-2 max-h-[50vh] overflow-y-auto">
              <!-- 人物リストが動的に生成される -->
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ネットワークピッカーを開く
  window.openNetworkPicker = function() {
    const modal = document.getElementById('network-picker-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    renderNetworkPickerList();
  };

  // ネットワークピッカーを閉じる
  window.closeNetworkPicker = function() {
    const modal = document.getElementById('network-picker-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  // 役割から期待できるスキル・貢献を推定（内部）
  function getSuggestedContributions(person) {
    const roleContributions = {
      '役場': ['行政手続き支援', '補助金・助成金情報', '地域政策への反映', '公的機関との連携'],
      '協力隊': ['イベント企画', 'SNS発信', '移住者視点のアドバイス', 'コミュニティづくり'],
      '住民': ['地域の実情・歴史の共有', '口コミ拡散', '実行面でのサポート'],
      '事業者': ['ビジネスノウハウ', '施設・設備の提供', '収益モデルのアドバイス', '顧客ネットワーク'],
      '学生': ['若い視点', '調査・研究協力', 'SNS・デジタル活用', '新しいアイデア'],
      'メディア': ['広報・PR', '取材・情報発信', '認知度向上', 'ブランディング支援'],
      '研究者': ['専門知識', 'データ分析', '学術的裏付け', '他地域事例の紹介'],
      'デザイナー': ['ビジュアルデザイン', 'ブランディング', 'UI/UX設計', '資料作成'],
      '移住希望者': ['利用者視点', 'ニーズの具体化', '初期ユーザー', 'フィードバック'],
    };

    const contributions = roleContributions[person.role] || ['専門性の共有', 'ネットワーク提供'];
    const tagContributions = [];
    if (person.tags) {
      if (person.tags.some(t => t.includes('農業'))) tagContributions.push('農業知識・実践');
      if (person.tags.some(t => t.includes('観光'))) tagContributions.push('観光振興ノウハウ');
      if (person.tags.some(t => t.includes('空き家'))) tagContributions.push('物件情報・不動産知識');
      if (person.tags.some(t => t.includes('イベント'))) tagContributions.push('イベント運営経験');
      if (person.tags.some(t => t.includes('移住'))) tagContributions.push('移住支援・相談');
    }

    return [...contributions, ...tagContributions].slice(0, 4);
  }

  // ネットワークから人物リストを描画（内部）
  function renderNetworkPickerList(filterText = '') {
    const listContainer = document.getElementById('network-picker-list');
    if (!listContainer) return;

    const people = (typeof sampleData !== 'undefined' && sampleData.people) ? sampleData.people : [];
    const filtered = people.filter(p => {
      if (!filterText) return true;
      const query = filterText.toLowerCase();
      return p.name.toLowerCase().includes(query) || 
             p.role.toLowerCase().includes(query) ||
             (p.tags && p.tags.some(t => t.toLowerCase().includes(query)));
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = '<p class="text-center text-muted-foreground py-8">該当する人物が見つかりません</p>';
      return;
    }

    listContainer.innerHTML = filtered.map(person => {
      const contributions = getSuggestedContributions(person);
      return `
        <div class="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors" onclick="selectStakeholderFromNetwork(${person.id})">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
                ${person.avatar || person.name.substring(0, 1)}
              </div>
              <div>
                <div class="font-semibold text-base">${person.name}</div>
                <div class="text-sm text-muted-foreground">${person.role}</div>
                ${person.tags ? `
                  <div class="flex items-center gap-1 mt-1">
                    ${person.tags.slice(0, 3).map(tag => 
                      `<span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">${tag}</span>`
                    ).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
          ${person.notes ? `
            <p class="text-xs text-muted-foreground mb-3 line-clamp-2">${person.notes}</p>
          ` : ''}
          <div class="bg-green-50 border-l-2 border-green-400 px-3 py-2 rounded-r">
            <div class="text-xs font-medium text-green-900 mb-1">💡 期待できる貢献・役割</div>
            <div class="flex flex-wrap gap-1">
              ${contributions.map(c => 
                `<span class="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">${c}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ネットワークピッカーのフィルタリング
  window.filterNetworkPicker = function(query) {
    renderNetworkPickerList(query);
  };

  // ネットワークから関係者を選択
  window.selectStakeholderFromNetwork = function(personId) {
    const people = (typeof sampleData !== 'undefined' && sampleData.people) ? sampleData.people : [];
    const person = people.find(p => p.id === personId);
    if (!person) return;

    const stakeholder = {
      id: Date.now(),
      name: person.name,
      role: person.role,
      expectations: '',
      concerns: '',
      influence: 'middle',
      fromNetwork: true,
      networkPersonId: person.id
    };

    stakeholders.push(stakeholder);
    renderStakeholderList();
    closeNetworkPicker();
    showNotification(`${person.name}さんを関係者に追加しました`, 'success');
  };

  // 手動でステークホルダー行を追加
  window.addStakeholderRow = function() {
    const stakeholder = {
      id: Date.now(),
      name: '',
      role: '',
      expectations: '',
      concerns: '',
      influence: 'middle',
      fromNetwork: false
    };
    stakeholders.push(stakeholder);
    renderStakeholderList();
  };

  // ステークホルダーを削除
  window.removeStakeholder = function(id) {
    stakeholders = stakeholders.filter(s => s.id !== id);
    renderStakeholderList();
  };

  // ステークホルダーリストを描画（内部）
  function renderStakeholderList() {
    const listContainer = document.getElementById('stakeholder-list');
    if (!listContainer) return;

    if (stakeholders.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-8 text-muted-foreground">
          <p class="mb-2">まだ関係者が追加されていません</p>
          <p class="text-sm">「ネットワークから選択」または「手動で追加」してください</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = stakeholders.map(s => `
      <div class="grid grid-cols-5 gap-2 items-center text-sm p-2 border rounded hover:bg-accent/50">
        <div>
          ${s.fromNetwork ? `
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span class="font-medium">${s.name}</span>
            </div>
            <div class="text-xs text-muted-foreground">${s.role}</div>
          ` : `
            <input type="text" value="${s.name}" placeholder="名前・役割" 
              class="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
              onchange="updateStakeholder(${s.id}, 'name', this.value)">
          `}
        </div>
        <input type="text" value="${s.expectations}" placeholder="期待すること" 
          class="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          onchange="updateStakeholder(${s.id}, 'expectations', this.value)">
        <input type="text" value="${s.concerns}" placeholder="懸念事項" 
          class="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          onchange="updateStakeholder(${s.id}, 'concerns', this.value)">
        <select class="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          onchange="updateStakeholder(${s.id}, 'influence', this.value)">
          <option value="high" ${s.influence === 'high' ? 'selected' : ''}>影響度:高</option>
          <option value="middle" ${s.influence === 'middle' ? 'selected' : ''}>影響度:中</option>
          <option value="low" ${s.influence === 'low' ? 'selected' : ''}>影響度:低</option>
        </select>
        <button onclick="removeStakeholder(${s.id})" 
          class="text-red-600 hover:text-red-800 px-2 py-1 text-xs" 
          title="削除">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    `).join('');
  }

  // ステークホルダー情報を更新
  window.updateStakeholder = function(id, field, value) {
    const stakeholder = stakeholders.find(s => s.id === id);
    if (stakeholder) {
      stakeholder[field] = value;
    }
  };

  // スキル・役割の不足分析
  window.analyzeGaps = function() {
    const section = document.getElementById('gap-analysis-section');
    const content = document.getElementById('gap-analysis-content');
    if (!section || !content) return;

    const idealRoles = [
      { role: '行政・公的機関', skills: ['補助金・助成金', '行政手続き', '公的ネットワーク'], icon: '🏛️' },
      { role: 'ビジネス・事業者', skills: ['収益モデル', '顧客獲得', '事業運営'], icon: '💼' },
      { role: '広報・メディア', skills: ['PR・広報', '情報発信', 'ブランディング'], icon: '📢' },
      { role: 'デザイン・クリエイティブ', skills: ['デザイン', 'UI/UX', '資料作成'], icon: '🎨' },
      { role: '地域住民', skills: ['地域の実情', '口コミ', '実行サポート'], icon: '👥' },
      { role: '専門家・研究者', skills: ['専門知識', 'データ分析', '学術的裏付け'], icon: '🎓' },
      { role: 'IT・デジタル', skills: ['Web制作', 'SNS運用', 'システム開発'], icon: '💻' },
    ];

    const people = (typeof sampleData !== 'undefined' && sampleData.people) ? sampleData.people : [];
    const coveredRoles = new Set();
    const coveredSkills = new Set();

    stakeholders.forEach(sh => {
      if (sh.fromNetwork && sh.networkPersonId) {
        const person = people.find(p => p.id === sh.networkPersonId);
        if (person) {
          coveredRoles.add(person.role);
          const contributions = getSuggestedContributions(person);
          contributions.forEach(c => coveredSkills.add(c));
        }
      }
    });

    const gaps = idealRoles.map(idealRole => {
      const hasRole = Array.from(coveredRoles).some(role => {
        if (idealRole.role.includes('行政') && (role.includes('役場') || role.includes('行政'))) return true;
        if (idealRole.role.includes('ビジネス') && (role.includes('事業者') || role.includes('経営'))) return true;
        if (idealRole.role.includes('広報') && (role.includes('メディア') || role.includes('広報'))) return true;
        if (idealRole.role.includes('デザイン') && role.includes('デザイナー')) return true;
        if (idealRole.role.includes('住民') && role.includes('住民')) return true;
        if (idealRole.role.includes('専門家') && (role.includes('研究者') || role.includes('専門'))) return true;
        if (idealRole.role.includes('IT') && (role.includes('エンジニア') || role.includes('IT'))) return true;
        return false;
      });

      const missingSkills = idealRole.skills.filter(skill => {
        return !Array.from(coveredSkills).some(cs => cs.includes(skill) || skill.includes(cs));
      });

      return { ...idealRole, hasRole, missingSkills };
    });

    const hasGaps = gaps.some(g => !g.hasRole || g.missingSkills.length > 0);

    if (!hasGaps) {
      content.innerHTML = `
        <div class="flex items-center gap-2 text-green-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="font-medium">主要な役割はカバーされています！</span>
        </div>
      `;
    } else {
      const gapItems = gaps.filter(g => !g.hasRole || g.missingSkills.length > 0);
      content.innerHTML = `
        <div class="space-y-2">
          <p class="font-medium mb-2">以下の役割・スキルが不足している可能性があります：</p>
          ${gapItems.map(gap => `
            <div class="bg-white rounded-lg p-3 border border-yellow-200">
              <div class="flex items-start gap-2">
                <span class="text-xl">${gap.icon}</span>
                <div class="flex-1">
                  <div class="font-medium text-sm ${gap.hasRole ? 'text-gray-700' : 'text-yellow-900'}">
                    ${gap.role} ${gap.hasRole ? '（一部カバー済み）' : '（未カバー）'}
                  </div>
                  ${gap.missingSkills.length > 0 ? `
                    <div class="text-xs text-yellow-700 mt-1">
                      不足スキル: ${gap.missingSkills.join('、')}
                    </div>
                  ` : ''}
                </div>
                ${!gap.hasRole ? `
                  <button onclick="searchNetworkByRole('${gap.role}')" class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                    探す
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('')}
          <div class="mt-3 text-xs text-yellow-700">
            💡 「ネットワークから選択」で適切な人物を探してみましょう
          </div>
        </div>
      `;
    }

    section.classList.remove('hidden');
  };

  // 役割で絞り込んでネットワークピッカーを開く
  window.searchNetworkByRole = function(roleHint) {
    openNetworkPicker();
    setTimeout(() => {
      const searchBox = document.getElementById('network-search');
      if (searchBox) {
        const roleKeywords = {
          '行政・公的機関': '役場',
          'ビジネス・事業者': '事業者',
          '広報・メディア': 'メディア',
          'デザイン・クリエイティブ': 'デザイナー',
          '地域住民': '住民',
          '専門家・研究者': '研究者',
          'IT・デジタル': 'エンジニア'
        };
        const keyword = roleKeywords[roleHint] || '';
        searchBox.value = keyword;
        filterNetworkPicker(keyword);
      }
    }, 100);
  };
})();