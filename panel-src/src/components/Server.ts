import axios from 'axios';

namespace Server {
  const http = axios.create({
    baseURL: 'api',
  });
  let notify = [];

  export function attach(callback: (state: boolean) => void) {
  }


  export function login(login: string, password: string) {
  }

  export function tree() {
  }
}

export default Server;
