import { render, html } from '../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js'
const main = document.querySelector('#main-content');

const loginPageTemplate = (onSubmit) => html`
 <section id="login-page" class="content auth">
            <h1>Login</h1>

            <form @submit=${onSubmit} id="login" action="#" method="">
                <fieldset>
                    <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                        increase in quantity and, hopefully, in value</blockquote>
                    <p class="field email">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="maria@email.com">
                    </p>
                    <p class="field password">
                        <label for="login-pass">Password:</label>
                        <input type="password" id="login-pass" name="password">
                    </p>
                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Log in">
                    </p>
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`


export async function loginPageView(ctx) {
    render(loginPageTemplate(onSubmit), main)

    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        if(email === '' || password === '') { 
            return alert('All fields are required!');
        }
        await login(email,password);
        ctx.page.redirect('/');
    }
}