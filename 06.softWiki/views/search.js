import { render, html } from '../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js'
const main = document.querySelector('#main-content');

const searchPageTemplate = (data,onSubmit,q) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form" @submit=${onSubmit}>
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search" .value="${q}">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${data.length > 0 ? data.map(partial) : html`
        <h3 class="no-articles">No matching articles</h3>`}
    </div>
</section>
`
const partial = (data) => html`
<a class="article-preview" href="/details/${data._id}">
    <article>
        <h3>Topic: <span>${data.title}</span></h3>
        <p>Category: <span>${data.category}</span></p>
    </article>
</a>
`



export async function searchPageView(ctx) {
    let query = ctx.querystring.split('=')[1] || ''
    const response = query === '' ? [] : await search(query);
    render(searchPageTemplate(response, onSubmit, query) , main);

    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const s = formData.get('search');
            ctx.page.redirect('/search?query=' + s);
    }
}