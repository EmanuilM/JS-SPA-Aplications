import {render , html} from '../node_modules/lit-html/lit-html.js';
import {register} from '../api/data.js';
const main = document.querySelector('main');

const registerPageTemplate = (onSubmit) => html`
<section id="form-sign-up">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="post">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    </section>
`



export async function registerPageView(ctx) { 
    render(registerPageTemplate(onSubmit) , main);
    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('repeatPassword');
        if(password.length < 6) { 
            return alert('Password must be at least 6 characters long!');
        }
        if(email === '' || password === '' || rePass === '') { 
            return alert('All fields are required!');
        }
        if(password !== rePass) { 
            return alert('Password do not match!');

        }
        await register(email,password);
        ctx.page.redirect('/');
    }
}