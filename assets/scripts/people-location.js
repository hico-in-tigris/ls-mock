// ===============================
// LocalSuccess - People Location Module
// ===============================
// Purpose: Geographical location management for people

(function(){
'use strict';

/**
 * Get current device location and populate form fields
 */
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('このブラウザでは位置情報を取得できません');
        return;
    }
    
    const latInput = document.getElementById('edit-person-lat');
    const lngInput = document.getElementById('edit-person-lng');
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            latInput.value = position.coords.latitude.toFixed(6);
            lngInput.value = position.coords.longitude.toFixed(6);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
            successMessage.textContent = '現在地を取得しました';
            document.body.appendChild(successMessage);
            setTimeout(() => successMessage.remove(), 2000);
        },
        function(error) {
            alert('位置情報の取得に失敗しました: ' + error.message);
        }
    );
}

/**
 * Add location information to a person
 * @param {number} personId - Person ID
 */
function addLocationToPerson(personId) {
    const person = sampleData.people.find(p => p.id === personId);
    if (!person) return;
    
    const location = prompt(`${getMaskedName(person.name)}さんの位置情報を入力してください。\n\n形式: 地域内/地域外, 住所, 目印\n例: 地域内, 北海道虻田郡喜茂別町字喜茂別123, 喜茂別駅から徒歩5分`);
    
    if (location) {
        const parts = location.split(',').map(s => s.trim());
        if (parts.length >= 3) {
            person.location = {
                area: parts[0],
                address: parts[1],
                landmark: parts[2],
                lat: 42.8329 + (Math.random() - 0.5) * 0.1, // Random position around Kimobetsu
                lng: 140.9689 + (Math.random() - 0.5) * 0.1
            };
            
            saveData();
            window.refreshPeopleContent();
            alert('位置情報を登録しました！');
        } else {
            alert('正しい形式で入力してください。');
        }
    }
}

/**
 * Open map page with location highlighted
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 */
function openMapWithLocation(lat, lng) {
    // Save the location to highlight on map
    sessionStorage.setItem('highlightLocation', JSON.stringify({ lat, lng }));
    
    // Navigate to map page
    window.location.hash = '#map';
    if (window.closePersonDetail) {
        window.closePersonDetail();
    }
}

// Public API
window.PeopleLocation = {
    getCurrentLocation,
    addLocationToPerson,
    openMapWithLocation
};

// Backward compatibility
window.getCurrentLocation = getCurrentLocation;
window.addLocationToPerson = addLocationToPerson;
window.openMapWithLocation = openMapWithLocation;

})();
