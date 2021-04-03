import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import {getDataByID} from '../api/data.js';
import {deleteDataById} from '../api/data.js';

const main = document.querySelector('main');

const detailsTemplate = (data,del) => html`
<div class="container home some">
    <img class="det-img" src="${data.img.startsWith('.') ? data.img.slice(1) : data.img}" />
    <div class="desc">
        <h2 class="display-5">${data.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${data.description}</p>
    </div>
    ${data._ownerId === sessionStorage.getItem("_id") ? html`<div class="text-center">
        <a class="btn detb" href="" @click="${del}" data-id="${data._id}">Delete</a>
    </div>` : ""}
</div>
`




export async function detailsPageView(ctx) {
   
        render(detailsTemplate(await getDataByID(ctx.params.id) , del) , main);
        async function del() { 
            await deleteDataById(ctx.params.id);
            ctx.page.redirect('/');
   
}

}