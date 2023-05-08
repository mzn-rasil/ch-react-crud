import axios, { AxiosError } from 'axios';
import { ILoginUser } from '../pages/Login';

const BASE_URL = 'https://fakestoreapi.com';

const postLoginUser = async (user: ILoginUser) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export { postLoginUser };
