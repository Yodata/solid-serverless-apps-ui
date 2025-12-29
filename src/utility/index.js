const convertToFranchiseStore = (id) => {
  return id.split("//")[1].split(".")[0].split("-")[0];
};

const modifyStoreWithLocalStore = (allApps, localStore) => {
    localStore.application.forEach(local => {
        const appIndex = allApps.application.findIndex(ele => local.id === ele.id)
        allApps.application[appIndex] = {...allApps.application[appIndex], isFranchiseUser: local.isFranchiseUser}
      })

}

/**
 * Captures and stores initial query parameters from the URL.
 * This is necessary because Salesforce may rewrite the iframe URL and remove query parameters.
 * We capture them immediately on app load and store them in sessionStorage.
 */
const captureInitialQueryParams = () => {
  if (typeof window === 'undefined') return;
  
  // Check if we've already captured the params in this session
  const stored = sessionStorage.getItem('initialQueryParams');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Capture current query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  // Store in sessionStorage for persistence across re-renders
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem('initialQueryParams', JSON.stringify(params));
  }
  
  return params;
};

/**
 * Gets a query parameter value, preferring the initially captured value.
 * Falls back to current location.search if initial params weren't captured.
 * @param {string} paramName - The name of the query parameter
 * @param {string} currentSearch - The current location.search string (optional)
 * @returns {string|null} The parameter value or null if not found
 */
const getQueryParam = (paramName, currentSearch = null) => {
  // First, try to get from stored initial params
  const stored = sessionStorage.getItem('initialQueryParams');
  if (stored) {
    const params = JSON.parse(stored);
    if (params[paramName]) {
      return params[paramName];
    }
  }
  
  // Fallback to current search params if provided
  if (currentSearch) {
    const searchParams = new URLSearchParams(currentSearch);
    return searchParams.get(paramName);
  }
  
  // Last resort: try current window location
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(paramName);
  }
  
  return null;
};

/**
 * Gets all query parameters, preferring the initially captured values.
 * @param {string} currentSearch - The current location.search string (optional)
 * @returns {Object} Object with all query parameters
 */
const getAllQueryParams = (currentSearch = null) => {
  // First, try to get from stored initial params
  const stored = sessionStorage.getItem('initialQueryParams');
  if (stored) {
    const params = JSON.parse(stored);
    if (Object.keys(params).length > 0) {
      return params;
    }
  }
  
  // Fallback to current search params if provided
  if (currentSearch) {
    const searchParams = new URLSearchParams(currentSearch);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }
  
  // Last resort: try current window location
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }
  
  return {};
};

export { 
  convertToFranchiseStore, 
  modifyStoreWithLocalStore,
  captureInitialQueryParams,
  getQueryParam,
  getAllQueryParams
};
