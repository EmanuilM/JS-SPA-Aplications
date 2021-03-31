import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { getUserData } from '../api/data.js';
const main = document.querySelector('main');


const myListingsPageTemplate = (data) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${data.length > 0 ? data.map(x => html` <div class="listing">
            <div class="preview">
                <img src="${x.imageUrl}">
            </div>
            <h2>${x.brand} ${x.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${x.year}</h3>
                    <h3>Price: ${x.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${x._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>`) : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}




    </div>
</section>
`

// <!-- Display if there are no records -->
//<p class="no-cars"> You haven't listed any cars yet.</p>




export async function myListingsPageView() {
    render(myListingsPageTemplate(await getUserData(sessionStorage.getItem('_id'))), main)
}