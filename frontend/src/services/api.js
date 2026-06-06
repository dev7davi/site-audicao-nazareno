import axios from 'axios';

// Em produção (HostGator), usa o caminho absoluto do PHP.
// Em dev (local), aponta para o servidor PHP local na porta 8000.
const isProd = import.meta.env.PROD;
const baseURL = isProd ? 'https://techferrari.com/audicao_tm/api' : 'http://localhost:8000/api';

export const api = axios.create({
  baseURL,
});
