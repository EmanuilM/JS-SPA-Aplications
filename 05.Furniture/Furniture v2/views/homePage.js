import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getData } from '../api/data.js';

const main = document.querySelector('main');

const homePageTemplete = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
    <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
   ${data.map(x => html`
   <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${x.img}" />
                <p>${x.description}</p>
                <footer>
                    <p>Price: <span>${x.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${x._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
   `)}
</div>
`

export async function homePageView() {
    const isUserLoged = sessionStorage.getItem('userToken'); 
    if(isUserLoged) { 
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
    }else { 
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
    const asd = await getData();
    render(homePageTemplete(await getData()), main)
}