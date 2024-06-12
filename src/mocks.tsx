import axios from 'axios';
import { useMockingjson } from 'mockingjson';

const apiUrl = import.meta.env.VITE_API_URL;
const setMock = import.meta.env.VITE_MOCK;

const gameApi = axios.create({
  baseURL: apiUrl,
});

if (setMock) {
  console.log('Using mock API');
  gameApi.interceptors.request.use(useMockingjson);
}

export default gameApi;