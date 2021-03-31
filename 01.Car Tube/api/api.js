const host = "http://localhost:3030"
async function request(url, options) {
    const response = await fetch(url, options);

    if (response.ok == false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    try {
        return await response.json();
    } catch (err) {
        return response;
    }
}
function initializeOptions(method = "GET", body) {
    const options = {
        method,
        headers: {}
    }
    const token = sessionStorage.getItem("userToken")
    if (token !== null) {
        options.headers["X-Authorization"] = token;
    }
    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    return options;
}
const GET = async (url) => await request(host + url, initializeOptions())
const POST = async (url, data) => await request(host + url, initializeOptions("POST", data))
const PUT = async (url, data) => await request(host + url, initializeOptions("PUT", data))
const DELETE = async (url) => await request(host + url, initializeOptions("DELETE"))
const login = async (username, password) => {
    const user = await POST("/users/login", { username, password });
    sessionStorage.setItem("user", user.username);
    sessionStorage.setItem("_id", user._id);
    sessionStorage.setItem('userToken', user.accessToken);
    return user;
}
const register = async (username, password) => {
    const user = await POST("/users/register", { username, password });
    sessionStorage.setItem("user", user.username);
    sessionStorage.setItem("_id", user._id);
    sessionStorage.setItem("userToken", user.accessToken);
    return user;
}
const logout = async () => {
    await GET("/users/logout");
    sessionStorage.clear();
}
export {
    GET,
    POST,
    PUT,
    DELETE,
    login,
    register,
    logout,
}