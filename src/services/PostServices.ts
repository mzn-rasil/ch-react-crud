import { AxiosError } from 'axios';
import http from '../axios/http-common';

const getByUserId = async (id: number) => {
  try {
    const { data } = await http.get(`/users/${id}/posts`);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export { getByUserId };
