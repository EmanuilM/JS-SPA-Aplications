import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getMovieById , editMovieById } from '../api/data.js';
const main = document.querySelector('main');

const editPageTemplate = (data , onSubmit) => html`
 <section id="edit-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value="${data.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." value="${data.description}" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" value="${data.img}" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </section> 
`



export async function editPageView(ctx) {
    console.log(await getMovieById(ctx.params.id));
    render(editPageTemplate(await getMovieById(ctx.params.id) , onSubmit), main);
    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        if(title === '' || description === '' || img === '') { 
            return alert('All fields are required!');
        }

        await editMovieById(ctx.params.id , {title,description,img});
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}