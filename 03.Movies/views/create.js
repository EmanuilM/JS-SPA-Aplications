import { render, html } from '../node_modules/lit-html/lit-html.js';
import { createMovie } from '../api/data.js';
const main = document.querySelector('main');

const createPageTemplate = (onSubmit) => html`
<section id="add-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>

`

export async function createPageView(ctx) {
    render(createPageTemplate(onSubmit), main);
    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');
        if(title === '' || description === '' || img === '') { 
            return alert('All fields are required!');
        }

        await createMovie({title,description,img});
        ctx.page.redirect('/');
    }
}