import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../api/data.js';
const main = document.querySelector('main');

const memePageTemplete = (data) => html`

        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
        
                ${data.length > 0 ? data.map(x => html`<div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${x.title}</p>
                            <img class="meme-image" alt="meme-img" src="${x.imageUrl}">
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${x._id}">Details</a>
                        </div>
                    </div>
                </div>`) : html`
                <p class="no-memes">No memes in database.</p>
            </div>
        </section>
        `}
                 
`



export async function memePageeView() {
    render(memePageTemplete(await getAllMemes()), main)
}