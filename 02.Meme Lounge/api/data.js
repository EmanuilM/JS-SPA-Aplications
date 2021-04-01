import * as api from './api.js';


const register = api.register;
const login = api.login;
const logout = api.logout;

    const getAllMemes = async () => await api.GET('/data/memes?sortBy=_createdOn%20desc');
    const getDetailsById = async (id) => await api.GET(`/data/memes/${id}`);
    const createMemeData = async (data) => await api.POST('/data/memes' , data);
    const editMemeById =   async (id,body) => await api.PUT(`/data/memes/${id}` , body);
    const deleteMemeById = async (id) => await api.DELETE(`/data/memes/${id}`);
    const getUserData =  async (id) => await api.GET(`/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);



 export { 
     register,
     login,
     logout,
     getAllMemes,
     getDetailsById,
     createMemeData,
     editMemeById,
     deleteMemeById,
     getUserData,
 }