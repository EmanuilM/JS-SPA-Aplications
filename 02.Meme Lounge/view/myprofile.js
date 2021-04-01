import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getUserData} from '../api/data.js';
const main = document.querySelector('main');

const myProfileTemplete = (data) => html`
 <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
                <div class="user-content">
                    <p>Username: ${sessionStorage.getItem('username')}</p>
                    <p>Email: ${sessionStorage.getItem('user')}</p>
                    <p>My memes count: ${data.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings"> 

                <!-- Display : All created memes by this user (If any) --> 
                ${data.length > 0 ? data.map(x => html`
                <div class="user-meme">
                    <p class="user-meme-title">${x.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${x.imageUrl}">
                    <a class="button" href="/details/${x._id}">Details</a>
                </div>
                `) : html`<p class="no-memes">No memes in database.</p>`}

            </div>
        </section>
`

export async function myProfilePageView() {
    render(myProfileTemplete(await getUserData(sessionStorage.getItem('_id'))), main);
}