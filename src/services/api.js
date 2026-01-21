import axios from 'axios';
import { triggerSwal } from '../functions/swal';

const token = localStorage.getItem('token');

const url =
  window.location.hostname == 'localhost'
    ? `http://${window.location.hostname}/`
    : `https://api${window.location.hostname.includes('rcmkt') ? '' : ''}${window.location.hostname
    }/`;

const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: token ? token : '',
  },
});

// Add a response interceptor
api.interceptors.response.use(
  function ({ data: success, data }) {
    if (!success) {
      if (typeof data.message == 'string') {
        triggerSwal(data.message, '', 'error');

        return Promise.reject(data.message);
      }

      if (typeof data == 'object') {
        let message = '';

        for (const propriedade in data) {
          if (Array.isArray(data[propriedade])) {
            // Verifica se a propriedade é um array
            for (const string of data[propriedade]) {
              message += string + '\n'; // Adiciona a string e uma quebra de linha
            }
          }
        }

        triggerSwal(message, '', 'error');

        return Promise.reject(message);
      }

      triggerSwal('Ocorreu um erro.', '', 'error');
    }

    return data.data;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/login/';

      return Promise.reject('Acesso negado');
    }
    if (error.response.data.data != null) {
      const data = error.response.data.data;

      if (typeof data.message == 'string') {
        if (data.message == 'Acesso negado.') {
          window.location.href = '/login/';

          return Promise.reject(data.message);
        }

        triggerSwal(data.message, '', 'error');

        return Promise.reject(data.message);
      }

      if (typeof data == 'object') {
        let message = '';

        for (const propriedade in data) {
          if (Array.isArray(data[propriedade])) {
            // Verifica se a propriedade é um array
            for (const string of data[propriedade]) {
              message += string + '\n'; // Adiciona a string e uma quebra de linha
            }
          }
        }

        triggerSwal(message, '', 'error');

        return Promise.reject(message);
      }
    }
    triggerSwal('Ocorreu um erro.', '', 'error');

    return Promise.reject(error);
  }
);

export default api;
