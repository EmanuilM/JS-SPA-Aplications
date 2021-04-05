import { render, html } from '../node_modules/lit-html/lit-html.js'
import {homePageView} from './homePage.js'
const main = document.querySelector('.container');


const loginTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${login} >
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`


export async function login(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const response = await fetch(`http://localhost:3030/users/login` , 
    {
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({email,password}),
    }
    );
    if(!response.ok) { 
        const error = await response.json();
        alert(error.message);
        throw Error(error.message);
    }
    
    const data = await response.json();
    sessionStorage.setItem('userToken' , data.accessToken);
    sessionStorage.setItem('userId' , data._id);
    homePageView();
}

export async function loginView() { 
    render(loginTemplate() , main);
}
