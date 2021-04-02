import page from '../node_modules/page/page.mjs';
import {homePageView} from '../views/home.js';
import {loginPageView} from '../views/login.js';
import {registerPageView} from '../views/register.js';
import {detailsPageView} from '../views/details.js';
import {createPageView} from '../views/create.js';
import {editPageView} from '../views/edit.js';
import {logout} from '../api/data.js';

page('/' , middleWare , homePageView);
page('/login' , middleWare , loginPageView);
page('/register' , middleWare , registerPageView);
page('/details/:id' , middleWare , detailsPageView);
page('/addMovie' , middleWare , createPageView);
page('/edit/:id' , middleWare , editPageView);
page.start();


function middleWare(ctx, next) {
    if (sessionStorage.getItem('userToken')) {
        [...document.querySelectorAll('nav .user')].forEach(x => x.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(x => x.style.display = 'none');
        document.querySelector('#welcomeMsg').textContent = `Welcome , ${sessionStorage.getItem('user')}`;
    } else {
        [...document.querySelectorAll('nav .user')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(x => x.style.display = 'block');
    }
    next();
}

document.querySelector('#logoutBtn').addEventListener('click' , async (e) => { 
    e.preventDefault();
    await logout();
    page.redirect('/');

})