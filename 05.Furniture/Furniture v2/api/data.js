import * as api from './api.js';


const register = api.register;
const login = api.login;
const logout = api.logout;

 const getData = () => api.GET('/data/catalog');
 const detailsData = (id) => api.GET(`/data/catalog/${id}`);
 const deleteItem = (id) => api.DELETE(`/data/catalog/${id}`);
 const createItem = (data) => api.POST(`/data/catalog` , data);
 const getMyItems = (id) => api.GET(`/data/catalog?where=_ownerId%3D%22${id}%22`);
 const editItem = (id,body) => api.PUT(`/data/catalog/${id}` , body)


 export { 
     getData,
     detailsData,
     register,
     deleteItem,
     createItem,
     getMyItems,
     login,
     logout,
     editItem,
 }