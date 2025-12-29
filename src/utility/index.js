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
 * This function will update stored params if new ones are found in the URL.
 */
const captureInitialQueryParams = () => {
  if (typeof window === 'undefined') return {};
  
  // Capture current query parameters from URL
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = {};
  for (const [key, value] of searchParams.entries()) {
    urlParams[key] = value;
  }
  
  // Check if we've already captured params in this session
  const stored = sessionStorage.getItem('initialQueryParams');
  let storedParams = {};
  
  if (stored) {
    storedParams = JSON.parse(stored);
  }
  
  // If URL has params, merge them with stored params (URL params take precedence)
  // This handles cases where params appear after initial load
  const mergedParams = { ...storedParams, ...urlParams };
  
  // Store in sessionStorage if we have any params (either from URL or previously stored)
  if (Object.keys(mergedParams).length > 0) {
    sessionStorage.setItem('initialQueryParams', JSON.stringify(mergedParams));
    return mergedParams;
  }
  
  return storedParams;
};

/**
 * Gets a query parameter value, preferring the initially captured value.
 * Falls back to current location.search if initial params weren't captured.
 * This function will also try to capture params from the URL if they exist but weren't stored.
 * @param {string} paramName - The name of the query parameter
 * @param {string} currentSearch - The current location.search string (optional)
 * @returns {string|undefined} The parameter value or undefined if not found
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
  
  // If not found in stored params, check current URL and try to capture
  // This handles cases where params are in URL but weren't captured initially
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get(paramName);
    if (value !== null) {
      // Found in URL but not stored - capture it now
      const currentParams = stored ? JSON.parse(stored) : {};
      currentParams[paramName] = value;
      sessionStorage.setItem('initialQueryParams', JSON.stringify(currentParams));
      return value;
    }
  }
  
  // Fallback to current search params if provided
  if (currentSearch) {
    const searchParams = new URLSearchParams(currentSearch);
    const value = searchParams.get(paramName);
    if (value !== null) {
      // Found in currentSearch but not stored - capture it now
      const currentParams = stored ? JSON.parse(stored) : {};
      currentParams[paramName] = value;
      sessionStorage.setItem('initialQueryParams', JSON.stringify(currentParams));
      return value;
    }
  }
  
  return undefined;
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
