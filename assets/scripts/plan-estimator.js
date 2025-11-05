// Simple financial estimator based on selected genres
// Returns income/expense breakdown and totals using rough, conservative defaults
(function(){
  const GENRES = {
    coworking: {
      name: 'コワーキング',
      incomes: [
        { label: '月額会員費', unit: '人/月', defaultQty: 20, unitPrice: 20000 },
        { label: 'ドロップイン', unit: '人/月', defaultQty: 30, unitPrice: 1500 }
      ],
      expenses: [
        { label: '家賃', monthly: 200000 },
        { label: '光熱費', monthly: 50000 },
        { label: '通信費', monthly: 10000 },
        { label: '人件費(受付/運営)', monthly: 150000 },
        { label: '消耗品', monthly: 10000 }
      ]
    },
    guesthouse: {
      name: 'ゲストハウス',
      incomes: [
        { label: '宿泊費', unit: '泊/月', qtyFn: (ov)=> (ov.rooms||2)*30*(ov.occRate||0.5), unitPrice: 5000 }
      ],
      expenses: [
        { label: '清掃委託費', monthlyFn: (ov)=> ((ov.rooms||2)*30*(ov.occRate||0.5))*800 },
        { label: 'リネン/消耗品', monthly: 15000 },
        { label: '光熱費', monthly: 40000 },
        { label: '予約サイト手数料', monthlyFn: (ov, incomeTotal)=> incomeTotal*0.05 }
      ]
    },
    events: {
      name: 'イベント',
      incomes: [
        { label: '参加費', unit: '人/月', qtyFn: (ov)=> (ov.eventsPerMonth||2)*(ov.participants||25), unitPrice: 2000 },
        { label: 'スポンサー収入', unit: '件/月', qtyFn: (ov)=> (ov.sponsors||1), unitPrice: 10000 }
      ],
      expenses: [
        { label: '会場費', monthlyFn: (ov)=> (ov.eventsPerMonth||2)*10000 },
        { label: '講師/出演謝金', monthlyFn: (ov)=> (ov.eventsPerMonth||2)*15000 },
        { label: '広告宣伝費', monthly: 10000 }
      ]
    },
    akiya: {
      name: '空き家活用',
      incomes: [
        { label: 'スペース貸し', unit: '件/月', defaultQty: 8, unitPrice: 5000 }
      ],
      expenses: [
        { label: '原状回復・修繕積立', monthly: 30000 },
        { label: '保険・税金按分', monthly: 10000 }
      ]
    },
    tour: {
      name: '観光ツアー',
      incomes: [
        { label: 'ツアー売上', unit: '人/月', qtyFn: (ov)=> (ov.toursPerMonth||4)*(ov.tourSize||8), unitPrice: 6000 }
      ],
      expenses: [
        { label: '交通手配/燃料', monthlyFn: (ov)=> (ov.toursPerMonth||4)*(ov.tourSize||8)*500 },
        { label: 'ガイド人件費', monthlyFn: (ov)=> (ov.toursPerMonth||4)*8000 },
        { label: '保険/許認可費用', monthly: 5000 }
      ]
    }
  };

  function round(n){ return Math.round(n); }

  function computeItems(defs, overrides){
    const items = [];
    for (const def of defs){
      if (def.unitPrice){
        const qty = def.qtyFn ? def.qtyFn(overrides) : (def.defaultQty || 0);
        const monthly = (qty || 0) * def.unitPrice;
        items.push({ label: def.label, unit: def.unit || '', qty: round(qty||0), unitPrice: def.unitPrice, monthly: round(monthly) });
      } else if (typeof def.monthlyFn === 'function'){
        // monthlyFn may depend on income total; we'll set a placeholder, compute later
        items.push({ label: def.label, monthlyFn: def.monthlyFn });
      } else {
        items.push({ label: def.label, monthly: def.monthly||0 });
      }
    }
    return items;
  }

  function estimateFinancials(selectedKeys, overrides={}){
    const incomes = [];
    const expenses = [];

    // Gather base items
    for (const key of selectedKeys){
      const g = GENRES[key];
      if (!g) continue;
      incomes.push(...computeItems(g.incomes||[], overrides));
      expenses.push(...computeItems(g.expenses||[], overrides));
    }

    // Sum income first to allow expense monthlyFn referencing income total
    const incomeTotal = incomes.reduce((sum,i)=> sum + (i.monthly||0), 0);

    // Resolve expense monthlyFn
    const resolvedExpenses = expenses.map(e=>{
      if (typeof e.monthlyFn === 'function'){
        const m = e.monthlyFn(overrides, incomeTotal) || 0;
        return { label: e.label, monthly: round(m) };
      }
      return e;
    });

    const expensesTotal = resolvedExpenses.reduce((sum,e)=> sum + (e.monthly||0), 0);
    const profit = incomeTotal - expensesTotal;

    return {
      meta: {
        genres: selectedKeys.map(k=> GENRES[k]?.name).filter(Boolean)
      },
      incomes,
      expenses: resolvedExpenses,
      totals: { income: round(incomeTotal), expenses: round(expensesTotal), profit: round(profit) }
    };
  }

  window.PlanEstimator = { estimateFinancials, GENRES };
})();