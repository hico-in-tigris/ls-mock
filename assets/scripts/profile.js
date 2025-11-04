// ===============================
// LocalSuccess - Profile Module (enhanced, clean)
// ===============================

(function () {
  // Read profile safely with defaults
  function getUserProfile() {
    try {
      const saved = localStorage.getItem('userProfile');
      const parsed = saved ? JSON.parse(saved) : {};
      return {
        name: '',
        role: '',
        experience: '',
        residence: '',
        bio: '',
        skills: [],
        skillsOther: '',
        interests: [],
        motivation: '',
        commitment: '',
        email: '',
        phone: '',
        availability: '',
        preferredContact: '',
        website: '',
        twitter: '',
        linkedin: '',
        notifications: { news: false, projects: false, region: false },
        privacy: { showEmail: false, showPhone: false },
        ...parsed
      };
    } catch (e) {
        console.warn('Failed to parse saved profile:', e);
      return {
        name: '', role: '', experience: '', residence: '', bio: '', skills: [], skillsOther: '',
        interests: [], motivation: '', commitment: '', email: '', phone: '', availability: '', preferredContact: '',
        website: '', twitter: '', linkedin: '', notifications: { news: false, projects: false, region: false },
        privacy: { showEmail: false, showPhone: false }
      };
    }
  }

  function notify(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
      window.showNotification(message, type);
    } else {
      alert(message);
    }
  }

  // Save profile values from DOM
  function saveProfile() {
    const get = id => document.getElementById(id)?.value?.trim() || '';
    const isChecked = id => !!document.getElementById(id)?.checked;

    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(el => el.value);
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value);

    const profile = {
      name: get('profile-name'),
      role: get('profile-role'),
      experience: get('profile-experience'),
      residence: get('profile-residence'),
      bio: get('profile-bio'),
      skills,
      skillsOther: get('profile-skills-other'),
      interests,
      motivation: get('profile-motivation'),
      commitment: get('profile-commitment'),
      email: get('profile-email'),
      phone: get('profile-phone'),
      availability: get('profile-availability'),
      preferredContact: get('profile-preferred-contact'),
      website: get('profile-website'),
      twitter: get('profile-twitter'),
      linkedin: get('profile-linkedin'),
      notifications: {
        news: isChecked('profile-notify-news'),
        projects: isChecked('profile-notify-projects'),
        region: isChecked('profile-notify-region')
      },
      privacy: {
        showEmail: isChecked('profile-privacy-show-email'),
        showPhone: isChecked('profile-privacy-show-phone')
      },
      updatedAt: new Date().toISOString()
    };

    // Simple validations
    if (!profile.name) {
      notify('名前を入力してください', 'warning');
      return;
    }
    if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email)) {
      notify('メールアドレスの形式が正しくありません', 'warning');
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profile));
    notify('プロフィールを保存しました', 'success');
  }

  function renderProfile(container) {
    const user = getUserProfile();

    // Options
    const allSkills = [
      '農業・農産物','観光・宿泊','IT・デジタル','マーケティング','教育・研修','デザイン・クリエイティブ',
      '金融・会計','法務・コンサルティング','イベント企画・運営','建築・建設','環境・エネルギー','医療・福祉'
    ];
    const allInterests = [
      '地域活性化','移住・定住促進','起業・新事業創出','観光振興','地域ブランディング','コミュニティ形成','教育・人材育成','環境保全・持続可能性'
    ];

    // Basic info
    const nameField = window.createFormGroup({
      label: '名前',
      required: true,
      children: window.createFormField({ type: 'text', id: 'profile-name', value: user.name || '', placeholder: '山田 太郎' })
    });
    const roleField = window.createFormGroup({
      label: '職業・立場',
      children: window.createSelect({
        id: 'profile-role',
        options: [
          { value: '', text: '選択してください', selected: !user.role },
          { value: '住民', text: '住民', selected: user.role === '住民' },
          { value: '移住者', text: '移住者', selected: user.role === '移住者' },
          { value: '事業者', text: '事業者', selected: user.role === '事業者' },
          { value: '起業家', text: '起業家', selected: user.role === '起業家' },
          { value: '地域おこし協力隊', text: '地域おこし協力隊', selected: user.role === '地域おこし協力隊' },
          { value: '学生', text: '学生', selected: user.role === '学生' },
          { value: '研究者', text: '研究者', selected: user.role === '研究者' },
          { value: 'NPO関係者', text: 'NPO関係者', selected: user.role === 'NPO関係者' },
          { value: '自治体職員', text: '自治体職員', selected: user.role === '自治体職員' },
          { value: 'その他', text: 'その他', selected: user.role === 'その他' }
        ]
      })
    });
    const expField = window.createFormGroup({
      label: '経験年数',
      children: window.createSelect({
        id: 'profile-experience',
        options: [
          { value: '', text: '選択してください', selected: !user.experience },
          { value: '1年未満', text: '1年未満', selected: user.experience === '1年未満' },
          { value: '1-3年', text: '1-3年', selected: user.experience === '1-3年' },
          { value: '3-5年', text: '3-5年', selected: user.experience === '3-5年' },
          { value: '5-10年', text: '5-10年', selected: user.experience === '5-10年' },
          { value: '10年以上', text: '10年以上', selected: user.experience === '10年以上' }
        ]
      })
    });
    const residenceField = window.createFormGroup({
      label: '居住地',
      children: window.createSelect({
        id: 'profile-residence',
        options: [
          { value: '', text: '選択してください', selected: !user.residence },
          { value: '地域内', text: '地域内（喜茂別町）', selected: user.residence === '地域内' },
          { value: '近隣地域', text: '近隣地域（虻田郡内）', selected: user.residence === '近隣地域' },
          { value: '道内', text: '北海道内', selected: user.residence === '道内' },
          { value: '道外', text: '北海道外', selected: user.residence === '道外' }
        ]
      })
    });

    const basicInfoCard = window.createCard({
      header: { title: '基本情報', description: '名前、職業、経験年数、居住地などの基本情報' },
      content: `
        <div class="grid gap-6 md:grid-cols-2">
          ${nameField}
          ${roleField}
          ${expField}
          ${residenceField}
        </div>`
    });

    const bioCard = window.createCard({
      header: { title: '自己紹介', description: '簡単な経歴や関心、得意領域など' },
      content: window.createTextArea({ id: 'profile-bio', label: '自己紹介', rows: 4, value: user.bio || '', placeholder: '経歴や活動歴、得意分野などを記載してください' })
    });

    const skillsCard = window.createCard({
      header: { title: 'スキル・専門分野', description: 'あなたの得意分野や専門知識' },
      content: `
        ${window.createFormGroup({
          label: 'スキル（複数選択可）',
          children: window.createCheckboxGroup({ name: 'skills', items: allSkills.map(s => ({ value: s, label: s })), selectedValues: Array.isArray(user.skills) ? user.skills : [] })
        })}
        ${window.createFormGroup({
          label: 'その他スキル',
          help: 'カンマ区切りで入力（例: 法人営業, ファシリテーション）',
          children: window.createFormField({ id: 'profile-skills-other', value: user.skillsOther || '', placeholder: '例: 法人営業, ファシリテーション' })
        })}
      `
    });

    const interestsCard = window.createCard({
      header: { title: '関心領域', description: '地域で関心のある分野や課題' },
      content: window.createFormGroup({
        label: '関心領域（複数選択可）',
        children: window.createCheckboxGroup({ name: 'interests', items: allInterests.map(s => ({ value: s, label: s })), selectedValues: Array.isArray(user.interests) ? user.interests : [] })
      })
    });

    const goalsCard = window.createCard({
      header: { title: '地域への想い・目標', description: '地域とどう関わりたいか、何を目指したいか' },
      content: `
        ${window.createTextArea({ label: '地域への想い', id: 'profile-motivation', rows: 4, value: user.motivation || '', placeholder: 'この地域で実現したいこと、やってみたい活動など' })}
        ${window.createFormGroup({
          label: '参加レベル',
          children: window.createSelect({
            id: 'profile-commitment',
            options: [
              { value: '', text: '選択してください', selected: !user.commitment },
              { value: '情報収集のみ', text: '情報収集のみ', selected: user.commitment === '情報収集のみ' },
              { value: '時々参加', text: '時々参加（月1-2回程度）', selected: user.commitment === '時々参加' },
              { value: '定期的参加', text: '定期的参加（週1回程度）', selected: user.commitment === '定期的参加' },
              { value: '積極的参加', text: '積極的参加（複数活動）', selected: user.commitment === '積極的参加' },
              { value: 'リーダーシップ', text: 'リーダーシップを取りたい', selected: user.commitment === 'リーダーシップ' }
            ]
          })
        })}
      `
    });

    const contactCard = window.createCard({
      header: { title: '連絡先', description: '連絡に使う情報（任意）' },
      content: `
        <div class="grid gap-6 md:grid-cols-2">
          ${window.createFormGroup({ label: 'メールアドレス', children: window.createFormField({ type: 'email', id: 'profile-email', value: user.email || '', placeholder: 'example@mail.com' }) })}
          ${window.createFormGroup({ label: '電話番号（任意）', children: window.createFormField({ type: 'tel', id: 'profile-phone', value: user.phone || '', placeholder: '090-1234-5678' }) })}
          ${window.createFormGroup({ label: '連絡可能時間', children: window.createSelect({ id: 'profile-availability', options: [ { value: '', text: '選択してください', selected: !user.availability }, { value: '平日昼間', text: '平日昼間（9:00-17:00）', selected: user.availability === '平日昼間' }, { value: '平日夜間', text: '平日夜間（18:00-21:00）', selected: user.availability === '平日夜間' }, { value: '休日', text: '休日', selected: user.availability === '休日' }, { value: 'いつでも', text: 'いつでも', selected: user.availability === 'いつでも' } ] }) })}
          ${window.createFormGroup({ label: '希望連絡方法', children: window.createSelect({ id: 'profile-preferred-contact', options: [ { value: '', text: '選択してください', selected: !user.preferredContact }, { value: 'メール', text: 'メール', selected: user.preferredContact === 'メール' }, { value: '電話', text: '電話', selected: user.preferredContact === '電話' }, { value: 'LINE', text: 'LINE', selected: user.preferredContact === 'LINE' }, { value: 'その他SNS', text: 'その他SNS', selected: user.preferredContact === 'その他SNS' } ] }) })}
        </div>`
    });

    const socialsCard = window.createCard({
      header: { title: 'ソーシャル', description: '活動の参考になるリンク（任意）' },
      content: `
        <div class="grid gap-6 md:grid-cols-2">
          ${window.createFormGroup({ label: 'Webサイト', children: window.createFormField({ id: 'profile-website', value: user.website || '', placeholder: 'https://example.com' }) })}
          ${window.createFormGroup({ label: 'X / Twitter', children: window.createFormField({ id: 'profile-twitter', value: user.twitter || '', placeholder: 'https://x.com/yourhandle' }) })}
          ${window.createFormGroup({ label: 'LinkedIn', children: window.createFormField({ id: 'profile-linkedin', value: user.linkedin || '', placeholder: 'https://www.linkedin.com/in/username' }) })}
        </div>`
    });

    const preferencesCard = window.createCard({
      header: { title: '通知・公開設定', description: '受け取るお知らせと公開範囲の設定' },
      content: `
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="text-sm font-medium mb-2">通知</h4>
            <div class="space-y-2">
              <label class="flex items-center space-x-2"><input id="profile-notify-news" type="checkbox" ${user.notifications?.news ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm">ニュース・お知らせ</span></label>
              <label class="flex items-center space-x-2"><input id="profile-notify-projects" type="checkbox" ${user.notifications?.projects ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm">プロジェクトの招待</span></label>
              <label class="flex items-center space-x-2"><input id="profile-notify-region" type="checkbox" ${user.notifications?.region ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm">地域の更新情報</span></label>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium mb-2">公開設定</h4>
            <div class="space-y-2">
              <label class="flex items-center space-x-2"><input id="profile-privacy-show-email" type="checkbox" ${user.privacy?.showEmail ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm">メールアドレスを公開</span></label>
              <label class="flex items-center space-x-2"><input id="profile-privacy-show-phone" type="checkbox" ${user.privacy?.showPhone ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="text-sm">電話番号を公開</span></label>
            </div>
          </div>
        </div>`
    });

    container.innerHTML = `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">プロフィール設定</h1>
            <p class="text-muted-foreground">スキル、関心、連絡先、公開範囲などを設定します。マッチングに活用されます。</p>
          </div>
        </div>
        ${basicInfoCard}
        ${bioCard}
        ${skillsCard}
        ${interestsCard}
        ${goalsCard}
        ${contactCard}
        ${socialsCard}
        ${preferencesCard}
        <div class="flex justify-center">
          ${window.createButton({ text: 'プロフィールを保存', variant: 'primary', size: 'md', onClick: 'saveProfile()' })}
        </div>
      </div>`;
  }

  // Expose globals
  window.renderProfile = renderProfile;
  window.saveProfile = saveProfile;
  window.getUserProfile = getUserProfile;
})();
// ===============================
// LocalSuccess - Profile Module (clean)
// ===============================

(function () {
  // Helper: read profile from localStorage
  function getUserProfile() {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Failed to parse saved profile:', e);
      return {};
    }
  }

  // Helper: persist profile to localStorage
  function saveProfile() {
    const profileData = {
      name: document.getElementById('profile-name')?.value || '',
      role: document.getElementById('profile-role')?.value || '',
      experience: document.getElementById('profile-experience')?.value || '',
      residence: document.getElementById('profile-residence')?.value || '',
      email: document.getElementById('profile-email')?.value || '',
      phone: document.getElementById('profile-phone')?.value || ''
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    // lightweight feedback
    alert('プロフィールを保存しました');
  }

  // Main renderer
  function renderProfile(container) {
    const user = getUserProfile();

    // Build Basic Info fields using shared components first
    const nameField = window.createFormGroup({
      label: '名前',
      children: window.createFormField({
        type: 'text',
        id: 'profile-name',
        value: user.name || '',
        placeholder: '山田 太郎'
      })
    });

    const roleField = window.createFormGroup({
      label: '職業・立場',
      children: window.createSelect({
        id: 'profile-role',
        placeholder: '選択してください',
        options: [
          { value: '住民', label: '住民' },
          { value: '移住者', label: '移住者' },
          { value: '事業者', label: '事業者' },
          { value: '起業家', label: '起業家' },
          { value: '地域おこし協力隊', label: '地域おこし協力隊' },
          { value: '学生', label: '学生' },
          { value: '研究者', label: '研究者' },
          { value: 'NPO関係者', label: 'NPO関係者' },
          { value: '自治体職員', label: '自治体職員' },
          { value: 'その他', label: 'その他' }
        ],
        selectedValue: user.role || ''
      })
    });

    const expField = window.createFormGroup({
      label: '経験年数',
      children: window.createSelect({
        id: 'profile-experience',
        placeholder: '選択してください',
        options: [
          { value: '1年未満', label: '1年未満' },
          { value: '1-3年', label: '1-3年' },
          { value: '3-5年', label: '3-5年' },
          { value: '5-10年', label: '5-10年' },
          { value: '10年以上', label: '10年以上' }
        ],
        selectedValue: user.experience || ''
      })
    });

    const residenceField = window.createFormGroup({
      label: '居住地',
      children: window.createSelect({
        id: 'profile-residence',
        placeholder: '選択してください',
        options: [
          { value: '地域内', label: '地域内（喜茂別町）' },
          { value: '近隣地域', label: '近隣地域（虻田郡内）' },
          { value: '道内', label: '北海道内' },
          { value: '道外', label: '北海道外' }
        ],
        selectedValue: user.residence || ''
      })
    });

    const basicInfoCard = window.createCard({
      header: {
        title: '基本情報',
        description: '名前、職業、経験年数、居住地などの基本情報'
      },
      content: `
        <div class="grid gap-6 md:grid-cols-2">
          ${nameField}
          ${roleField}
          ${expField}
          ${residenceField}
        </div>
      `
    });

    const contactCard = window.createCard({
      header: {
        title: '連絡先',
        description: '連絡に使う情報を入力してください（任意）'
      },
      content: `
        <div class="grid gap-6 md:grid-cols-2">
          ${window.createFormGroup({
            label: 'メールアドレス',
            children: window.createFormField({ type: 'email', id: 'profile-email', value: user.email || '', placeholder: 'example@mail.com' })
          })}
          ${window.createFormGroup({
            label: '電話番号（任意）',
            children: window.createFormField({ type: 'tel', id: 'profile-phone', value: user.phone || '', placeholder: '090-1234-5678' })
          })}
        </div>
      `
    });

    container.innerHTML = `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">プロフィール設定</h1>
            <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>
          </div>
        </div>
        ${basicInfoCard}
        ${contactCard}
        <div class="flex justify-center">
          <button class="btn btn-primary" onclick="saveProfile()">プロフィールを保存</button>
        </div>
      </div>
    `;
  }

  // expose globals used by router and button
  window.renderProfile = renderProfile;
  window.saveProfile = saveProfile;
})();// ===============================// ===============================// ===============================// ===============================// ===============================

// LocalSuccess - Profile Module (clean)

// ===============================// LocalSuccess - Profile Module



(function () {// ===============================// LocalSuccess - Profile Module

  // Helper: read profile from localStorage

  function getUserProfile() {

    try {

      const saved = localStorage.getItem('userProfile');function renderProfile(container) {// ===============================// LocalSuccess - Profile Module// LocalSuccess - Profile Module

      return saved ? JSON.parse(saved) : {};

    } catch (e) {    const userProfile = getUserProfile();

      console.warn('Failed to parse saved profile:', e);

      return {};    

    }

  }    container.innerHTML = `



  // Helper: persist profile to localStorage        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">function renderProfile(container) {// ===============================// ===============================

  function saveProfile() {

    const profileData = {            <div class="flex items-center justify-between">

      name: document.getElementById('profile-name')?.value || '',

      role: document.getElementById('profile-role')?.value || '',                <div>    const userProfile = getUserProfile();

      experience: document.getElementById('profile-experience')?.value || '',

      residence: document.getElementById('profile-residence')?.value || '',                    <h1 class="text-2xl font-bold">プロフィール設定</h1>

      email: document.getElementById('profile-email')?.value || '',

      phone: document.getElementById('profile-phone')?.value || '',                    <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>    

    };

    localStorage.setItem('userProfile', JSON.stringify(profileData));                </div>

    // lightweight feedback

    alert('プロフィールを保存しました');            </div>    container.innerHTML = `

  }

            

  // Main renderer

  function renderProfile(container) {            <!-- Basic Information -->        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">// 基本情報フォームを作成する関数function renderProfile(container) {

    const user = getUserProfile();

            <div class="card">

    // Build Basic Info fields using shared components first

    const nameField = window.createFormGroup({                <div class="card-header">            <div class="flex items-center justify-between">

      label: '名前',

      children: window.createFormField({                    <h2 class="text-xl font-semibold">基本情報</h2>

        type: 'text',

        id: 'profile-name',                    <p class="text-sm text-muted-foreground">名前、職業、経験年数などの基本的な情報</p>                <div>function createBasicInfoForm(userProfile) {    const userProfile = getUserProfile();

        value: user.name || '',

        placeholder: '山田 太郎'                </div>

      })

    });                <div class="card-content">                    <h1 class="text-2xl font-bold">プロフィール設定</h1>



    const roleField = window.createFormGroup({                    <div class="grid gap-6 md:grid-cols-2">

      label: '職業・立場',

      children: window.createSelect({                        <div class="form-group">                    <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>    const nameField = createFormGroup({    

        id: 'profile-role',

        placeholder: '選択してください',                            <label for="profile-name" class="label">名前</label>

        options: [

          { value: '住民', label: '住民' },                            <input type="text" id="profile-name" class="input" value="${userProfile.name || ''}" placeholder="山田 太郎">                </div>

          { value: '移住者', label: '移住者' },

          { value: '事業者', label: '事業者' },                        </div>

          { value: '起業家', label: '起業家' },

          { value: '地域おこし協力隊', label: '地域おこし協力隊' },                        <div class="form-group">            </div>        label: '名前',    // 基本情報セクションのHTMLを生成

          { value: '学生', label: '学生' },

          { value: '研究者', label: '研究者' },                            <label for="profile-role" class="label">職業・立場</label>

          { value: 'NPO関係者', label: 'NPO関係者' },

          { value: '自治体職員', label: '自治体職員' },                            <select id="profile-role" class="input">            

          { value: 'その他', label: 'その他' }

        ],                                <option value="">選択してください</option>

        selectedValue: user.role || ''

      })                                <option value="住民">住民</option>            <!-- Test Section -->        children: createFormField({    const basicInfoCard = createCard({

    });

                                <option value="移住者">移住者</option>

    const expField = window.createFormGroup({

      label: '経験年数',                                <option value="事業者">事業者</option>            <div class="card">

      children: window.createSelect({

        id: 'profile-experience',                                <option value="起業家">起業家</option>

        placeholder: '選択してください',

        options: [                                <option value="地域おこし協力隊">地域おこし協力隊</option>                <div class="card-header">            type: 'text',        header: {

          { value: '1年未満', label: '1年未満' },

          { value: '1-3年', label: '1-3年' },                                <option value="学生">学生</option>

          { value: '3-5年', label: '3-5年' },

          { value: '5-10年', label: '5-10年' },                                <option value="研究者">研究者</option>                    <h2 class="text-xl font-semibold">基本情報</h2>

          { value: '10年以上', label: '10年以上' }

        ],                                <option value="NPO関係者">NPO関係者</option>

        selectedValue: user.experience || ''

      })                                <option value="自治体職員">自治体職員</option>                    <p class="text-sm text-muted-foreground">名前、職業、経験年数などの基本的な情報</p>            id: 'profile-name',            title: '基本情報',

    });

                                <option value="その他">その他</option>

    const residenceField = window.createFormGroup({

      label: '居住地',                            </select>                </div>

      children: window.createSelect({

        id: 'profile-residence',                        </div>

        placeholder: '選択してください',

        options: [                    </div>                <div class="card-content">            value: userProfile.name || '',            description: '名前、職業、経験年数などの基本的な情報'

          { value: '地域内', label: '地域内（喜茂別町）' },

          { value: '近隣地域', label: '近隣地域（虻田郡内）' },                </div>

          { value: '道内', label: '北海道内' },

          { value: '道外', label: '北海道外' }            </div>                    <div class="grid gap-6 md:grid-cols-2">

        ],

        selectedValue: user.residence || ''            

      })

    });            <!-- Save Button -->                        <div class="form-group">            placeholder: '山田 太郎'        },



    const basicInfoCard = window.createCard({            <div class="flex justify-center">

      header: {

        title: '基本情報',                <button onclick="saveProfile()" class="btn btn-primary">                            <label for="profile-name" class="label">名前</label>

        description: '名前、職業、経験年数、居住地などの基本情報'

      },                    プロフィールを保存

      content: `

        <div class="grid gap-6 md:grid-cols-2">                </button>                            <input type="text" id="profile-name" class="input" value="${userProfile.name || ''}" placeholder="山田 太郎">        })        content: createBasicInfoForm(userProfile)

          ${nameField}

          ${roleField}            </div>

          ${expField}

          ${residenceField}        </div>                        </div>

        </div>

      `    `;

    });

}                        <div class="form-group">    });    });

    const contactCard = window.createCard({

      header: {

        title: '連絡先',

        description: '連絡に使う情報を入力してください（任意）'function saveProfile() {                            <label for="profile-role" class="label">職業・立場</label>

      },

      content: `    const profileData = {

        <div class="grid gap-6 md:grid-cols-2">

          ${window.createFormGroup({        name: document.getElementById('profile-name')?.value || '',                            <select id="profile-role" class="input">    

            label: 'メールアドレス',

            children: window.createFormField({ type: 'email', id: 'profile-email', value: user.email || '', placeholder: 'example@mail.com' })        role: document.getElementById('profile-role')?.value || ''

          })}

          ${window.createFormGroup({    };                                <option value="">選択してください</option>

            label: '電話番号（任意）',

            children: window.createFormField({ type: 'tel', id: 'profile-phone', value: user.phone || '', placeholder: '090-1234-5678' })    

          })}

        </div>    // プロフィールデータをローカルストレージに保存                                <option value="住民" ${userProfile.role === '住民' ? 'selected' : ''}>住民</option>    const roleField = createFormGroup({    container.innerHTML = `

      `

    });    localStorage.setItem('userProfile', JSON.stringify(profileData));



    container.innerHTML = `                                    <option value="移住者" ${userProfile.role === '移住者' ? 'selected' : ''}>移住者</option>

      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">

        <div class="flex items-center justify-between">    // 成功メッセージを表示

          <div>

            <h1 class="text-2xl font-bold">プロフィール設定</h1>    alert('プロフィールが保存されました');                                <option value="事業者" ${userProfile.role === '事業者' ? 'selected' : ''}>事業者</option>        label: '職業・立場',        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">

            <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>

          </div>}

        </div>

        ${basicInfoCard}                                <option value="起業家" ${userProfile.role === '起業家' ? 'selected' : ''}>起業家</option>

        ${contactCard}

        <div class="flex justify-center">function getUserProfile() {

          <button class="btn btn-primary" onclick="saveProfile()">プロフィールを保存</button>

        </div>    const saved = localStorage.getItem('userProfile');                                <option value="地域おこし協力隊" ${userProfile.role === '地域おこし協力隊' ? 'selected' : ''}>地域おこし協力隊</option>        children: createSelect({            <div class="flex items-center justify-between">

      </div>

    `;    if (saved) {

  }

        try {                                <option value="学生" ${userProfile.role === '学生' ? 'selected' : ''}>学生</option>

  // expose globals used by router and button

  window.renderProfile = renderProfile;            return JSON.parse(saved);

  window.saveProfile = saveProfile;

})();        } catch (e) {                                <option value="研究者" ${userProfile.role === '研究者' ? 'selected' : ''}>研究者</option>            id: 'profile-role',                <div>


            console.error('Failed to parse saved profile:', e);

        }                                <option value="NPO関係者" ${userProfile.role === 'NPO関係者' ? 'selected' : ''}>NPO関係者</option>

    }

                                    <option value="自治体職員" ${userProfile.role === '自治体職員' ? 'selected' : ''}>自治体職員</option>            placeholder: '選択してください',                    <h1 class="text-2xl font-bold">プロフィール設定</h1>

    // デフォルトプロフィール

    return {                                <option value="その他" ${userProfile.role === 'その他' ? 'selected' : ''}>その他</option>

        name: '',

        role: ''                            </select>            options: [                    <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>

    };

}                        </div>



// グローバルに公開                    </div>                { value: '住民', label: '住民' },                </div>

window.renderProfile = renderProfile;

window.saveProfile = saveProfile;                </div>

window.getUserProfile = getUserProfile;
            </div>                { value: '移住者', label: '移住者' },            </div>

            

            <!-- Save Button -->                { value: '事業者', label: '事業者' },            

            <div class="flex justify-center">

                <button onclick="saveProfile()" class="btn btn-primary">                { value: '起業家', label: '起業家' },            <!-- Basic Information -->

                    プロフィールを保存

                </button>                { value: '地域おこし協力隊', label: '地域おこし協力隊' },            ${basicInfoCard}

            </div>

        </div>                { value: '学生', label: '学生' },                            })

    `;

}                { value: '研究者', label: '研究者' },                        })}



function saveProfile() {                { value: 'NPO関係者', label: 'NPO関係者' },                    </div>

    const profileData = {

        name: document.getElementById('profile-name')?.value || '',                { value: '自治体職員', label: '自治体職員' },                    

        role: document.getElementById('profile-role')?.value || ''

    };                { value: 'その他', label: 'その他' }                    ${createFormGroup({

    

    // プロフィールデータをローカルストレージに保存            ],                        label: '自己紹介',

    localStorage.setItem('userProfile', JSON.stringify(profileData));

                selectedValue: userProfile.role || ''                        children: createTextArea({

    // 成功メッセージを表示

    alert('プロフィールが保存されました');        })                            id: 'profile-bio',

}

    });                            rows: 3,

function getUserProfile() {

    const saved = localStorage.getItem('userProfile');                            placeholder: '簡単な自己紹介をお書きください',

    if (saved) {

        try {    const experienceField = createFormGroup({                            value: userProfile.bio || ''

            return JSON.parse(saved);

        } catch (e) {        label: '経験年数',                        })

            console.error('Failed to parse saved profile:', e);

        }        children: createSelect({                    })}

    }

                id: 'profile-experience',                `

    // デフォルトプロフィール

    return {            placeholder: '選択してください',            })}

        name: '',

        role: ''            options: [            

    };

}                { value: '1年未満', label: '1年未満' },            <!-- Skills Section -->



// グローバルに公開                { value: '1-3年', label: '1-3年' },            ${createCard({

window.renderProfile = renderProfile;

window.saveProfile = saveProfile;                { value: '3-5年', label: '3-5年' },                header: {

window.getUserProfile = getUserProfile;
                { value: '5-10年', label: '5-10年' },                    title: 'スキル・専門分野',

                { value: '10年以上', label: '10年以上' }                    description: 'あなたの持つスキルや専門知識を選択してください'

            ],                },

            selectedValue: userProfile.experience || ''                content: `

        })                    <div id="skills-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

    });                        ${renderSkillCheckboxes(userProfile.skills || [])}

                    </div>

    const residenceField = createFormGroup({                `

        label: '居住地',            })}

        children: createSelect({            

            id: 'profile-residence',            <!-- Interests Section -->

            placeholder: '選択してください',            ${createCard({

            options: [                header: {

                { value: '地域内', label: '地域内（喜茂別町）' },                    title: '興味・関心分野',

                { value: '近隣地域', label: '近隣地域（虻田郡内）' },                    description: '地域活動や社会課題に関する興味のある分野を選択してください'

                { value: '道内', label: '北海道内' },                },

                { value: '道外', label: '北海道外' }                content: `

            ],                    <div id="interests-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

            selectedValue: userProfile.residence || ''                        ${renderInterestCheckboxes(userProfile.interests || [])}

        })                    </div>

    });                `

            })}

    return `            </div>

        <div class="grid gap-6 md:grid-cols-2">            

            ${nameField}            <!-- Goals and Aspirations -->

            ${roleField}            <div class="card mb-6">

            ${experienceField}                <div class="card-header">

            ${residenceField}                    <h2 class="text-xl font-semibold">地域への想い・目標</h2>

        </div>                    <p class="text-sm text-muted-foreground">地域に対してどのような貢献をしたいか、どんな暮らしを実現したいかをお聞かせください</p>

    `;                </div>

}                <div class="card-content">

                    <div class="grid gap-4">

// スキルセクションを作成する関数                        <div>

function createSkillsSection(userProfile) {                            <label class="block text-sm font-medium text-gray-700 mb-2">地域への貢献目標</label>

    const skillsField = createFormGroup({                            <textarea id="profile-aspirations" rows="4" 

        label: 'スキル・専門分野',                                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 

        hint: '複数選択可（Ctrl/Cmdキーを押しながらクリック）',                                      placeholder="例：地域の観光振興に貢献したい、移住者のサポートをしたい、農業の活性化に取り組みたい...">${userProfile.aspirations || ''}</textarea>

        children: `                        </div>

            <select id="profile-skills" class="input" multiple size="8">                        <div>

                <option value="農業・農産物" ${(userProfile.skills || []).includes('農業・農産物') ? 'selected' : ''}>農業・農産物</option>                            <label class="block text-sm font-medium text-gray-700 mb-2">参加可能な活動レベル</label>

                <option value="観光・宿泊" ${(userProfile.skills || []).includes('観光・宿泊') ? 'selected' : ''}>観光・宿泊</option>                            <select id="profile-commitment" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

                <option value="IT・デジタル" ${(userProfile.skills || []).includes('IT・デジタル') ? 'selected' : ''}>IT・デジタル</option>                                <option value="">選択してください</option>

                <option value="マーケティング" ${(userProfile.skills || []).includes('マーケティング') ? 'selected' : ''}>マーケティング</option>                                <option value="情報収集のみ" ${userProfile.commitment === '情報収集のみ' ? 'selected' : ''}>情報収集のみ</option>

                <option value="教育・研修" ${(userProfile.skills || []).includes('教育・研修') ? 'selected' : ''}>教育・研修</option>                                <option value="時々参加" ${userProfile.commitment === '時々参加' ? 'selected' : ''}>時々参加（月1-2回程度）</option>

                <option value="デザイン・クリエイティブ" ${(userProfile.skills || []).includes('デザイン・クリエイティブ') ? 'selected' : ''}>デザイン・クリエイティブ</option>                                <option value="定期的参加" ${userProfile.commitment === '定期的参加' ? 'selected' : ''}>定期的参加（週1回程度）</option>

                <option value="金融・会計" ${(userProfile.skills || []).includes('金融・会計') ? 'selected' : ''}>金融・会計</option>                                <option value="積極的参加" ${userProfile.commitment === '積極的参加' ? 'selected' : ''}>積極的参加（複数活動）</option>

                <option value="法務・コンサルティング" ${(userProfile.skills || []).includes('法務・コンサルティング') ? 'selected' : ''}>法務・コンサルティング</option>                                <option value="リーダーシップ" ${userProfile.commitment === 'リーダーシップ' ? 'selected' : ''}>リーダーシップを取りたい</option>

                <option value="イベント企画・運営" ${(userProfile.skills || []).includes('イベント企画・運営') ? 'selected' : ''}>イベント企画・運営</option>                            </select>

                <option value="建築・建設" ${(userProfile.skills || []).includes('建築・建設') ? 'selected' : ''}>建築・建設</option>                        </div>

                <option value="環境・エネルギー" ${(userProfile.skills || []).includes('環境・エネルギー') ? 'selected' : ''}>環境・エネルギー</option>                    </div>

                <option value="医療・福祉" ${(userProfile.skills || []).includes('医療・福祉') ? 'selected' : ''}>医療・福祉</option>                </div>

            </select>            </div>

        `            

    });            <!-- Contact Information -->

            <div class="card mb-6">

    return createCard({                <div class="card-header">

        header: {                    <h2 class="text-xl font-semibold">連絡先情報</h2>

            title: 'スキル・専門分野',                    <p class="text-sm text-muted-foreground">活動の連絡に使用します（任意）</p>

            description: 'あなたの得意分野や専門知識'                </div>

        },                <div class="card-content">

        content: skillsField                    <div class="grid gap-4 md:grid-cols-2">

    });                        <div>

}                            <label class="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>

                            <input type="email" id="profile-email" value="${userProfile.email || ''}" 

// 関心領域セクションを作成する関数                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 

function createInterestsSection(userProfile) {                                   placeholder="example@example.com">

    const interestsField = createFormGroup({                        </div>

        label: '関心領域',                        <div>

        hint: '複数選択可（Ctrl/Cmdキーを押しながらクリック）',                            <label class="block text-sm font-medium text-gray-700 mb-2">電話番号</label>

        children: `                            <input type="tel" id="profile-phone" value="${userProfile.phone || ''}" 

            <select id="profile-interests" class="input" multiple size="6">                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 

                <option value="地域活性化" ${(userProfile.interests || []).includes('地域活性化') ? 'selected' : ''}>地域活性化</option>                                   placeholder="090-1234-5678">

                <option value="移住・定住促進" ${(userProfile.interests || []).includes('移住・定住促進') ? 'selected' : ''}>移住・定住促進</option>                        </div>

                <option value="起業・新事業創出" ${(userProfile.interests || []).includes('起業・新事業創出') ? 'selected' : ''}>起業・新事業創出</option>                    </div>

                <option value="観光振興" ${(userProfile.interests || []).includes('観光振興') ? 'selected' : ''}>観光振興</option>                </div>

                <option value="地域ブランディング" ${(userProfile.interests || []).includes('地域ブランディング') ? 'selected' : ''}>地域ブランディング</option>            </div>

                <option value="コミュニティ形成" ${(userProfile.interests || []).includes('コミュニティ形成') ? 'selected' : ''}>コミュニティ形成</option>            

                <option value="教育・人材育成" ${(userProfile.interests || []).includes('教育・人材育成') ? 'selected' : ''}>教育・人材育成</option>            <!-- Action Buttons -->

                <option value="環境保全・持続可能性" ${(userProfile.interests || []).includes('環境保全・持続可能性') ? 'selected' : ''}>環境保全・持続可能性</option>            <div class="flex justify-end space-x-4">

            </select>                ${createButton({

        `                    text: 'リセット',

    });                    variant: 'secondary',

                    onClick: 'resetProfileForm()'

    return createCard({                })}

        header: {                ${createButton({

            title: '関心領域',                    text: 'プロフィールを保存',

            description: '地域で関心のある分野や課題'                    variant: 'primary',

        },                    onClick: 'saveProfile()'

        content: interestsField                })}

    });            </div>

}        </div>

    `;

function renderProfile(container) {}

    const userProfile = getUserProfile();

    function renderSkillCheckboxes(selectedSkills) {

    // 各セクションのHTMLを生成    const skills = [

    const basicInfoCard = createCard({        '農業・農作業', '観光・ホスピタリティ', 'IT・デジタル', 'マーケティング・PR',

        header: {        '経営・事業運営', '教育・研修', '医療・福祉', '建築・土木',

            title: '基本情報',        'デザイン・アート', '金融・会計', '法務・行政', '環境・エネルギー',

            description: '名前、職業、経験年数などの基本的な情報'        '料理・食品加工', '工芸・手作業', 'イベント企画', '通訳・翻訳',

        },        '写真・映像', '音楽・芸能', 'スポーツ指導', 'カウンセリング'

        content: createBasicInfoForm(userProfile)    ];

    });    

    return skills.map(skill => `

    const skillsCard = createSkillsSection(userProfile);        <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">

    const interestsCard = createInterestsSection(userProfile);            <input type="checkbox" value="${skill}" ${selectedSkills.includes(skill) ? 'checked' : ''} 

                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">

    container.innerHTML = `            <span class="text-sm">${skill}</span>

        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">        </label>

            <div class="flex items-center justify-between">    `).join('');

                <div>}

                    <h1 class="text-2xl font-bold">プロフィール設定</h1>

                    <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>function renderInterestCheckboxes(selectedInterests) {

                </div>    const interests = [

            </div>        '#移住相談', '#空き家活用', '#観光振興', '#農業振興',

                    '#起業支援', '#子育て支援', '#高齢者支援', '#教育・学習',

            <!-- Basic Information -->        '#文化・芸術', '#スポーツ・健康', '#環境保護', '#防災・安全',

            ${basicInfoCard}        '#コミュニティ', '#イベント企画', '#広報・メディア', '#交通・インフラ',

                    '#商工業振興', '#福祉・医療', '#国際交流', '#デジタル化'

            <!-- Skills Section -->    ];

            ${skillsCard}    

                return interests.map(interest => `

            <!-- Interests Section -->        <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">

            ${interestsCard}            <input type="checkbox" value="${interest}" ${selectedInterests.includes(interest) ? 'checked' : ''} 

                               class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">

            <!-- Goals and Aspirations -->            <span class="text-sm">${interest}</span>

            <div class="card">        </label>

                <div class="card-header">    `).join('');

                    <h2 class="text-xl font-semibold">地域への想い・目標</h2>}

                    <p class="text-sm text-muted-foreground">地域とどう関わりたいか、何を目指したいかをお聞かせください</p>

                </div>function saveProfile() {

                <div class="card-content space-y-4">    const profile = {

                    <div class="form-group">        name: document.getElementById('profile-name').value,

                        <label for="profile-motivation" class="label">地域への想い</label>        role: document.getElementById('profile-role').value,

                        <textarea id="profile-motivation" class="input" rows="4" placeholder="この地域で実現したいことや、地域に対する想いを自由にお書きください">${userProfile.motivation || ''}</textarea>        experience: document.getElementById('profile-experience').value,

                    </div>        residence: document.getElementById('profile-residence').value,

                    <div class="form-group">        bio: document.getElementById('profile-bio').value,

                        <label for="profile-commitment" class="label">参加レベル</label>        aspirations: document.getElementById('profile-aspirations').value,

                        <select id="profile-commitment" class="input">        commitment: document.getElementById('profile-commitment').value,

                            <option value="">選択してください</option>        email: document.getElementById('profile-email').value,

                            <option value="情報収集のみ" ${userProfile.commitment === '情報収集のみ' ? 'selected' : ''}>情報収集のみ</option>        phone: document.getElementById('profile-phone').value,

                            <option value="時々参加" ${userProfile.commitment === '時々参加' ? 'selected' : ''}>時々参加（月1-2回程度）</option>        skills: Array.from(document.querySelectorAll('#skills-grid input:checked')).map(input => input.value),

                            <option value="定期的参加" ${userProfile.commitment === '定期的参加' ? 'selected' : ''}>定期的参加（週1回程度）</option>        interests: Array.from(document.querySelectorAll('#interests-grid input:checked')).map(input => input.value),

                            <option value="積極的参加" ${userProfile.commitment === '積極的参加' ? 'selected' : ''}>積極的参加（複数活動）</option>        updatedAt: new Date().toISOString()

                            <option value="リーダーシップ" ${userProfile.commitment === 'リーダーシップ' ? 'selected' : ''}>リーダーシップを取りたい</option>    };

                        </select>    

                    </div>    localStorage.setItem('user.profile', JSON.stringify(profile));

                </div>    

            </div>    // Show success message

                showNotification('プロフィールを保存しました！', 'success');

            <!-- Contact Information -->    

            <div class="card">    // Update appState if needed

                <div class="card-header">    if (appState.userProfile) {

                    <h2 class="text-xl font-semibold">連絡先情報</h2>        Object.assign(appState.userProfile, profile);

                    <p class="text-sm text-muted-foreground">プロジェクトの連絡や協力の際に使用されます</p>        saveData();

                </div>    }

                <div class="card-content">}

                    <div class="grid gap-4 md:grid-cols-2">

                        <div class="form-group">function getUserProfile() {

                            <label for="profile-email" class="label">メールアドレス</label>    const stored = localStorage.getItem('user.profile');

                            <input type="email" id="profile-email" class="input" value="${userProfile.email || ''}" placeholder="example@email.com">    return stored ? JSON.parse(stored) : {};

                        </div>}

                        <div class="form-group">

                            <label for="profile-phone" class="label">電話番号（任意）</label>function resetProfileForm() {

                            <input type="tel" id="profile-phone" class="input" value="${userProfile.phone || ''}" placeholder="090-1234-5678">    if (confirm('入力内容をリセットしますか？未保存の変更は失われます。')) {

                        </div>        localStorage.removeItem('user.profile');

                        <div class="form-group">        renderProfile(document.getElementById('main-content'));

                            <label for="profile-availability" class="label">連絡可能時間</label>        showNotification('プロフィールをリセットしました', 'info');

                            <select id="profile-availability" class="input">    }

                                <option value="">選択してください</option>}

                                <option value="平日昼間" ${userProfile.availability === '平日昼間' ? 'selected' : ''}>平日昼間（9:00-17:00）</option>

                                <option value="平日夜間" ${userProfile.availability === '平日夜間' ? 'selected' : ''}>平日夜間（18:00-21:00）</option>function showNotification(message, type = 'info') {

                                <option value="休日" ${userProfile.availability === '休日' ? 'selected' : ''}>休日</option>    // Create notification element

                                <option value="いつでも" ${userProfile.availability === 'いつでも' ? 'selected' : ''}>いつでも</option>    const notification = document.createElement('div');

                            </select>    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;

                        </div>    

                        <div class="form-group">    // Set color based on type

                            <label for="profile-preferred-contact" class="label">希望連絡方法</label>    switch (type) {

                            <select id="profile-preferred-contact" class="input">        case 'success':

                                <option value="">選択してください</option>            notification.classList.add('bg-green-500', 'text-white');

                                <option value="メール" ${userProfile.preferredContact === 'メール' ? 'selected' : ''}>メール</option>            break;

                                <option value="電話" ${userProfile.preferredContact === '電話' ? 'selected' : ''}>電話</option>        case 'error':

                                <option value="LINE" ${userProfile.preferredContact === 'LINE' ? 'selected' : ''}>LINE</option>            notification.classList.add('bg-red-500', 'text-white');

                                <option value="その他SNS" ${userProfile.preferredContact === 'その他SNS' ? 'selected' : ''}>その他SNS</option>            break;

                            </select>        case 'warning':

                        </div>            notification.classList.add('bg-yellow-500', 'text-white');

                    </div>            break;

                </div>        default:

            </div>            notification.classList.add('bg-blue-500', 'text-white');

                }

            <!-- Save Button -->    

            <div class="flex justify-center">    notification.textContent = message;

                <button onclick="saveProfile()" class="btn btn-primary">    document.body.appendChild(notification);

                    プロフィールを保存    

                </button>    // Animate in

            </div>    setTimeout(() => {

        </div>        notification.classList.remove('translate-x-full');

    `;    }, 100);

        

    // フォームのイベントリスナーを設定    // Auto remove after 3 seconds

    setupProfileEventListeners();    setTimeout(() => {

}        notification.classList.add('translate-x-full');

        setTimeout(() => {

function setupProfileEventListeners() {            document.body.removeChild(notification);

    // 自動保存機能（オプション）        }, 300);

    const inputs = document.querySelectorAll('#profile-form input, #profile-form textarea, #profile-form select');    }, 3000);

    inputs.forEach(input => {}

        input.addEventListener('change', () => {

            // 必要に応じてここに自動保存ロジックを追加// Expose to global scope

        });window.renderProfile = renderProfile;

    });window.saveProfile = saveProfile;

}window.getUserProfile = getUserProfile;

window.resetProfileForm = resetProfileForm;

function saveProfile() {window.showNotification = showNotification;
    const profileData = {
        name: document.getElementById('profile-name')?.value || '',
        role: document.getElementById('profile-role')?.value || '',
        experience: document.getElementById('profile-experience')?.value || '',
        residence: document.getElementById('profile-residence')?.value || '',
        skills: Array.from(document.getElementById('profile-skills')?.selectedOptions || []).map(option => option.value),
        interests: Array.from(document.getElementById('profile-interests')?.selectedOptions || []).map(option => option.value),
        motivation: document.getElementById('profile-motivation')?.value || '',
        commitment: document.getElementById('profile-commitment')?.value || '',
        email: document.getElementById('profile-email')?.value || '',
        phone: document.getElementById('profile-phone')?.value || '',
        availability: document.getElementById('profile-availability')?.value || '',
        preferredContact: document.getElementById('profile-preferred-contact')?.value || ''
    };
    
    // プロフィールデータをローカルストレージに保存
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // 成功メッセージを表示
    showNotification('プロフィールが保存されました', 'success');
}

function getUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved profile:', e);
        }
    }
    
    // デフォルトプロフィール
    return {
        name: '',
        role: '',
        experience: '',
        residence: '',
        skills: [],
        interests: [],
        motivation: '',
        commitment: '',
        email: '',
        phone: '',
        availability: '',
        preferredContact: ''
    };
}

function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">×</button>
        </div>
    `;
    
    // 画面に追加
    document.body.appendChild(notification);
    
    // 自動削除
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// グローバルに公開
window.renderProfile = renderProfile;
window.saveProfile = saveProfile;
window.getUserProfile = getUserProfile;
window.showNotification = showNotification;