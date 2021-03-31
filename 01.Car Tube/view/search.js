import { render, html } from '../node_modules/lit-html/lit-html.js';
import { searchCars } from '../api/data.js';
const main = document.querySelector('main');


const searchPageTemplate = (data,onSearch,year) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input"type="text" name="search" placeholder="Enter desired production year" .value="${year || ''}">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${data.length > 0 ? data.map(x => html`<div class="listing">
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
        </div>`) : html`<p class="no-cars"> No results.</p>`}



    </div>
</section>
`

export async function searchPageView(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const cars = Number.isNaN(year) ? [] : await searchCars(year);
    render(searchPageTemplate(cars,onSearch , year), main);

    async function onSearch() { 
        const query = Number(document.getElementById('search-input').value);
        ctx.page.redirect('/search?query=' + query);
    }
}