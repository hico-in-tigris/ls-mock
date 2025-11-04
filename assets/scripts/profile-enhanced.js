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
