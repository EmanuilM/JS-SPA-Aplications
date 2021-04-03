import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getData } from '../api/data.js'

const main = document.querySelector('main');

const dashboardTemplate = (data) => html`
<div id="dashboard-holder">
    ${data.length > 0 ? data.map(x => html`
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${x.title}</p>
        </div>
        <img class="card-image" src="${x.img}" alt="Card image cap">
        <a class="btn" href="/details/${x._id}">Details</a>
    </div>
    `) : html`<h1>No ideas yet! Be the first one :)</h1>`}
</div>
`


export async function dashboardPageView() {
    render(dashboardTemplate(await getData()), main)
}