import axios from 'axios';
import {TEST_API_URL} from '@app/src/lib/config';

const api = axios.create({
  baseURL: TEST_API_URL,
});
export default api;
