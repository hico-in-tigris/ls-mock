// ===============================
// LocalSuccess - Profile Module
// ===============================

function renderProfile(container) {
    const userProfile = getUserProfile();
    
    container.innerHTML = `
        <div class="animate-fade-in">
            ${createHeaderCard({
                title: 'プロフィール設定',
                description: 'あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。'
            })}
            
            <!-- Basic Information -->
            ${createCard({
                header: {
                    title: '基本情報',
                    description: '名前、職業、経験年数などの基本的な情報'
                },
                content: `
                    <div class="grid gap-6 md:grid-cols-2">
                        ${createFormGroup({
                            label: '名前',
                            children: createFormField({
                                type: 'text',
                                id: 'profile-name',
                                value: userProfile.name || '',
                                placeholder: '山田 太郎'
                            })
                        })}
                        ${createFormGroup({
                            label: '職業・立場',
                            children: createSelect({
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
                                selectedValue: userProfile.role || ''
                            })
                        })}
                        ${createFormGroup({
                            label: '経験年数',
                            children: createSelect({
                                id: 'profile-experience',
                                placeholder: '選択してください',
                                options: [
                                    { value: '1年未満', label: '1年未満' },
                                    { value: '1-3年', label: '1-3年' },
                                    { value: '3-5年', label: '3-5年' },
                                    { value: '5-10年', label: '5-10年' },
                                    { value: '10年以上', label: '10年以上' }
                                ],
                                selectedValue: userProfile.experience || ''
                            })
                        })}
                        ${createFormGroup({
                            label: '居住地',
                            children: createSelect({
                                id: 'profile-residence',
                                placeholder: '選択してください',
                                options: [
                                    { value: '地域内', label: '地域内（喜茂別町）' },
                                    { value: '近隣地域', label: '近隣地域（虻田郡内）' },
                                    { value: '道内', label: '北海道内' },
                                    { value: '道外', label: '北海道外' }
                                ],
                                selectedValue: userProfile.residence || ''
                            })
                        })}
                    </div>
                    
                    ${createFormGroup({
                        label: '自己紹介',
                        children: createTextArea({
                            id: 'profile-bio',
                            rows: 3,
                            placeholder: '簡単な自己紹介をお書きください',
                            value: userProfile.bio || ''
                        })
                    })}
                `
            })}
            
            <!-- Skills Section -->
            ${createCard({
                header: {
                    title: 'スキル・専門分野',
                    description: 'あなたの持つスキルや専門知識を選択してください'
                },
                content: `
                    <div id="skills-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        ${renderSkillCheckboxes(userProfile.skills || [])}
                    </div>
                `
            })}
            
            <!-- Interests Section -->
            ${createCard({
                header: {
                    title: '興味・関心分野',
                    description: '地域活動や社会課題に関する興味のある分野を選択してください'
                },
                content: `
                    <div id="interests-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        ${renderInterestCheckboxes(userProfile.interests || [])}
                    </div>
                `
            })}
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
                ${createButton({
                    text: 'リセット',
                    variant: 'secondary',
                    onClick: 'resetProfileForm()'
                })}
                ${createButton({
                    text: 'プロフィールを保存',
                    variant: 'primary',
                    onClick: 'saveProfile()'
                })}
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