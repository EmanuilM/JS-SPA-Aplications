import { render, html, reparentNodes } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { register } from '../api/data.js';
import {notify} from '../src/notification.js';
const main = document.querySelector('main');

const registerTemplate = () => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`



async function onSubmit(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const rePass = formData.get('repeatPass');
    const gender = 'Male';
    
    if(password !== rePass) { 
        return notify('Passwords must match!');
    }

    if(email === '' || password === '' || rePass === '' || username === '') { 
        return notify('All fields are reuqired!');
    }
   
    await register(username,email,password,gender);
    //redirect to all meme page
    page.redirect('/memes');

}


export async function registerPageView() {
    render(registerTemplate(), main)
}