import { render, html } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
const main = document.querySelector('.container');

const myFurnitureTemplate = (data) => html`
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

async function getFurnitureData() {
    const response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${sessionStorage.getItem('userId')}%22`);
    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }
    const data = await response.json();
    return data;
}

export async function myFurnitureView() {
    const data = await getFurnitureData();
    render(myFurnitureTemplate(data), main);
}