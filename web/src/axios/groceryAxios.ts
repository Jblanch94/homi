import axios from 'axios'

export default axios.create({
  baseURL: '/homi/api/v1/grocery',
  headers: {
    'content-type': 'application/json',
  },
})
