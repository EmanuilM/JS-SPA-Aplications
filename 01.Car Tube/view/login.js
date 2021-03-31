import { render, html } from '../node_modules/lit-html/lit-html.js';
import {login} from '../api/data.js';
const main = document.querySelector('main');

const loginPageTemplate = (onSubmit) => html`

        <section id="login">
            <div class="container">
                <form @submit=${onSubmit} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>
        
                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">
        
                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>
`


export async function loginPageView(ctx) {
    render(loginPageTemplate(onSubmit), main)

    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        if(username === '' || password === '') { 
            return alert('All fields are reuqired!');
        }
        await login(username,password);
        ctx.page.redirect('/');
    }
}