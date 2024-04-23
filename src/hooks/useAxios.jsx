import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAxios = () => {
    const { LogOut } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = axios.create({
        baseURL: 'https://student-networking-server.vercel.app',
    });

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await LogOut();
                    navigate('/');
                }
                return Promise.reject(error);
            }
        );
    }, [LogOut, navigate, axiosSecure]);

    return [axiosSecure];
};

export default useAxios;