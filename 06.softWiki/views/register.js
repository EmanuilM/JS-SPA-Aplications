import { render, html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js'
const main = document.querySelector('#main-content');

const registerPageTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
            <h1>Register</h1>

            <form @submit=${onSubmit} id="register" action="#" method="">
                <fieldset>
                    <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                        It
                        increases by diffusion and grows by dispersion.</blockquote>
                    <p class="field email">
                        <label for="register-email">Email:</label>
                        <input type="email" id="register-email" name="email" placeholder="maria@email.com">
                    </p>
                    <p class="field password">
                        <label for="register-pass">Password:</label>
                        <input type="password" name="password" id="register-pass">
                    </p>
                    <p class="field password">
                        <label for="register-rep-pass">Repeat password:</label>
                        <input type="password" name="rep-pass" id="register-rep-pass">
                    </p>
                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Register">
                    </p>
                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`






export async function registerPageView(ctx) {
    render(registerPageTemplate(onSubmit), main)

    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rep-pass');
        if(email === '' || password === '' || rePass === '') { 
            return alert('All fields are required!');
        }
        await register(email,password);
        ctx.page.redirect('/');
    }
}