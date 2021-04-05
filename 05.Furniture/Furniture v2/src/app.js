import page from '../node_modules/page/page.mjs';
import {homePageView} from '../views/homePage.js';
import {detailsView} from '../views/details.js';
import {registerPageView} from '../views/register.js';
import {loginPageView} from '../views/login.js';
import {createPageView} from '../views/create.js';
import {myItemsPageView} from '../views/myFurnitures.js';
import {editPageView} from '../views/edit.js'
import {logout} from '../api/data.js'

page('/' , homePageView);
page('/details/:id' , detailsView);
page('/register' , registerPageView);
page('/login' , loginPageView);
page('/create' , createPageView);
page('/my-furnitures' , myItemsPageView);
page('/edit/:id' , editPageView);
page.start();


document.querySelector('#logoutBtn').addEventListener('click' , async () => { 
   await logout();
    page.redirect('/');
})