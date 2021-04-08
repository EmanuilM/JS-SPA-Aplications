import { render, html } from '../node_modules/lit-html/lit-html.js';
import { catalogData } from '../api/data.js'
const main = document.querySelector('#main-content');

const catalogPageTemplate = (data) => html`

<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${data.length === 0 ?  html`h3 class="no-articles">No articles yet</h3>`: data.map(x => html` <a class="article-preview" href="/details/${x._id}">
        <article>
            <h3>Topic: <span>${x.title}</span></h3>
            <p>Category: <span>${x.category}</span></p>
        </article>
    </a>`)}
    </section> 
`

export async function catalogPageView() {
    render(catalogPageTemplate(await catalogData()), main)
}