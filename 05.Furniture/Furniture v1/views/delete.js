import page from '../node_modules/page/page.mjs';
export async function del(ctx) { 
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