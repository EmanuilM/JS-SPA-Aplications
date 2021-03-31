import page from '../node_modules/page/page.mjs';
import {homePageView} from '../view/home.js';
import {loginPageView} from '../view/login.js';
import {registerPageView} from '../view/register.js';
import {allListingPageView} from '../view/allListing.js';
import {detailsPageView} from '../view/details.js';
import {createPageView} from '../view/create.js';
import {editPageView} from '../view/edit.js';
import {myListingsPageView} from '../view/myListings.js';
import {logout} from '../api/data.js';
import {searchPageView} from '../view/search.js';

page('/' , middleWare , homePageView);
page('/login' , middleWare , loginPageView);
page('/register' , middleWare , registerPageView);
page('/cars' , middleWare , allListingPageView);
page('/details/:id' , middleWare , detailsPageView);
page('/create' , middleWare , createPageView);
page('/edit/:id' , middleWare , editPageView);
page('/myListings' , middleWare , myListingsPageView);
page('/search' , middleWare , searchPageView);
page.start();


function middleWare(ctx, next) {
    if (sessionStorage.getItem('userToken')) {
        [...document.querySelectorAll('nav #profile')].forEach(x => x.style.display = 'block');
        [...document.querySelectorAll('nav #guest')].forEach(x => x.style.display = 'none');
        document.querySelector('#welcomeMsg').textContent = `Welcome , ${sessionStorage.getItem('user')}`;
    } else {
        [...document.querySelectorAll('nav #profile')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('nav #guest')].forEach(x => x.style.display = 'block');
    }
    next();
}

document.querySelector('#logutBtn').addEventListener('click' , async (e) => { 
    e.preventDefault();
    await logout();
    page.redirect('/');

})


