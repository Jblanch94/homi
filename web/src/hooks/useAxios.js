const useAxios = (axiosInstance) => {
  const postRequest = (url, data, config) => {
    return axiosInstance.post(url, data, config);
  };

  const getRequest = (url, config) => {
    return axiosInstance.get(url, config);
  };

  const deleteRequest = (url, config) => {
    return axiosInstance.delete(url, config);
  };

  const updateRequest = (url, data, config) => {
    return axiosInstance.patch(url, data, config);
  };

  return { postRequest, getRequest, deleteRequest, updateRequest };
};

export default useAxios;
