// Extracted Simulators Module
// Contains guesthouse and cafe simulators, generic target-based simulation,
// and budget application helpers. Public API stays on window.*
(function(){
	// ===== ゲストハウス詳細シミュレーター =====
	window.showDetailedGuesthouseSimulator = function() {
		const resultSection = document.getElementById('simulation-result');
		const contentEl = document.getElementById('simulation-content');
    
		if (!resultSection || !contentEl) return;
    
		const simulatorHTML = `
					<div class="space-y-6">
						<!-- 基本情報 -->
						<div class="bg-blue-50 rounded-lg p-4">
							<h4 class="font-semibold text-blue-900 mb-3">基本情報</h4>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm text-blue-800 mb-1">客室数</label>
									<input type="number" id="gh-rooms" value="3" min="1" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-blue-800 mb-1">月の営業日数</label>
									<input type="number" id="gh-days" value="30" min="1" max="31" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
							</div>
						</div>

						<!-- 宿泊料金設定 -->
						<div class="bg-green-50 rounded-lg p-4">
							<h4 class="font-semibold text-green-900 mb-3">宿泊料金設定</h4>
							<div class="grid grid-cols-3 gap-4">
								<div>
									<label class="block text-sm text-green-800 mb-1">平日単価（円/泊）</label>
									<input type="number" id="gh-price-weekday" value="4000" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-green-800 mb-1">週末単価（円/泊）</label>
									<input type="number" id="gh-price-weekend" value="5500" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-green-800 mb-1">ハイシーズン単価（円/泊）</label>
									<input type="number" id="gh-price-high" value="6500" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
							</div>
						</div>

						<!-- 稼働率設定 -->
						<div class="bg-yellow-50 rounded-lg p-4">
							<h4 class="font-semibold text-yellow-900 mb-3">稼働率設定（%）</h4>
							<div class="grid grid-cols-3 gap-4">
								<div>
									<label class="block text-sm text-yellow-800 mb-1">平日稼働率</label>
									<input type="number" id="gh-occ-weekday" value="50" min="0" max="100" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-yellow-800 mb-1">週末稼働率</label>
									<input type="number" id="gh-occ-weekend" value="75" min="0" max="100" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-yellow-800 mb-1">ハイシーズン稼働率</label>
									<input type="number" id="gh-occ-high" value="90" min="0" max="100" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
							</div>
						</div>

						<!-- 日数配分 -->
						<div class="bg-purple-50 rounded-lg p-4">
							<h4 class="font-semibold text-purple-900 mb-3">日数配分（月30日として）</h4>
							<div class="grid grid-cols-3 gap-4">
								<div>
									<label class="block text-sm text-purple-800 mb-1">平日（日）</label>
									<input type="number" id="gh-days-weekday" value="20" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-purple-800 mb-1">週末（日）</label>
									<input type="number" id="gh-days-weekend" value="8" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
								<div>
									<label class="block text-sm text-purple-800 mb-1">ハイシーズン（日）</label>
									<input type="number" id="gh-days-high" value="2" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
								</div>
							</div>
						</div>

						<!-- 試算結果 -->
						<div id="gh-revenue-result" class="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
							<h4 class="font-semibold text-green-900 mb-3">売上試算</h4>
							<div id="gh-revenue-breakdown" class="space-y-2"></div>
						</div>

						<!-- 固定費 -->
						<div class="bg-red-50 rounded-lg p-4">
							<h4 class="font-semibold text-red-900 mb-3 flex justify-between items-center">
								<span>固定費（月額）</span>
								<button onclick="addGuesthouseExpense('fixed')" class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
									+ 項目追加
								</button>
							</h4>
							<div id="gh-fixed-expenses" class="space-y-2"></div>
						</div>

						<!-- 変動費 -->
						<div class="bg-orange-50 rounded-lg p-4">
							<h4 class="font-semibold text-orange-900 mb-3 flex justify-between items-center">
								<span>変動費（月額）</span>
								<button onclick="addGuesthouseExpense('variable')" class="text-sm px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">
									+ 項目追加
								</button>
							</h4>
							<div id="gh-variable-expenses" class="space-y-2"></div>
						</div>

						<!-- 損益サマリー -->
						<div id="gh-profit-summary" class="bg-gradient-to-r from-blue-900 to-green-900 text-white rounded-lg p-6">
							<div class="grid grid-cols-3 gap-4 text-center">
								<div>
									<div class="text-sm opacity-80">月間売上</div>
									<div id="gh-total-revenue" class="text-2xl font-bold mt-1">¥0</div>
								</div>
								<div>
									<div class="text-sm opacity-80">月間経費</div>
									<div id="gh-total-expense" class="text-2xl font-bold mt-1">¥0</div>
								</div>
								<div>
									<div class="text-sm opacity-80">月間利益</div>
									<div id="gh-net-profit" class="text-2xl font-bold mt-1">¥0</div>
								</div>
							</div>
						</div>

						<!-- アクションボタン -->
						<div class="flex gap-3">
							<button onclick="applyGuesthouseSimulation()" class="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold">
								この試算を予算に反映する
							</button>
						</div>
					</div>
		`;
    
		contentEl.innerHTML = simulatorHTML;
		resultSection.classList.remove('hidden');
    
		// 初期費用項目を設定
		initializeGuesthouseExpenses();
		calculateGuesthouseRevenue();
	};

	// 初期費用項目を設定
	function initializeGuesthouseExpenses() {
		window.guesthouseExpenses = {
			fixed: [
				{ id: 1, name: '家賃・賃料', amount: 100000, note: '物件賃料' },
				{ id: 2, name: '水道光熱費', amount: 35000, note: '電気・水道・ガス' },
				{ id: 3, name: '通信費', amount: 8000, note: 'インターネット・電話' },
				{ id: 4, name: '保険料', amount: 15000, note: '火災保険・賠償責任保険' },
				{ id: 5, name: '人件費', amount: 80000, note: '清掃・管理スタッフ' }
			],
			variable: [
				{ id: 6, name: '消耗品費', amount: 25000, note: 'リネン・アメニティ' },
				{ id: 7, name: '清掃費', amount: 20000, note: '外部清掃委託' },
				{ id: 8, name: '広告宣伝費', amount: 30000, note: '予約サイト・SNS広告' },
				{ id: 9, name: '手数料', amount: 15000, note: '予約サイト手数料' },
				{ id: 10, name: '雑費', amount: 10000, note: 'その他経費' }
			]
		};
		renderGuesthouseExpenses();
	}

	// 費用項目を描画
	function renderGuesthouseExpenses() {
		['fixed', 'variable'].forEach(type => {
			const container = document.getElementById(`gh-${type}-expenses`);
			if (!container) return;
      
			const expenses = window.guesthouseExpenses[type];
			container.innerHTML = expenses.map(exp => `
				<div class="grid grid-cols-12 gap-2 items-center bg-white rounded p-2 border">
					<input type="text" value="${exp.name}" class="col-span-4 px-2 py-1 border rounded text-sm" 
						onchange="updateGuesthouseExpense('${type}', ${exp.id}, 'name', this.value)">
					<div class="col-span-3 relative">
						<input type="number" value="${exp.amount}" class="w-full px-2 py-1 pr-8 border rounded text-sm text-right" 
							onchange="updateGuesthouseExpense('${type}', ${exp.id}, 'amount', this.value)">
						<span class="absolute right-2 top-1 text-xs text-gray-500">円</span>
					</div>
					<input type="text" value="${exp.note}" class="col-span-4 px-2 py-1 border rounded text-sm" 
						onchange="updateGuesthouseExpense('${type}', ${exp.id}, 'note', this.value)">
					<button onclick="removeGuesthouseExpense('${type}', ${exp.id})" class="col-span-1 text-red-600 hover:text-red-800">
						<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
						</svg>
					</button>
				</div>
			`).join('');
		});
		calculateGuesthouseProfit();
	}

	// 費用項目を追加
	window.addGuesthouseExpense = function(type) {
		const newId = Date.now();
		window.guesthouseExpenses[type].push({
			id: newId,
			name: '',
			amount: 0,
			note: ''
		});
		renderGuesthouseExpenses();
	};

	// 費用項目を更新
	window.updateGuesthouseExpense = function(type, id, field, value) {
		const expense = window.guesthouseExpenses[type].find(e => e.id === id);
		if (expense) {
			expense[field] = field === 'amount' ? parseFloat(value) || 0 : value;
			calculateGuesthouseProfit();
		}
	};

	// 費用項目を削除
	window.removeGuesthouseExpense = function(type, id) {
		window.guesthouseExpenses[type] = window.guesthouseExpenses[type].filter(e => e.id !== id);
		renderGuesthouseExpenses();
	};

	// 売上を計算
	window.calculateGuesthouseRevenue = function() {
		const rooms = parseFloat(document.getElementById('gh-rooms')?.value) || 0;
		const priceWeekday = parseFloat(document.getElementById('gh-price-weekday')?.value) || 0;
		const priceWeekend = parseFloat(document.getElementById('gh-price-weekend')?.value) || 0;
		const priceHigh = parseFloat(document.getElementById('gh-price-high')?.value) || 0;
		const occWeekday = parseFloat(document.getElementById('gh-occ-weekday')?.value) || 0;
		const occWeekend = parseFloat(document.getElementById('gh-occ-weekend')?.value) || 0;
		const occHigh = parseFloat(document.getElementById('gh-occ-high')?.value) || 0;
		const daysWeekday = parseFloat(document.getElementById('gh-days-weekday')?.value) || 0;
		const daysWeekend = parseFloat(document.getElementById('gh-days-weekend')?.value) || 0;
		const daysHigh = parseFloat(document.getElementById('gh-days-high')?.value) || 0;

		const revenueWeekday = rooms * priceWeekday * daysWeekday * (occWeekday / 100);
		const revenueWeekend = rooms * priceWeekend * daysWeekend * (occWeekend / 100);
		const revenueHigh = rooms * priceHigh * daysHigh * (occHigh / 100);
		const totalRevenue = revenueWeekday + revenueWeekend + revenueHigh;

		const breakdownEl = document.getElementById('gh-revenue-breakdown');
		if (breakdownEl) {
			breakdownEl.innerHTML = `
				<div class="flex justify-between items-center py-1 border-b">
					<span class="text-sm">平日: ${rooms}室 × ¥${priceWeekday.toLocaleString()} × ${daysWeekday}日 × ${occWeekday}%</span>
					<span class="font-semibold">¥${Math.round(revenueWeekday).toLocaleString()}</span>
				</div>
				<div class="flex justify-between items-center py-1 border-b">
					<span class="text-sm">週末: ${rooms}室 × ¥${priceWeekend.toLocaleString()} × ${daysWeekend}日 × ${occWeekend}%</span>
					<span class="font-semibold">¥${Math.round(revenueWeekend).toLocaleString()}</span>
				</div>
				<div class="flex justify-between items-center py-1 border-b">
					<span class="text-sm">ハイシーズン: ${rooms}室 × ¥${priceHigh.toLocaleString()} × ${daysHigh}日 × ${occHigh}%</span>
					<span class="font-semibold">¥${Math.round(revenueHigh).toLocaleString()}</span>
				</div>
				<div class="flex justify-between items-center py-2 mt-2 bg-green-200 rounded px-2">
					<span class="font-bold text-green-900">月間売上合計</span>
					<span class="font-bold text-green-900 text-xl">¥${Math.round(totalRevenue).toLocaleString()}</span>
				</div>
			`;
		}

		const revenueEl = document.getElementById('gh-total-revenue');
		if (revenueEl) revenueEl.textContent = `¥${Math.round(totalRevenue).toLocaleString()}`;

		calculateGuesthouseProfit();
	};

	// 損益を計算
	function calculateGuesthouseProfit() {
		const revenueText = document.getElementById('gh-total-revenue')?.textContent || '¥0';
		const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;

		if (!window.guesthouseExpenses) return;

		const fixedTotal = window.guesthouseExpenses.fixed.reduce((sum, e) => sum + (e.amount || 0), 0);
		const variableTotal = window.guesthouseExpenses.variable.reduce((sum, e) => sum + (e.amount || 0), 0);
		const totalExpense = fixedTotal + variableTotal;
		const netProfit = revenue - totalExpense;

		const expenseEl = document.getElementById('gh-total-expense');
		const profitEl = document.getElementById('gh-net-profit');

		if (expenseEl) expenseEl.textContent = `¥${totalExpense.toLocaleString()}`;
		if (profitEl) {
			profitEl.textContent = `¥${netProfit.toLocaleString()}`;
			profitEl.className = `text-2xl font-bold mt-1 ${netProfit >= 0 ? 'text-green-200' : 'text-red-200'}`;
		}
	}

	// シミュレーション結果を予算に反映
	window.applyGuesthouseSimulation = function() {
		const revenueText = document.getElementById('gh-total-revenue')?.textContent || '¥0';
		const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;

		// 既存の予算項目をクリア
		if (typeof window.budgetItems !== 'undefined') {
			window.budgetItems.income = [];
			window.budgetItems.expense = [];
		}

		// 収入項目を追加（内訳として）
		const rooms = parseFloat(document.getElementById('gh-rooms')?.value) || 0;
		const priceWeekday = parseFloat(document.getElementById('gh-price-weekday')?.value) || 0;
		const priceWeekend = parseFloat(document.getElementById('gh-price-weekend')?.value) || 0;
		const priceHigh = parseFloat(document.getElementById('gh-price-high')?.value) || 0;
		const occWeekday = parseFloat(document.getElementById('gh-occ-weekday')?.value) || 0;
		const occWeekend = parseFloat(document.getElementById('gh-occ-weekend')?.value) || 0;
		const occHigh = parseFloat(document.getElementById('gh-occ-high')?.value) || 0;
		const daysWeekday = parseFloat(document.getElementById('gh-days-weekday')?.value) || 0;
		const daysWeekend = parseFloat(document.getElementById('gh-days-weekend')?.value) || 0;
		const daysHigh = parseFloat(document.getElementById('gh-days-high')?.value) || 0;

		if (typeof window.budgetItems !== 'undefined') {
			window.budgetItems.income.push({
				id: Date.now() + 1,
				type: 'income',
				name: '宿泊料（平日）',
				amount: Math.round(rooms * priceWeekday * daysWeekday * (occWeekday / 100)),
				note: `${rooms}室×¥${priceWeekday}×${daysWeekday}日×${occWeekday}%`
			});

			window.budgetItems.income.push({
				id: Date.now() + 2,
				type: 'income',
				name: '宿泊料（週末）',
				amount: Math.round(rooms * priceWeekend * daysWeekend * (occWeekend / 100)),
				note: `${rooms}室×¥${priceWeekend}×${daysWeekend}日×${occWeekend}%`
			});

			if (daysHigh > 0) {
				window.budgetItems.income.push({
					id: Date.now() + 3,
					type: 'income',
					name: '宿泊料（ハイシーズン）',
					amount: Math.round(rooms * priceHigh * daysHigh * (occHigh / 100)),
					note: `${rooms}室×¥${priceHigh}×${daysHigh}日×${occHigh}%`
				});
			}

			// 支出項目を追加
			if (window.guesthouseExpenses) {
				window.guesthouseExpenses.fixed.forEach(exp => {
					window.budgetItems.expense.push({
						id: Date.now() + Math.random(),
						type: 'expense',
						name: exp.name,
						amount: exp.amount,
						note: `固定費: ${exp.note}`
					});
				});

				window.guesthouseExpenses.variable.forEach(exp => {
					window.budgetItems.expense.push({
						id: Date.now() + Math.random(),
						type: 'expense',
						name: exp.name,
						amount: exp.amount,
						note: `変動費: ${exp.note}`
					});
				});
			}

			if (typeof window.renderBudgetLists === 'function') {
				window.renderBudgetLists();
			}
		}
		if (typeof showNotification === 'function') {
			showNotification('ゲストハウス収支計画を予算に反映しました', 'success');
		}
	};

	// ========================================
	// カフェ・飲食店シミュレーター
	// ========================================
  
	window.showDetailedCafeSimulator = function() {
		const resultSection = document.getElementById('simulation-result');
		const contentEl = document.getElementById('simulation-content');
    
		if (!resultSection || !contentEl) return;
    
		const simulatorHTML = `
					<div class="space-y-6">
						<!-- 基本情報 -->
						<div class="bg-amber-50 rounded-lg p-4">
							<h4 class="font-semibold text-amber-900 mb-3">基本情報</h4>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm text-amber-800 mb-1">客席数</label>
									<input type="number" id="cafe-seats" value="20" min="1" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
								</div>
								<div>
									<label class="block text-sm text-amber-800 mb-1">月の営業日数</label>
									<input type="number" id="cafe-days" value="26" min="1" max="31" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
								</div>
							</div>
						</div>

						<!-- メニュー設定 -->
						<div class="bg-blue-50 rounded-lg p-4">
							<h4 class="font-semibold text-blue-900 mb-3 flex justify-between items-center">
								<span>メニュー設定</span>
								<button onclick="addCafeMenu()" class="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
									+ メニュー追加
								</button>
							</h4>
							<div id="cafe-menu-list" class="space-y-2"></div>
						</div>

						<!-- 日数配分 -->
						<div class="bg-purple-50 rounded-lg p-4">
							<h4 class="font-semibold text-purple-900 mb-3">日数配分（営業日ベース）</h4>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm text-purple-800 mb-1">平日（日）</label>
									<input type="number" id="cafe-days-weekday" value="20" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
								</div>
								<div>
									<label class="block text-sm text-purple-800 mb-1">休日（日）</label>
									<input type="number" id="cafe-days-weekend" value="6" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
								</div>
							</div>
						</div>

						<!-- 試算結果 -->
						<div id="cafe-revenue-result" class="bg-gradient-to-r from-green-100 to-amber-100 rounded-lg p-4">
							<h4 class="font-semibold text-green-900 mb-3">売上試算</h4>
							<div id="cafe-revenue-breakdown" class="space-y-2"></div>
						</div>

						<!-- 固定費 -->
						<div class="bg-red-50 rounded-lg p-4">
							<h4 class="font-semibold text-red-900 mb-3 flex justify-between items-center">
								<span>固定費（月額）</span>
								<button onclick="addCafeExpense('fixed')" class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
									+ 項目追加
								</button>
							</h4>
							<div id="cafe-fixed-expenses" class="space-y-2"></div>
						</div>

						<!-- 変動費 -->
						<div class="bg-orange-50 rounded-lg p-4">
							<h4 class="font-semibold text-orange-900 mb-3 flex justify-between items-center">
								<span>変動費（月額）</span>
								<button onclick="addCafeExpense('variable')" class="text-sm px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">
									+ 項目追加
								</button>
							</h4>
							<div id="cafe-variable-expenses" class="space-y-2"></div>
						</div>

						<!-- 損益サマリー -->
						<div id="cafe-profit-summary" class="bg-gradient-to-r from-amber-900 to-green-900 text-white rounded-lg p-6">
							<div class="grid grid-cols-3 gap-4 text-center">
								<div>
									<div class="text-sm opacity-80">月間売上</div>
									<div id="cafe-total-revenue" class="text-2xl font-bold mt-1">¥0</div>
								</div>
								<div>
									<div class="text-sm opacity-80">月間経費</div>
									<div id="cafe-total-expense" class="text-2xl font-bold mt-1">¥0</div>
								</div>
								<div>
									<div class="text-sm opacity-80">月間利益</div>
									<div id="cafe-net-profit" class="text-2xl font-bold mt-1">¥0</div>
								</div>
							</div>
						</div>

						<!-- アクションボタン -->
						<div class="flex gap-3">
							<button onclick="applyCafeSimulation()" class="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold">
								この試算を予算に反映する
							</button>
						</div>
					</div>
		`;
    
		contentEl.innerHTML = simulatorHTML;
		resultSection.classList.remove('hidden');
    
		// 初期費用項目を設定
		initializeCafeExpenses();
		calculateCafeRevenue();
	};

	// 初期費用項目を設定
	function initializeCafeExpenses() {
		// メニューアイテムを初期化
		window.cafeMenuItems = [
			{ id: 1, name: 'ブレンドコーヒー', price: 400, weekdayCount: 25, weekendCount: 35 },
			{ id: 2, name: 'カフェラテ', price: 500, weekdayCount: 20, weekendCount: 30 },
			{ id: 3, name: 'ケーキセット', price: 700, weekdayCount: 10, weekendCount: 20 },
			{ id: 4, name: 'ランチセット', price: 980, weekdayCount: 15, weekendCount: 10 }
		];
    
		window.cafeExpenses = {
			fixed: [
				{ id: 1, name: '家賃・賃料', amount: 120000, note: '店舗賃料' },
				{ id: 2, name: '水道光熱費', amount: 40000, note: '電気・水道・ガス' },
				{ id: 3, name: '通信費', amount: 6000, note: 'インターネット・電話' },
				{ id: 4, name: '保険料', amount: 10000, note: '火災保険・賠償責任保険' },
				{ id: 5, name: '人件費', amount: 200000, note: 'スタッフ給与' }
			],
			variable: [
				{ id: 6, name: '食材費', amount: 150000, note: '原価（売上の30%想定）' },
				{ id: 7, name: '消耗品費', amount: 20000, note: '紙製品・洗剤等' },
				{ id: 8, name: '広告宣伝費', amount: 25000, note: 'SNS広告・チラシ' },
				{ id: 9, name: '衛生費', amount: 15000, note: '清掃・消毒用品' },
				{ id: 10, name: '雑費', amount: 10000, note: 'その他経費' }
			]
		};
		renderCafeMenuItems();
		renderCafeExpenses();
	}

	// メニューアイテムを描画
	function renderCafeMenuItems() {
		const container = document.getElementById('cafe-menu-list');
		if (!container || !window.cafeMenuItems) return;
    
		container.innerHTML = window.cafeMenuItems.map(item => `
			<div class="bg-white rounded p-3 border border-blue-200">
				<div class="grid grid-cols-12 gap-2 items-center">
					<input type="text" value="${item.name}" placeholder="メニュー名" 
						class="col-span-3 px-2 py-1 border rounded text-sm" 
						onchange="updateCafeMenu(${item.id}, 'name', this.value)">
					<div class="col-span-2 relative">
						<input type="number" value="${item.price}" placeholder="単価" 
							class="w-full px-2 py-1 pr-6 border rounded text-sm text-right" 
							onchange="updateCafeMenu(${item.id}, 'price', this.value)">
						<span class="absolute right-2 top-1 text-xs text-gray-500">円</span>
					</div>
					<div class="col-span-3">
						<label class="block text-xs text-blue-700 mb-1">平日販売数/日</label>
						<input type="number" value="${item.weekdayCount}" 
							class="w-full px-2 py-1 border rounded text-sm text-right" 
							onchange="updateCafeMenu(${item.id}, 'weekdayCount', this.value)">
					</div>
					<div class="col-span-3">
						<label class="block text-xs text-blue-700 mb-1">休日販売数/日</label>
						<input type="number" value="${item.weekendCount}" 
							class="w-full px-2 py-1 border rounded text-sm text-right" 
							onchange="updateCafeMenu(${item.id}, 'weekendCount', this.value)">
					</div>
					<button onclick="removeCafeMenu(${item.id})" class="col-span-1 text-red-600 hover:text-red-800">
						<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
						</svg>
					</button>
				</div>
			</div>
		`).join('');
    
		calculateCafeRevenue();
	}

	// メニュー項目を追加
	window.addCafeMenu = function() {
		const newId = Date.now();
		window.cafeMenuItems.push({
			id: newId,
			name: '',
			price: 0,
			weekdayCount: 0,
			weekendCount: 0
		});
		renderCafeMenuItems();
	};

	// メニュー項目を更新
	window.updateCafeMenu = function(id, field, value) {
		const menu = window.cafeMenuItems.find(m => m.id === id);
		if (menu) {
			if (field === 'name') {
				menu[field] = value;
			} else {
				menu[field] = parseFloat(value) || 0;
			}
			calculateCafeRevenue();
		}
	};

	// メニュー項目を削除
	window.removeCafeMenu = function(id) {
		window.cafeMenuItems = window.cafeMenuItems.filter(m => m.id !== id);
		renderCafeMenuItems();
	};

	// 費用項目を描画
	function renderCafeExpenses() {
		['fixed', 'variable'].forEach(type => {
			const container = document.getElementById(`cafe-${type}-expenses`);
			if (!container) return;
      
			const expenses = window.cafeExpenses[type];
			container.innerHTML = expenses.map(exp => `
				<div class="grid grid-cols-12 gap-2 items-center bg-white rounded p-2 border">
					<input type="text" value="${exp.name}" class="col-span-4 px-2 py-1 border rounded text-sm" 
						onchange="updateCafeExpense('${type}', ${exp.id}, 'name', this.value)">
					<div class="col-span-3 relative">
						<input type="number" value="${exp.amount}" class="w-full px-2 py-1 pr-8 border rounded text-sm text-right" 
							onchange="updateCafeExpense('${type}', ${exp.id}, 'amount', this.value)">
						<span class="absolute right-2 top-1 text-xs text-gray-500">円</span>
					</div>
					<input type="text" value="${exp.note}" class="col-span-4 px-2 py-1 border rounded text-sm" 
						onchange="updateCafeExpense('${type}', ${exp.id}, 'note', this.value)">
					<button onclick="removeCafeExpense('${type}', ${exp.id})" class="col-span-1 text-red-600 hover:text-red-800">
						<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
						</svg>
					</button>
				</div>
			`).join('');
		});
		calculateCafeProfit();
	}

	// 費用項目を追加
	window.addCafeExpense = function(type) {
		const newId = Date.now();
		window.cafeExpenses[type].push({
			id: newId,
			name: '',
			amount: 0,
			note: ''
		});
		renderCafeExpenses();
	};

	// 費用項目を更新
	window.updateCafeExpense = function(type, id, field, value) {
		const expense = window.cafeExpenses[type].find(e => e.id === id);
		if (expense) {
			expense[field] = field === 'amount' ? parseFloat(value) || 0 : value;
			calculateCafeProfit();
		}
	};

	// 費用項目を削除
	window.removeCafeExpense = function(type, id) {
		window.cafeExpenses[type] = window.cafeExpenses[type].filter(e => e.id !== id);
		renderCafeExpenses();
	};

	// 売上を計算
	window.calculateCafeRevenue = function() {
		if (!window.cafeMenuItems) return;
    
		const daysWeekday = parseFloat(document.getElementById('cafe-days-weekday')?.value) || 0;
		const daysWeekend = parseFloat(document.getElementById('cafe-days-weekend')?.value) || 0;

		// メニューごとの売上を計算
		let totalRevenueWeekday = 0;
		let totalRevenueWeekend = 0;
		const menuBreakdown = [];

		window.cafeMenuItems.forEach(menu => {
			const weekdayRevenue = menu.price * menu.weekdayCount * daysWeekday;
			const weekendRevenue = menu.price * menu.weekendCount * daysWeekend;
			totalRevenueWeekday += weekdayRevenue;
			totalRevenueWeekend += weekendRevenue;
      
			if (menu.name && (weekdayRevenue > 0 || weekendRevenue > 0)) {
				menuBreakdown.push({
					name: menu.name,
					weekdayRevenue,
					weekendRevenue,
					total: weekdayRevenue + weekendRevenue
				});
			}
		});

		const totalRevenue = totalRevenueWeekday + totalRevenueWeekend;

		const breakdownEl = document.getElementById('cafe-revenue-breakdown');
		if (breakdownEl) {
			let html = '';
      
			// メニューごとの内訳を表示
			if (menuBreakdown.length > 0) {
				html += '<div class="space-y-1 mb-3">';
				menuBreakdown.forEach(item => {
					html += `
						<div class="flex justify-between items-center py-1 text-xs border-b border-green-200">
							<span class="text-gray-700">${item.name}</span>
							<span class="font-medium">¥${Math.round(item.total).toLocaleString()}</span>
						</div>
					`;
				});
				html += '</div>';
			}
      
			// 平日・休日の合計
			html += `
				<div class="flex justify-between items-center py-1 border-b">
					<span class="text-sm">平日売上（${daysWeekday}日分）</span>
					<span class="font-semibold">¥${Math.round(totalRevenueWeekday).toLocaleString()}</span>
				</div>
				<div class="flex justify-between items-center py-1 border-b">
					<span class="text-sm">休日売上（${daysWeekend}日分）</span>
					<span class="font-semibold">¥${Math.round(totalRevenueWeekend).toLocaleString()}</span>
				</div>
				<div class="flex justify-between items-center py-2 mt-2 bg-green-200 rounded px-2">
					<span class="font-bold text-green-900">月間売上合計</span>
					<span class="font-bold text-green-900 text-xl">¥${Math.round(totalRevenue).toLocaleString()}</span>
				</div>
			`;
      
			breakdownEl.innerHTML = html;
		}

		const revenueEl = document.getElementById('cafe-total-revenue');
		if (revenueEl) revenueEl.textContent = `¥${Math.round(totalRevenue).toLocaleString()}`;

		calculateCafeProfit();
	};

	// 損益を計算
	function calculateCafeProfit() {
		const revenueText = document.getElementById('cafe-total-revenue')?.textContent || '¥0';
		const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;

		if (!window.cafeExpenses) return;

		const fixedTotal = window.cafeExpenses.fixed.reduce((sum, e) => sum + (e.amount || 0), 0);
		const variableTotal = window.cafeExpenses.variable.reduce((sum, e) => sum + (e.amount || 0), 0);
		const totalExpense = fixedTotal + variableTotal;
		const netProfit = revenue - totalExpense;

		const expenseEl = document.getElementById('cafe-total-expense');
		const profitEl = document.getElementById('cafe-net-profit');

		if (expenseEl) expenseEl.textContent = `¥${totalExpense.toLocaleString()}`;
		if (profitEl) {
			profitEl.textContent = `¥${netProfit.toLocaleString()}`;
			profitEl.className = `text-2xl font-bold mt-1 ${netProfit >= 0 ? 'text-green-200' : 'text-red-200'}`;
		}
	}

	// シミュレーション結果を予算に反映
	window.applyCafeSimulation = function() {
		const revenueText = document.getElementById('cafe-total-revenue')?.textContent || '¥0';
		const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;

		// 既存の予算項目をクリア
		if (typeof window.budgetItems !== 'undefined') {
			window.budgetItems.income = [];
			window.budgetItems.expense = [];
		}

		// メニューごとの収入項目を追加
		const daysWeekday = parseFloat(document.getElementById('cafe-days-weekday')?.value) || 0;
		const daysWeekend = parseFloat(document.getElementById('cafe-days-weekend')?.value) || 0;

		if (window.cafeMenuItems && typeof window.budgetItems !== 'undefined') {
			window.cafeMenuItems.forEach((menu, index) => {
				if (!menu.name) return;
        
				const weekdayRevenue = menu.price * menu.weekdayCount * daysWeekday;
				const weekendRevenue = menu.price * menu.weekendCount * daysWeekend;
				const totalMenuRevenue = weekdayRevenue + weekendRevenue;
        
				if (totalMenuRevenue > 0) {
					window.budgetItems.income.push({
						id: Date.now() + index + 1,
						type: 'income',
						name: `${menu.name}売上`,
						amount: Math.round(totalMenuRevenue),
						note: `平日${menu.weekdayCount}個×${daysWeekday}日 + 休日${menu.weekendCount}個×${daysWeekend}日 @¥${menu.price}`
					});
				}
			});
		}

		// 支出項目を追加
		if (window.cafeExpenses && typeof window.budgetItems !== 'undefined') {
			window.cafeExpenses.fixed.forEach(exp => {
				window.budgetItems.expense.push({
					id: Date.now() + Math.random(),
					type: 'expense',
					name: exp.name,
					amount: exp.amount,
					note: `固定費: ${exp.note}`
				});
			});

			window.cafeExpenses.variable.forEach(exp => {
				window.budgetItems.expense.push({
					id: Date.now() + Math.random(),
					type: 'expense',
					name: exp.name,
					amount: exp.amount,
					note: `変動費: ${exp.note}`
				});
			});
		}

		if (typeof window.renderBudgetLists === 'function') {
			window.renderBudgetLists();
		}
		if (typeof showNotification === 'function') {
			showNotification('カフェ収支計画を予算に反映しました', 'success');
		}
	};


	// 目標月収からシミュレーション
	window.simulateFromTarget = function() {
		const targetIncome = parseFloat(document.getElementById('target-monthly-income')?.value) || 0;
		const businessModel = document.getElementById('business-model-select')?.value;
    
		// ゲストハウスの場合は詳細シミュレーターを開く
		if (businessModel === 'guesthouse') {
			showDetailedGuesthouseSimulator();
			return;
		}
    
		// カフェの場合は詳細シミュレーターを開く
		if (businessModel === 'cafe') {
			showDetailedCafeSimulator();
			return;
		}
    
		const resultSection = document.getElementById('simulation-result');
		const contentEl = document.getElementById('simulation-content');
    
		if (!resultSection || !contentEl) return;

		if (targetIncome === 0 || !businessModel) {
			resultSection.classList.add('hidden');
			return;
		}

		// 事業モデル別のシミュレーションパラメータ
		const models = {
			coworking: {
				name: 'コワーキングスペース',
				incomes: [
					{ name: '月額会員', unitPrice: 15000, description: '月額会員費' },
					{ name: 'ドロップイン', unitPrice: 1000, description: 'ドロップイン利用' }
				],
				expenses: [
					{ name: '家賃', amount: 80000, description: '施設賃料' },
					{ name: '水道光熱費', amount: 30000, description: '電気・水道・ガス' },
					{ name: '通信費', amount: 10000, description: 'インターネット' }
				],
				profitRate: 0.4
			},
			guesthouse: {
				name: 'ゲストハウス',
				incomes: [
					{ name: '宿泊料', unitPrice: 4000, description: '1泊あたり' }
				],
				expenses: [
					{ name: '家賃', amount: 100000, description: '施設賃料' },
					{ name: '水道光熱費', amount: 50000, description: '電気・水道・ガス' },
					{ name: '消耗品費', amount: 30000, description: 'リネン・アメニティ等' }
				],
				profitRate: 0.35
			},
			cafe: {
				name: 'カフェ・飲食店',
				incomes: [
					{ name: '飲食売上', unitPrice: 800, description: '客単価' }
				],
				expenses: [
					{ name: '家賃', amount: 120000, description: '店舗賃料' },
					{ name: '食材費', amount: 150000, description: '原価（売上の30%想定）' },
					{ name: '水道光熱費', amount: 40000, description: '電気・水道・ガス' }
				],
				profitRate: 0.25
			},
			event: {
				name: 'イベント事業',
				incomes: [
					{ name: 'イベント参加費', unitPrice: 3000, description: '1人あたり' }
				],
				expenses: [
					{ name: '会場費', amount: 50000, description: '月平均' },
					{ name: '材料費', amount: 40000, description: 'イベント材料' },
					{ name: '広告宣伝費', amount: 30000, description: 'SNS広告等' }
				],
				profitRate: 0.45
			},
			tour: {
				name: '観光ツアー',
				incomes: [
					{ name: 'ツアー料金', unitPrice: 5000, description: '1人あたり' }
				],
				expenses: [
					{ name: '交通費', amount: 60000, description: '車両維持費等' },
					{ name: '保険料', amount: 20000, description: '旅行保険' },
					{ name: '広告宣伝費', amount: 40000, description: 'プロモーション' }
				],
				profitRate: 0.5
			},
			consulting: {
				name: 'コンサル・サービス',
				incomes: [
					{ name: 'コンサル料', unitPrice: 50000, description: '1件あたり' }
				],
				expenses: [
					{ name: '通信費', amount: 15000, description: 'インターネット・電話' },
					{ name: '交通費', amount: 30000, description: '訪問交通費' },
					{ name: '広告宣伝費', amount: 25000, description: 'Web広告等' }
				],
				profitRate: 0.7
			},
			subscription: {
				name: 'サブスク・会員制',
				incomes: [
					{ name: '月額会費', unitPrice: 2000, description: '1人あたり' }
				],
				expenses: [
					{ name: 'サーバー費', amount: 20000, description: 'システム維持費' },
					{ name: 'コンテンツ制作費', amount: 50000, description: '月次コンテンツ' },
					{ name: '広告宣伝費', amount: 40000, description: 'プロモーション' }
				],
				profitRate: 0.6
			}
		};

		const model = models[businessModel];
		if (!model) return;

		// 必要売上を計算（目標粗利 ÷ 粗利率）
		const requiredRevenue = Math.ceil(targetIncome / model.profitRate);
		const totalExpenses = model.expenses.reduce((sum, e) => sum + e.amount, 0);

		let simulationHTML = `
			<div class="space-y-3">
				<div class="flex justify-between items-center pb-2 border-b">
					<span class="text-green-800">必要な月次売上</span>
					<span class="font-bold text-green-900">¥${requiredRevenue.toLocaleString()}</span>
				</div>
		`;

		// 収入項目ごとに必要数量を計算
		model.incomes.forEach((income, idx) => {
			const requiredUnits = Math.ceil(requiredRevenue / model.incomes.length / income.unitPrice);
			simulationHTML += `
				<div class="bg-blue-50 rounded p-2">
					<div class="text-xs text-blue-700 mb-1">${income.name}（${income.description}）</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-blue-900">単価 ¥${income.unitPrice.toLocaleString()} × ${requiredUnits}${income.name.includes('会員') ? '人' : income.name.includes('料') ? '件' : '回'}</span>
						<span class="font-semibold text-blue-900">¥${(income.unitPrice * requiredUnits).toLocaleString()}</span>
					</div>
				</div>
			`;
		});

		simulationHTML += `
				<div class="pt-2 border-t">
					<div class="text-xs text-gray-600 mb-2">主な固定費（想定）</div>
		`;

		model.expenses.forEach(expense => {
			simulationHTML += `
				<div class="flex justify-between items-center text-xs text-gray-700 py-1">
					<span>${expense.name}</span>
					<span>¥${expense.amount.toLocaleString()}</span>
				</div>
			`;
		});

		simulationHTML += `
				</div>
				<div class="pt-2 border-t bg-green-100 rounded p-2 -mx-2">
					<div class="flex justify-between items-center">
						<span class="text-sm font-medium text-green-900">想定粗利</span>
						<span class="font-bold text-green-900">¥${targetIncome.toLocaleString()}</span>
					</div>
					<div class="text-xs text-green-700 mt-1">
						（粗利率: ${(model.profitRate * 100).toFixed(0)}%想定）
					</div>
				</div>
			</div>
		`;

		contentEl.innerHTML = simulationHTML;
		resultSection.classList.remove('hidden');
	};

	// シミュレーション結果を予算に反映（汎用）
	window.applySimulation = function() {
		const targetIncome = parseFloat(document.getElementById('target-monthly-income')?.value) || 0;
		const businessModel = document.getElementById('business-model-select')?.value;
    
		if (!targetIncome || !businessModel) return;

		const models = {
			coworking: {
				incomes: [
					{ name: '月額会員', unitPrice: 15000 },
					{ name: 'ドロップイン', unitPrice: 1000 }
				],
				expenses: [
					{ name: '家賃', amount: 80000 },
					{ name: '水道光熱費', amount: 30000 },
					{ name: '通信費', amount: 10000 }
				],
				profitRate: 0.4
			},
			guesthouse: {
				incomes: [{ name: '宿泊料', unitPrice: 4000 }],
				expenses: [
					{ name: '家賃', amount: 100000 },
					{ name: '水道光熱費', amount: 50000 },
					{ name: '消耗品費', amount: 30000 }
				],
				profitRate: 0.35
			},
			cafe: {
				incomes: [{ name: '飲食売上', unitPrice: 800 }],
				expenses: [
					{ name: '家賃', amount: 120000 },
					{ name: '食材費', amount: 150000 },
					{ name: '水道光熱費', amount: 40000 }
				],
				profitRate: 0.25
			},
			event: {
				incomes: [{ name: 'イベント参加費', unitPrice: 3000 }],
				expenses: [
					{ name: '会場費', amount: 50000 },
					{ name: '材料費', amount: 40000 },
					{ name: '広告宣伝費', amount: 30000 }
				],
				profitRate: 0.45
			},
			tour: {
				incomes: [{ name: 'ツアー料金', unitPrice: 5000 }],
				expenses: [
					{ name: '交通費', amount: 60000 },
					{ name: '保険料', amount: 20000 },
					{ name: '広告宣伝費', amount: 40000 }
				],
				profitRate: 0.5
			},
			consulting: {
				incomes: [{ name: 'コンサル料', unitPrice: 50000 }],
				expenses: [
					{ name: '通信費', amount: 15000 },
					{ name: '交通費', amount: 30000 },
					{ name: '広告宣伝費', amount: 25000 }
				],
				profitRate: 0.7
			},
			subscription: {
				incomes: [{ name: '月額会費', unitPrice: 2000 }],
				expenses: [
					{ name: 'サーバー費', amount: 20000 },
					{ name: 'コンテンツ制作費', amount: 50000 },
					{ name: '広告宣伝費', amount: 40000 }
				],
				profitRate: 0.6
			}
		};

		const model = models[businessModel];
		if (!model) return;

		const requiredRevenue = Math.ceil(targetIncome / model.profitRate);

		// 既存の項目をクリア
		if (typeof window.budgetItems !== 'undefined') {
			window.budgetItems.income = [];
			window.budgetItems.expense = [];
		}

		// 収入項目を追加
		if (typeof window.budgetItems !== 'undefined') {
			model.incomes.forEach(income => {
				const requiredUnits = Math.ceil(requiredRevenue / model.incomes.length / income.unitPrice);
				window.budgetItems.income.push({
					id: Date.now() + Math.random(),
					type: 'income',
					name: income.name,
					amount: income.unitPrice * requiredUnits,
					note: `単価¥${income.unitPrice.toLocaleString()} × ${requiredUnits}件`
				});
			});

			// 支出項目を追加
			model.expenses.forEach(expense => {
				window.budgetItems.expense.push({
					id: Date.now() + Math.random(),
					type: 'expense',
					name: expense.name,
					amount: expense.amount,
					note: '月次固定費'
				});
			});

			if (typeof window.renderBudgetLists === 'function') {
				window.renderBudgetLists();
			}
		}

		if (typeof showNotification === 'function') {
			showNotification('シミュレーション結果を予算に反映しました', 'success');
		}
	};
})();

