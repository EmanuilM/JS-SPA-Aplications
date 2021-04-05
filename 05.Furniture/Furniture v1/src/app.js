import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js'


import {homePageView} from '../views/homePage.js';
import {createPageView} from '../views/createFurniturePage.js';
import {loginView} from '../views/login.js';
import {registerView} from '../views/register.js';
import {detailsView} from '../views/details.js';
import {del} from '../views/delete.js';
import {editView} from '../views/edit.js';
import {myFurnitureView} from '../views/myFurniture.js';


page('/', homePageView);
page('/create' , createPageView)
page('/login' , loginView)
page('/register' , registerView)
page('/details/:id' , detailsView)
page('/delete/:id' , del)
page('/edit/:id' , editView)
page('/my-furniture' , myFurnitureView)


page.start();

document.querySelector('#logoutBtn').addEventListener('click' , (e) => { 
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userToken');
        page.redirect('/');
})