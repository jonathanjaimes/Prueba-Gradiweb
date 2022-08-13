import axios from 'axios';
import { readFile } from 'fs/promises';
import fetch from 'node-fetch';


// Data extraida desde Postman para poder formatearla debido al problema con node-fetch para traerla directamente desde la Number:

const datos = JSON.parse(
    await readFile(
        new URL('./datos.json', import.meta.url)
    )
);

// Intento con node-fetch. Obtengo un [API] Invalid API Key Or Access Token (Unrecognized Login Or Wrong Password):

// const response = await fetch('https://devtestrecruitte.myshopify.com/admin/api/2021-07/products.json', {
//     // 'Authorization': 'Basic ' + Buffer.from(`d156c699edcc98186dae8e6f9562d838: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`).toString('base64')
//     //"X-Shopify-Access-Token": "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"
// });
// const data = await response.json();
// console.log(data)


// Intento con axios, obtengo error 400:

// axios.post("devtestrecruitte.myshopify.com/admin/api/2021-07/products.json", {}, {
//     headers: { 'Authorization': 'Basic ' + Buffer.from(`d156c699edcc98186dae8e6f9562d838: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`).toString('base64') }
//   }).then(function(response) {
//     console.log('Authenticated');
//   }).catch(function(error) {
//     console.log(error);
//   });

// Proceso de formateo de la data:

let productos = []

datos.products.forEach((el) => {
    productos.push({
        [el.title]: {
            price: el.variants[0].price,
            status: el.status,
            created_at: el.created_at.slice(0, el.created_at.indexOf("T"))
        }
    })

})


// Vista de la data formateada:

console.log(productos)

