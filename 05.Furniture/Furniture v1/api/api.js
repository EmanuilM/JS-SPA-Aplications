async function httpRequest(url , options) { 
    const response = await fetch(url , options);
    if(!response.ok) { 
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

async function options(method , data) { 
   const result = { 
       method = 'GET',
       headers:{},
   }

   if(data) { 
       result.headers['Content-type'] = 'application/json';
       result.body = JSON.stringify(data);
   }

   if(sessionStorage.getItem('authToken')) { 
       result.headers['X-Authorization'] = sessionStorage.getItem('authToken');
   }

   return result;
 }

async function postRequest(url , data) { 
   return httpRequest(url , options('POST' , data));
}


export { 
    httpRequest,
    options,
    postRequest,
}
