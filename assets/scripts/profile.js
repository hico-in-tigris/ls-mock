// ===============================
// LocalSuccess - Profile Module
// ===============================

function renderProfile(container) {
    const userProfile = getUserProfile();
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">プロフィール設定</h1>
                <p class="text-muted-foreground">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>
            </div>
            
            <!-- Basic Information -->
            <div class="card mb-6">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">基本情報</h2>
                    <p class="text-sm text-muted-foreground">名前、職業、経験年数などの基本的な情報</p>
                </div>
                <div class="card-content">
                    <div class="grid gap-6 md:grid-cols-2">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">名前</label>
                            <input type="text" id="profile-name" value="${userProfile.name || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                   placeholder="山田 太郎">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">職業・立場</label>
                            <select id="profile-role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">選択してください</option>
                                <option value="住民" ${userProfile.role === '住民' ? 'selected' : ''}>住民</option>
                                <option value="移住者" ${userProfile.role === '移住者' ? 'selected' : ''}>移住者</option>
                                <option value="事業者" ${userProfile.role === '事業者' ? 'selected' : ''}>事業者</option>
                                <option value="起業家" ${userProfile.role === '起業家' ? 'selected' : ''}>起業家</option>
                                <option value="起業家" ${userProfile.role === '地域おこし協力隊' ? 'selected' : ''}>地域おこし協力隊</option>
                                <option value="学生" ${userProfile.role === '学生' ? 'selected' : ''}>学生</option>
                                <option value="研究者" ${userProfile.role === '研究者' ? 'selected' : ''}>研究者</option>
                                <option value="NPO関係者" ${userProfile.role === 'NPO関係者' ? 'selected' : ''}>NPO関係者</option>
                                <option value="自治体職員" ${userProfile.role === '自治体職員' ? 'selected' : ''}>自治体職員</option>
                                <option value="その他" ${userProfile.role === 'その他' ? 'selected' : ''}>その他</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">経験年数</label>
                            <select id="profile-experience" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">選択してください</option>
                                <option value="1年未満" ${userProfile.experience === '1年未満' ? 'selected' : ''}>1年未満</option>
                                <option value="1-3年" ${userProfile.experience === '1-3年' ? 'selected' : ''}>1-3年</option>
                                <option value="3-5年" ${userProfile.experience === '3-5年' ? 'selected' : ''}>3-5年</option>
                                <option value="5-10年" ${userProfile.experience === '5-10年' ? 'selected' : ''}>5-10年</option>
                                <option value="10年以上" ${userProfile.experience === '10年以上' ? 'selected' : ''}>10年以上</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">居住地</label>
                            <select id="profile-residence" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">選択してください</option>
                                <option value="地域内" ${userProfile.residence === '地域内' ? 'selected' : ''}>地域内（喜茂別町）</option>
                                <option value="近隣地域" ${userProfile.residence === '近隣地域' ? 'selected' : ''}>近隣地域（虻田郡内）</option>
                                <option value="道内" ${userProfile.residence === '道内' ? 'selected' : ''}>北海道内</option>
                                <option value="道外" ${userProfile.residence === '道外' ? 'selected' : ''}>北海道外</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
                        <textarea id="profile-bio" rows="3" 
                                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                  placeholder="簡単な自己紹介をお書きください">${userProfile.bio || ''}</textarea>
                    </div>
                </div>
            </div>
            
            <!-- Skills Section -->
            <div class="card mb-6">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">スキル・専門分野</h2>
                    <p class="text-sm text-muted-foreground">あなたの持つスキルや専門知識を選択してください</p>
                </div>
                <div class="card-content">
                    <div id="skills-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        ${renderSkillCheckboxes(userProfile.skills || [])}
                    </div>
                </div>
            </div>
            
            <!-- Interests Section -->
            <div class="card mb-6">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">興味・関心分野</h2>
                    <p class="text-sm text-muted-foreground">地域活動や社会課題に関する興味のある分野を選択してください</p>
                </div>
                <div class="card-content">
                    <div id="interests-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        ${renderInterestCheckboxes(userProfile.interests || [])}
                    </div>
                </div>
            </div>
            
            <!-- Goals and Aspirations -->
            <div class="card mb-6">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">地域への想い・目標</h2>
                    <p class="text-sm text-muted-foreground">地域に対してどのような貢献をしたいか、どんな暮らしを実現したいかをお聞かせください</p>
                </div>
                <div class="card-content">
                    <div class="grid gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">地域への貢献目標</label>
                            <textarea id="profile-aspirations" rows="4" 
                                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                      placeholder="例：地域の観光振興に貢献したい、移住者のサポートをしたい、農業の活性化に取り組みたい...">${userProfile.aspirations || ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">参加可能な活動レベル</label>
                            <select id="profile-commitment" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">選択してください</option>
                                <option value="情報収集のみ" ${userProfile.commitment === '情報収集のみ' ? 'selected' : ''}>情報収集のみ</option>
                                <option value="時々参加" ${userProfile.commitment === '時々参加' ? 'selected' : ''}>時々参加（月1-2回程度）</option>
                                <option value="定期的参加" ${userProfile.commitment === '定期的参加' ? 'selected' : ''}>定期的参加（週1回程度）</option>
                                <option value="積極的参加" ${userProfile.commitment === '積極的参加' ? 'selected' : ''}>積極的参加（複数活動）</option>
                                <option value="リーダーシップ" ${userProfile.commitment === 'リーダーシップ' ? 'selected' : ''}>リーダーシップを取りたい</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Contact Information -->
            <div class="card mb-6">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">連絡先情報</h2>
                    <p class="text-sm text-muted-foreground">活動の連絡に使用します（任意）</p>
                </div>
                <div class="card-content">
                    <div class="grid gap-4 md:grid-cols-2">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                            <input type="email" id="profile-email" value="${userProfile.email || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                   placeholder="example@example.com">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                            <input type="tel" id="profile-phone" value="${userProfile.phone || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                   placeholder="090-1234-5678">
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4">
                <button onclick="resetProfileForm()" 
                        class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    リセット
                </button>
                <button onclick="saveProfile()" 
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    プロフィールを保存
                </button>
            </div>
        </div>
    `;
}

function renderSkillCheckboxes(selectedSkills) {
    const skills = [
        '農業・農作業', '観光・ホスピタリティ', 'IT・デジタル', 'マーケティング・PR',
        '経営・事業運営', '教育・研修', '医療・福祉', '建築・土木',
        'デザイン・アート', '金融・会計', '法務・行政', '環境・エネルギー',
        '料理・食品加工', '工芸・手作業', 'イベント企画', '通訳・翻訳',
        '写真・映像', '音楽・芸能', 'スポーツ指導', 'カウンセリング'
    ];
    
    return skills.map(skill => `
        <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" value="${skill}" ${selectedSkills.includes(skill) ? 'checked' : ''} 
                   class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="text-sm">${skill}</span>
        </label>
    `).join('');
}

function renderInterestCheckboxes(selectedInterests) {
    const interests = [
        '#移住相談', '#空き家活用', '#観光振興', '#農業振興',
        '#起業支援', '#子育て支援', '#高齢者支援', '#教育・学習',
        '#文化・芸術', '#スポーツ・健康', '#環境保護', '#防災・安全',
        '#コミュニティ', '#イベント企画', '#広報・メディア', '#交通・インフラ',
        '#商工業振興', '#福祉・医療', '#国際交流', '#デジタル化'
    ];
    
    return interests.map(interest => `
        <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" value="${interest}" ${selectedInterests.includes(interest) ? 'checked' : ''} 
                   class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="text-sm">${interest}</span>
        </label>
    `).join('');
}

function saveProfile() {
    const profile = {
        name: document.getElementById('profile-name').value,
        role: document.getElementById('profile-role').value,
        experience: document.getElementById('profile-experience').value,
        residence: document.getElementById('profile-residence').value,
        bio: document.getElementById('profile-bio').value,
        aspirations: document.getElementById('profile-aspirations').value,
        commitment: document.getElementById('profile-commitment').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value,
        skills: Array.from(document.querySelectorAll('#skills-grid input:checked')).map(input => input.value),
        interests: Array.from(document.querySelectorAll('#interests-grid input:checked')).map(input => input.value),
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('user.profile', JSON.stringify(profile));
    
    // Show success message
    showNotification('プロフィールを保存しました！', 'success');
    
    // Update appState if needed
    if (appState.userProfile) {
        Object.assign(appState.userProfile, profile);
        saveData();
    }
}

function getUserProfile() {
    const stored = localStorage.getItem('user.profile');
    return stored ? JSON.parse(stored) : {};
}

function resetProfileForm() {
    if (confirm('入力内容をリセットしますか？未保存の変更は失われます。')) {
        localStorage.removeItem('user.profile');
        renderProfile(document.getElementById('main-content'));
        showNotification('プロフィールをリセットしました', 'info');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set color based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Expose to global scope
window.renderProfile = renderProfile;
window.saveProfile = saveProfile;
window.getUserProfile = getUserProfile;
window.resetProfileForm = resetProfileForm;
window.showNotification = showNotification;