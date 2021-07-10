const useLocalStorage = () => {
  const setDataInLocalStorage = (key: string, data: any) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const retriveDataFromLocalStorage = (key: string) => {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  };

  const clearLocalStorage = () => window.localStorage.clear();

  const removeKey = (key: string) => {
    window.localStorage.removeItem(key);
  };

  return {
    setDataInLocalStorage,
    retriveDataFromLocalStorage,
    clearLocalStorage,
    removeKey,
  };
};

export default useLocalStorage;
