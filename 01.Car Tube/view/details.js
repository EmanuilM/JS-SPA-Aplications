import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getCarById  , deleteCarById} from '../api/data.js';
const main = document.querySelector('main');

const detailsPateTemplate = (data , del) => html`
<!-- Listing Details Page -->
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${data.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${data.brand}</li>
            <li><span>Model:</span>${data.model}</li>
            <li><span>Year:</span>${data.year}</li>
            <li><span>Price:</span>${data.price}$</li>
        </ul>

        <p class="description-para">${data.description}</p>
        ${sessionStorage.getItem('_id') === data._ownerId ? html`
        <div class="listings-buttons">
            <a href="/edit/${data._id}" class="button-list">Edit</a>
            <a @click=${del} href="javascript:void(0)" class="button-list">Delete</a>
        </div>
        ` : ''}


    </div>
</section>
`

export async function detailsPageView(ctx) {
    console.log(await getCarById(ctx.params.id));
    render(detailsPateTemplate(await getCarById(ctx.params.id) , del), main);
    async function del() { 
        const isConfirmed = confirm('Are you sure you want to delete this car?');
        if(isConfirmed) { 
            await deleteCarById(ctx.params.id);
            ctx.page.redirect('/cars');
        }
    }
}