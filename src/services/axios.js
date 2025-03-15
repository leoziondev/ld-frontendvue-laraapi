import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json', 
      // Se precisar adicionar tokens ou autenticação, pode ser feito aqui
      // 'Authorization': 'Bearer seu_token'
    }
  });
  
  export default api;