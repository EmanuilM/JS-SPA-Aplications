import page from '../node_modules/page/page.mjs';
import {render,html} from '../node_modules/lit-html/lit-html.js';
import {homePageView} from '../views/home.js'
import {loginPageView} from '../views/login.js'
import {registerPageView} from '../views/register.js'
import {dashboardPageView} from '../views/dashboard.js'
import {createPageView} from '../views/create.js'
import {detailsPageView} from '../views/details.js'
import {logout} from '../api/data.js'


page('/' , homePageView);
page('/login' , loginPageView);
page('/register' , registerPageView);
page('/dashboard' , dashboardPageView);
page('/create' , createPageView);
page('/details/:id' , detailsPageView);
page.start();



document.querySelector('#logoutBtn').addEventListener('click' , async (e) => { 
    e.preventDefault();
    await logout();
    page.redirect('/');

})

