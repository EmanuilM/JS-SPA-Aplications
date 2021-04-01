import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getDetailsById  , deleteMemeById} from '../api/data.js';
const main = document.querySelector('main');

const detailsPageTemplate = (data,del) => html`
 <section id="meme-details">
            <h1>Meme Title: ${data.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${data.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${data.description}
                    </p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    ${sessionStorage.getItem('_id') === data._ownerId ? html`<a class="button warning" href="/edit/${data._id}">Edit</a>` : ''}
                    ${sessionStorage.getItem('_id') === data._ownerId ? html`<button class="button danger" @click=${del} href="javascript:void(0)">Delete</button>` : ''}
                    
                 </div>
            </div>
        </section>  
`


export async function detailsPageView(ctx) {
    console.log(ctx.params.id);
    render(detailsPageTemplate(await getDetailsById(ctx.params.id) , del), main);
    async function del() { 
        const isConfirm = confirm('Are you sure that you want to delete this meme?');
        if(isConfirm) { 
            await deleteMemeById(ctx.params.id);
            ctx.page.redirect('/memes');
        }
    }
}