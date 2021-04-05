import { render, html } from '../node_modules/lit-html/lit-html.js'
import {homePageView} from './homePage.js'
const main = document.querySelector('.container');

const registerTemplete = () => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${register}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`

async function register(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    const response = await fetch(`http://localhost:3030/users/register`  , 
    {
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({email,password,rePass})

    }
    )

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


export async function registerView() { 
    render(registerTemplete() , main)
}


