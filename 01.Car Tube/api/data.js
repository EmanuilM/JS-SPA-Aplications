import * as api from './api.js';


const register = api.register;
const login = api.login;
const logout = api.logout;

    const getDataCars = async () => await api.GET('/data/cars?sortBy=_createdOn%20desc');
    const getCollectionSize = async () => await api.GET('/data/cars?count');
    const getCarById = async (id) => await api.GET(`/data/cars/${id}`);
    const createCar = async (body) => await api.POST('/data/cars' , body);
    const deleteCarById = async (id) => await api.DELETE(`/data/cars/${id}`);
    const editCarInfo = async (id,body) => await api.PUT(`/data/cars/${id}` , body);
    const getUserData = async (id) => await api.GET(`/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
    const searchCars = async (query) => await api.GET(`/data/cars?where=year%3D${query}`);
    


 export { 
     register,
     login,
     logout,
     getDataCars,
     getCarById,
     createCar,
     deleteCarById,
     editCarInfo,
     getUserData,
     searchCars,
     getCollectionSize,
 }