const useLocalStorage = () => {
  const setDataInLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const retriveDataFromLocalStorage = (key) => {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  };

  const clearLocalStorage = () => window.localStorage.clear();

  const removeKey = (key) => {
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
