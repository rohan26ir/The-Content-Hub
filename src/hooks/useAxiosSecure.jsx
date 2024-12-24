import axios from 'axios'
import { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

  useEffect(() => {
    axiosSecure.interceptors.request.use(config => {
      // Add any request interceptors here
      return config
    })

    axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        const { status } = error.response || {}
        if (status === 401 || status === 403) {
          await logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])

  return axiosSecure
}

export default useAxiosSecure ;
