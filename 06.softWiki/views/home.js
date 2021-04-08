import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js'
const main = document.querySelector('#main-content');

const homePageTemplate = (data) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>

        ${
        data.javascript.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : data.javascript.map(article)

    }

    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${
        data.csharp.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : data.csharp.map(article)

    }
        
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${
        data.java.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : data.java.map(article)

    }
        
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${
        data.python.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : data.python.map(article)

    }
    </section>
</section>
`
const article = (data) => html`
<article>
    <h3>${data.title}</h3>
    <p>${data.content}</p>
    <a href="/details/${data._id}" class="btn details-btn">Details</a>
</article>
`

export async function homePageView(ctx, next) {
    const response = await getAllArticles();
    const data = {
        python : response.filter(x => x.category === 'Python'),
        csharp : response.filter(x => x.category === 'C#'),
        java : response.filter(x => x.category === 'Java'),
        javascript : response.filter(x => x.category === 'JavaScript'),
    }

    render(homePageTemplate(data) , main);

}