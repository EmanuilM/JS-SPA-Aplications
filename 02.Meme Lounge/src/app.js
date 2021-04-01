import page from '../node_modules/page/page.mjs';
import { homePageView } from '../view/home.js';
import { LoginPageView } from '../view/login.js';
import { registerPageView } from '../view/register.js';
import { memePageeView } from '../view/allMemesPage.js';
import { detailsPageView } from '../view/details.js';
import { createPageView } from '../view/create.js';
import { editPageView } from '../view/edit.js';
import { myProfilePageView } from '../view/myprofile.js';
import { logout } from '../api/data.js';
import { notify } from '../src/notification.js';

page('/', middleWare, homePageView);
page('/login',  middleWare , LoginPageView);
page('/register', middleWare ,registerPageView);
page('/memes', middleWare , memePageeView);
page('/details/:id',  middleWare , detailsPageView);
page('/create', middleWare , createPageView);
page('/edit/:id',  middleWare , editPageView);
page('/myprofile', middleWare , myProfilePageView);
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

document.querySelector('nav').addEventListener('click' , async (e) => { 
    if(e.target.textContent === 'Logout') { 
        await logout();
        page.redirect('/')
    }
})