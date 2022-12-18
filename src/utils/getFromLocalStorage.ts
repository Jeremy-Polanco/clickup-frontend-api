import { isJsonString } from './index';

const getFromLocalStorage = (localStorageName: string) => {
  const localStorageItem: any = localStorage.getItem(localStorageName);

  if (isJsonString(localStorageItem)) {
    return JSON.parse(localStorageItem);
  }

  return localStorageItem;
};

export default getFromLocalStorage;
