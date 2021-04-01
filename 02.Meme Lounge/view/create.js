import { render, html } from '../node_modules/lit-html/lit-html.js';
import { createMemeData } from '../api/data.js';
import page from '../node_modules/page/page.mjs';
import {notify} from '../src/notification.js';
const main = document.querySelector('main');


const createPageTemplate = () => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

async function onSubmit(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');
    if(title === '' || description === '' || imageUrl === '') { 
        return notify('All fields are required!');
    }
    await createMemeData({title,description,imageUrl});
    page.redirect('/memes');
} 


export async function createPageView() {
    render(createPageTemplate(), main)
}