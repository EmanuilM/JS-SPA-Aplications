import page from '../node_modules/page/page.mjs';
import {homePageView} from '../views/home.js';
import {loginPageView} from '../views/login.js';
import {registerPageView} from '../views/register.js';
import {detailsPageView} from '../views/details.js';
import {createPageView} from '../views/create.js';
import {catalogPageView} from '../views/catalog.js';
import {editPageView} from '../views/edit.js';
import {searchPageView} from '../views/search.js';
import {logout} from '../api/data.js';


page('/' , middleWare , homePageView);
page('/login' , middleWare , loginPageView);
page('/register' , middleWare , registerPageView);
page('/details/:id' , middleWare , detailsPageView);
page('/create' , middleWare , createPageView);
page('/catalog' , middleWare , catalogPageView);
page('/edit/:id' , middleWare , editPageView);
page('/search' , middleWare , searchPageView);
page.start();


function middleWare(ctx, next) {
    if (sessionStorage.getItem('userToken')) {
        [...document.querySelectorAll('#user')].forEach(x => x.style.display = 'block');
        [...document.querySelectorAll('#guest')].forEach(x => x.style.display = 'none');
    } else {
        [...document.querySelectorAll('#user')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('#guest')].forEach(x => x.style.display = 'block');
    }
    next();
}

document.querySelector('#logoutBtn').addEventListener('click' , async (e) => { 
    e.preventDefault();
    await logout();
    page.redirect('/');

})