import { AxiosInstance, AxiosRequestConfig } from 'axios'

const useAxios = (axiosInstance: AxiosInstance) => {
  const postRequest = (
    url: string,
    data: any = {},
    config?: AxiosRequestConfig
  ) => {
    console.log(url)
    return axiosInstance.post(url, data, config)
  }

  const getRequest = (url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get(url, config)
  }

  const deleteRequest = (url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.delete(url, config)
  }

  const updateRequest = (
    url: string,
    data: any = {},
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.patch(url, data, config)
  }

  return { postRequest, getRequest, deleteRequest, updateRequest }
}

export default useAxios
