import { render, html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
const main = document.querySelector('main');

const registerPageTemplate = (onSubmit) => html`

    <section id="register">
        <div class="container">
            <form @submit=${onSubmit} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
    
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
    
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
    
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
`


export async function registerPageView(ctx) {
    render(registerPageTemplate(onSubmit), main)

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const rePass = formData.get('repeatPass');

        if(password !== rePass) { 
            return alert('Password do not match!');
        }

        if(username === '' || password === '' || rePass === '') { 
            return alert('All fields are reuqired!');
        }
        await register(username, password);
        ctx.page.redirect('/');
    }
}