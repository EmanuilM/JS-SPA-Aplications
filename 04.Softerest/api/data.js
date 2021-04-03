import * as api from './api.js';


const register = api.register;
const login = api.login;
const logout = api.logout;

    const getData = () => api.GET('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    const createData = (data) => api.POST('/data/ideas' , data);
    const getDataByID = (id) => api.GET(`/data/ideas/${id}`);
    const deleteDataById = (id) => api.DELETE(`/data/ideas/${id}`);



 export { 
     register,
     login,
     logout,
     getData,
     createData,
     getDataByID,
     deleteDataById,
 }