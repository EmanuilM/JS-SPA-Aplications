import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getDetailsById  , editMemeById} from '../api/data.js';
import page from '../node_modules/page/page.mjs';
import {notify} from '../src/notification.js';
const main = document.querySelector('main');

const editPageTemplate = (onSubmit,data) => html`
<section id="edit-meme">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value="${data.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">
                          ${data.description} 
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${data.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`




export async function editPageView(ctx) {
    console.log(ctx.params.id);
    render(editPageTemplate(onSubmit , await getDetailsById(ctx.params.id)), main);
    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        if(title === '' || description === '' || imageUrl === '') { 
            return notify('All fields are required!');
        }
        await editMemeById(ctx.params.id ,  {title,description,imageUrl});
        page.redirect(`/details/${ctx.params.id}`);
    }
}