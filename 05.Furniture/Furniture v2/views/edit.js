import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { editItem } from '../api/data.js';
import { detailsData } from '../api/data.js';
const main = document.querySelector('main');

const editPageTemplate = (onSubmit,data) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="${data.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model" value=${data.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${data.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value=${data.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${data.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${data.img.startsWith('.') ? data.img.slice(1) : data.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${data.material ? data.material : ''}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`


export async function editPageView(ctx) {
    render(editPageTemplate(onSubmit , await detailsData(ctx.params.id)) , main);

    async function onSubmit(e) { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const make = formData.get('make');
        const model = formData.get('model');
        const year = formData.get('year');
        const description = formData.get('description');
        const price = formData.get('price');
        const img = formData.get('img');
        const material = formData.get('material');
    
    
        if(make.length < 4) { 
            return alert('Make length must me at least 4 symbols long!');
        }
    
        if(year <= 1950 || year >= 2050) { 
            return alert('Year must be between 1950 and 2050');
        }
        
        if(model.length < 4) { 
            return alert('Model length must me at least 4 symbols long!');
        }
    
        if(description.length < 10) { 
            return alert('Description length must me at least 4 symbols long!');
        }
        if(price < 0) { 
            return alert('Price must be positive number!');
        }
        if(img === '') { 
            return alert('Image is required!');
        }
    
        const data = { 
            make,
            model,
            year,
            description,
            price,
            img,
            material,
        }
    
         await editItem(ctx.params.id , data);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }

}