import { render, html } from '../node_modules/lit-html/lit-html.js'
import {del} from './delete.js'
import page from '../node_modules/page/page.mjs';
import {homePageView} from './homePage.js'

const main = document.querySelector('.container');


const detailsTemplate = (data,del) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${data.img.startsWith('.') ? data.img.slice(1) : data.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div style="display:${data._ownerId !== sessionStorage.getItem('userId') ? 'none' : 'block'}">
                    <a href="/edit/${data._id}" class="btn btn-info">Edit</a>
                    <a @click=${del} href="javascript:void(0)" class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>
`

    async function getFurnitureById(id) {  
        const response = await fetch(`http://localhost:3030/data/catalog/${id}`)
        if(!response.ok) { 
            const error = await response.json();
            alert(error.message);
            throw Error(error.message);
        }
        const data = await response.json();
       return data;
    }


export async function detailsView(ctx) { 
    render(detailsTemplate(await getFurnitureById(ctx.params.id) , del) , main);

    async function del() { 
        const id = ctx.params.id;
        const response = await fetch(`http://localhost:3030/data/catalog/${id}` , 
        {
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                'X-Authorization' : sessionStorage.getItem('userToken'),
        },
    
        }
        );
        if(!response.ok) { 
            const error = await response.json();
            alert(error.message);
            throw Error(error.message);
        }
    
         page.redirect('/');
    }
}