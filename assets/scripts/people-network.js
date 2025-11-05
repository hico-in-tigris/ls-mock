// ===============================
// LocalSuccess - People Network Module  
// ===============================
// Purpose: Network visualization logic

(function(){
'use strict';

/**
 * Generate network positioning data for people
 * @param {Array} people - People to visualize
 * @returns {Array} People with x,y coordinates
 */
function generateNetworkData(people) {
    return people.map((person, index) => {
        const angle = (index / people.length) * 2 * Math.PI;
        const radius = 35; // 35% from center
        const x = 50 + radius * Math.cos(angle); // 50% is center
        const y = 50 + radius * Math.sin(angle);
        
        return {
            ...person,
            x: Math.max(5, Math.min(85, x)), // Keep within bounds
            y: Math.max(5, Math.min(85, y))
        };
    });
}

// Public API
window.PeopleNetwork = {
    generateNetworkData
};

// Backward compatibility
window.generateNetworkData = generateNetworkData;

})();
