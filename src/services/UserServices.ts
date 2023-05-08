import { AxiosError } from 'axios';
import http from '../axios/http-common';
import { IUser } from '../components/table/UsersTable';

const getAll = async () => {
  try {
    const res = await http.get('/users');
    return res.data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

const getById = async (id: number) => {
  try {
    const { data } = await http.get(`/users/${id}`);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

const create = async (user: IUser) => {
  try {
    await http.post('/users', user);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const update = async (id: number, updatedUser: IUser) => {
  try {
    await http.patch(`/users/${id}`, updatedUser);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const remove = async (id: number) => {
  try {
    await http.delete(`/users/${id}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getAll, getById, create, update, remove };
