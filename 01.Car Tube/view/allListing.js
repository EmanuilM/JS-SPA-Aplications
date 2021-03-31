import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getDataCars , getCollectionSize } from '../api/data.js';
const main = document.querySelector('main');

const allListingPageTemplate = (data) => html`
<section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
            ${data ? data.map(x => html`<div class="listing">
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
                </div>`) : html`<p class="no-cars">No cars in database.</p>`}
            </div>
        </section>
`


export async function allListingPageView() {
    
    render(allListingPageTemplate(await getDataCars()), main)
}