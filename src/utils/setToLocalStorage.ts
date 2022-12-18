type LocalStorageItem = {
  keyName: string;
  value: any;
};

const setToLocalStorage = (newLocalStorageItem: LocalStorageItem): void => {
  const { keyName, value } = newLocalStorageItem;

  if (
    typeof value === 'object' ||
    (typeof value === 'number' && typeof value !== 'string')
  ) {
    localStorage.setItem(keyName, JSON.stringify(value));
    return;
  }

  localStorage.setItem(keyName, value);
};

export default setToLocalStorage;
