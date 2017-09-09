import Vue from 'vue';
import axios from 'axios';

export default function (token) {
  return axios.post('/api/users/login', {
    id_token: token
  })
}
