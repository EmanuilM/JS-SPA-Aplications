import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getCarById  , editCarInfo} from '../api/data.js';
const main = document.querySelector('main');


const editPageTemplate = (onSubmit,data) => html`

    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value="${data.brand}">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value="${data.model}">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value="${data.description}">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value="${data.year}">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${data.imageUrl}">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value="${data.price}">
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`


export async function editPageView(ctx) {
    render(editPageTemplate(onSubmit , await getCarById(ctx.params.id)), main);
    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const model = formData.get('model');
        const brand = formData.get('brand');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const year = Number(formData.get('year'));
        const price = Number(formData.get('price'));
        if(description === '' || imageUrl === '' || model === '' || brand === '' || year === '' || price === '') { 
            return alert('All fields are required!');
        }
        if(price < 0 || year < 0) { 
            return alert('Price and year must be a positive numbers!');
        }
        await editCarInfo(ctx.params.id ,  {brand,model,description,year,imageUrl,price});
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}