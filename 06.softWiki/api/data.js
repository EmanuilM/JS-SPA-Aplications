import * as api from './api.js';


const register = api.register;
const login = api.login;
const logout = api.logout;

    const getAllArticles = async () => await api.GET('/data/wiki?sortBy=_createdOn%20desc&distinct=category');
    const getDetailsById = async (id) => await api.GET(`/data/wiki/${id}`);
    const createArticle = async (body) => await api.POST('/data/wiki' , body);
    const catalogData = async () => await api.GET('/data/wiki?sortBy=_createdOn%20desc');
    const editArticle = async (id,body) => await api.PUT(`/data/wiki/${id}` , body);
    const deleteArticleById = async (id) => await api.DELETE(`/data/wiki/${id}`);
    const search = async (query) => await api.GET(`/data/wiki?where=title%20LIKE%20%22${query}%22`);






 export { 
     register,
     login,
     logout,
     getAllArticles,
     getDetailsById,
     createArticle,
     catalogData,
     editArticle,
     deleteArticleById,
     search,
 }