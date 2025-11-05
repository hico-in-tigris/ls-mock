// ===============================
// LocalSuccess - Network Stats Module
// ===============================
// Purpose: Statistical calculations for relationship management

(function(){
'use strict';

/**
 * Get all unique tags from people
 * @returns {string[]} Sorted array of unique tags
 */
function getAllTags() {
    const allTags = new Set();
    sampleData.people.forEach(person => {
        person.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
}

/**
 * Calculate relationship statistics
 * @returns {Object} Statistics object with active, strong, needsFollow counts
 */
function getRelationshipStats() {
    const now = new Date();
    const people = sampleData.people;
    
    let active = 0;
    let strong = 0;
    let needsFollow = 0;
    let recent = 0;
    let totalDuration = 0;
    
    people.forEach(person => {
        const daysSinceContact = daysSince(person.lastContact);
        const relationshipStrength = getRelationshipStrength(person);
        
        if (daysSinceContact <= 30) active++;
        if (relationshipStrength === 'strong') strong++;
        if (daysSinceContact > 14) needsFollow++;
        if (daysSinceContact <= 7) recent++;
        
        // Assume 6 months average relationship duration for demo
        totalDuration += 6;
    });
    
    return {
        active,
        strong,
        needsFollow,
        recent,
        weeklyContacts: recent,
        avgDuration: Math.round(totalDuration / people.length)
    };
}

/**
 * Determine relationship strength based on contact frequency
 * @param {Object} person - Person object
 * @returns {string} 'strong', 'medium', or 'weak'
 */
function getRelationshipStrength(person) {
    const daysSinceContact = daysSince(person.lastContact);
    if (daysSinceContact <= 14) return 'strong';
    if (daysSinceContact <= 30) return 'medium';
    return 'weak';
}

/**
 * Get urgency level based on days since contact
 * @param {number} daysSinceContact - Days since last contact
 * @returns {string} 'high', 'medium', or 'low'
 */
function getUrgencyLevel(daysSinceContact) {
    if (daysSinceContact > 30) return 'high';
    if (daysSinceContact > 14) return 'medium';
    return 'low';
}

// Public API
window.NetworkStats = {
    getAllTags,
    getRelationshipStats,
    getRelationshipStrength,
    getUrgencyLevel
};

// Backward compatibility
window.getAllTags = getAllTags;
window.getRelationshipStats = getRelationshipStats;
window.getRelationshipStrength = getRelationshipStrength;
window.getUrgencyLevel = getUrgencyLevel;

})();
