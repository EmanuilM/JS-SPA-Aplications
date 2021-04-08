import { render, html } from '../node_modules/lit-html/lit-html.js';
import { editArticle  , getDetailsById} from '../api/data.js'
const main = document.querySelector('#main-content');

const editPageDetails = (onSubmit , data) => html`

<section id="edit-page" class="content">
            <h1>Edit Article</h1>

            <form @submit=${onSubmit} id="edit" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="title">Title:</label>
                        <input type="text" name="title" id="title" .value=${data.title}>
                    </p>

                    <p class="field category">
                        <label for="category">Category:</label>
                        <input type="text" name="category" id="category" .value=${data.category}>
                    </p>
                    <p class="field">
                        <label for="content">Content:</label>
                        <textarea name="content" id="content" .value=${data.content}></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Save Changes">
                    </p>

                </fieldset>
            </form>
        </section>
`


export async function editPageView(ctx) {
    render(editPageDetails(onSubmit , await getDetailsById(ctx.params.id)), main);

    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');
        if(title === '' || category === '' || content === '' ) { 
            return alert('All fields are required!');
        }
        await editArticle(ctx.params.id , {title,category,content});
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}