import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getDetailsById  , deleteArticleById} from '../api/data.js'
const main = document.querySelector('#main-content');


const detailsPageTemplate = (data,del) => html`
<section id="details-page" class="content details">
    <h1>${data.title}</h1>

    <div class="details-content">
        <strong>Published in category ${data.category}</strong>
        <p>${data.content}</p>

        ${sessionStorage.getItem('_id') === data._ownerId ? html`<div class="buttons">
            <a @click=${del} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${data._id}" class="btn edit">Edit</a>
        </div>` : html`<div class="buttons">
            <a href="/" class="btn edit">Back</a>
        </div>`}

    </div>
</section>
`

export async function detailsPageView(ctx) {
    render(detailsPageTemplate(await getDetailsById(ctx.params.id) , del), main);
    async function del() { 
        const isConfirmed = confirm('Are you sure you want to delete this article?');
        if(isConfirmed) { 
            await deleteArticleById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}