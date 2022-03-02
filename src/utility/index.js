const convertToFranchiseStore = (id) => {
  return id.split("//")[1].split(".")[0].split("-")[0];
};

const modifyStoreWithLocalStore = (allApps, localStore) => {
    localStore.application.forEach(local => {
        const appIndex = allApps.application.findIndex(ele => local.id === ele.id)
        allApps.application[appIndex] = {...allApps.application[appIndex], isFranchiseUser: local.isFranchiseUser}
      })

}

export { convertToFranchiseStore, modifyStoreWithLocalStore };
