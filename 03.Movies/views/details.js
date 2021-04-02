import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getMovieById, deleteMovieById , getNumberOfLikes } from '../api/data.js';
const main = document.querySelector('main');

const detailsPageTemplate = (data, del ,likes) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${data.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${data.img}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${data.description}</p>
                ${sessionStorage.getItem('_id') === data._ownerId ? html`<a class="btn btn-danger" @click=${del}
                    href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${data._id}">Edit</a>` : html`<a class="btn btn-primary"
                    href="#">Like</a>`}
                <span class="enrolled-span">Likes: ${likes}</span>
            </div>
        </div>
    </div>
</section>
`


export async function detailsPageView(ctx) {
    const likes =  await getNumberOfLikes(ctx.params.id);
    render(detailsPageTemplate(await getMovieById(ctx.params.id), del , likes), main);
    async function del() {
        const isConfirmed = confirm('Are you sure that you want to delete this movie?');
        if (isConfirmed) {
            await deleteMovieById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    
}