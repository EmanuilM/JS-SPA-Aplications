import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { getMyItems } from '../api/data.js';
const main = document.querySelector('main');

const myItmesPageTemplate = (data) => html`
        <div class="row space-top">
            ${data.map(x => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${x.img.startsWith('.') ? x.img.slice(1) : x.img}" />
                        <p>${x.description}</p>
                        <footer>
                            <p>Price: <span>${x.price} $</span></p>
                        </footer>
                        <div>
                            <a href="/details/${x._id}" class="btn btn-info">Details</a>
                        </div>
                    </div>
                </div>
            </div>`)}
           
`

async function getMyFurnitures() {
    return await getMyItems(sessionStorage.getItem('_id'));
}


export async function myItemsPageView() {
    const data = await getMyFurnitures();
    render(myItmesPageTemplate(data), main)
}