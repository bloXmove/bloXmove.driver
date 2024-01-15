import axios from 'axios';
import {PAYMENT_URL} from '../../../../lib/config';

const api = axios.create({
  baseURL: PAYMENT_URL,
});
export default api;
