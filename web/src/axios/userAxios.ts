import axios from 'axios'

export default axios.create({
  baseURL: '/homi/api/v1/user',
  headers: {
    'content-type': 'application/json',
  },
})
