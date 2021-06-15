const useLocalStorage = () => {
  const setDataInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const retriveDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  };

  const clearLocalStorage = () => localStorage.clear();

  const removeKey = (key) => {
    localStorage.removeItem(key);
  };

  return {
    setDataInLocalStorage,
    retriveDataFromLocalStorage,
    clearLocalStorage,
    removeKey,
  };
};

export default useLocalStorage;
