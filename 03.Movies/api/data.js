import * as api from './api.js';


const register = api.register;
const login = api.login;
const logout = api.logout;

    const getAllMovies = async () => await api.GET('/data/movies');
    const getMovieById = async (id) => await api.GET(`/data/movies/${id}`);
    const createMovie = async (body) => await api.POST(`/data/movies` , body);
    const deleteMovieById = async (id) => await api.DELETE(`/data/movies/${id}`);
    const editMovieById = async (id,body) => await api.PUT(`/data/movies/${id}`,body);
    const getNumberOfLikes = async (id) => await api.GET(`/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count `);
    const addLike = async (userId) => await api.POST(`/data/likes` , userId );

    




 export { 
     register,
     login,
     logout,
     getAllMovies,
     getMovieById,
     createMovie,
     deleteMovieById,
     editMovieById,
     getNumberOfLikes,
     addLike,
 }