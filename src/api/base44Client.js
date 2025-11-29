import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "69256516596df3603b71178a", 
  requiresAuth: true // Ensure authentication is required for all operations
});
