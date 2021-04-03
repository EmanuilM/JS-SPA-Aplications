import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getData } from '../api/data.js'
import {createData} from '../api/data.js'
const main = document.querySelector('main');


const createPageTemplate = () => html`

<div class="container home wrapper  my-md-5 pl-md-5">
        <div class=" d-md-flex flex-mb-equal ">
            <div class="col-md-6">
                <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
            </div>
            <form @submit=${onSubmit} class="form-idea col-md-5" action="#/create" method="post">
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                </div>
                <div class="form-label-group">
                    <label for="ideaTitle">Title</label>
                    <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                        required="" autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="ideaDescription">Description</label>
                    <textarea type="text" name="description" class="form-control" placeholder="Description"
                        required=""></textarea>
                </div>
                <div class="form-label-group">
                    <label for="inputURL">Add Image</label>
                    <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                        required="">

                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
            </form>
        </div>
    </div> 
`

async function onSubmit(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    if(title.length < 6) { 
        return alert('Title must be at least 6 characters long!');
    }

    if(description.length < 10) { 
        return alert('Description must be at least 10 characters long!');
    }

    if(img.length < 5) { 
        return alert('Image must be at least 5 characters long!');

    }
    

    await createData({title,description,img});
    page.redirect('/dashboard');
}

export async function createPageView() {
    render(createPageTemplate(), main)
}


//details template

{/* <div class="container home some">
    <img class="det-img" src="./images/dinner.jpg" />
    <div class="desc">
        <h2 class="display-5">Dinner Recipe</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a long
            day. With so many easy pasta recipes out there, there's something for every palate to love. That's why
            pasta
            makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to its
            versatility.</p>
    </div>
    <div class="text-center">
        <a class="btn detb" href="">Delete</a>
    </div>
</div> */}