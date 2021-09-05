import axios from 'axios'

export default axios.create({
  baseURL: '/homi/api/v1/task',
  headers: {
    'content-type': 'application/json',
  },
})
