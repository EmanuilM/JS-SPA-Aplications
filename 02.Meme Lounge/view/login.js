import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {login} from '../api/data.js';
import {notify} from '../src/notification.js';

const main = document.querySelector('main');

const loginPageTemplate = () => html`
<form @submit=${onSubmit} id="login-form">
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="#">Sign up</a>.</p>
        </div>
    </div>
</form>
</section>`

async function onSubmit(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if(email === '' || password === '' )  {
        return notify('All fields are reuired!');
    }
    await login(email,password);
    page.redirect('/memes');
}



export async function LoginPageView() {
        render(loginPageTemplate(), main)
}