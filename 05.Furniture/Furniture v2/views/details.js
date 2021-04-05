import { render, html } from '../node_modules/lit-html/lit-html.js';
import {detailsData} from '../api/data.js';
import {deleteItem} from '../api/data.js';



const main = document.querySelector('main');

const detailsTemplate = (data,del) => html`

        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${data.img.startsWith('.') ? data.img.slice(1) : data.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div style="display:${data._ownerId === sessionStorage.getItem('_id') ? 'block' : 'none'}">
                    <a href="/edit/${data._id}" class="btn btn-info">Edit</a>
                    <a @click=${del} href="javascript:void(0)" class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>

`



export async function detailsView(ctx) {
    // const furnitureById = await detailsData(ctx.params.id);
    render(detailsTemplate(await detailsData(ctx.params.id) , del) , main);
    async function del() { 
        await deleteItem(ctx.params.id);
        ctx.page.redirect('/');
    }
}