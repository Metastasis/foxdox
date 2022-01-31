import axios from 'axios';

const KRATOS_API = 'http://127.0.0.1:4433';

export function register() {
  const headers = {'Accept': 'application/json'};
  return axios.get(`${KRATOS_API}/self-service/registration/browser`, {headers})
    .then(res => {
      console.log(res.data);
      return res.data as any;
    });
}
