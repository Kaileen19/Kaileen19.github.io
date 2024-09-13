import { query, queryGraph } from "./query.js";

export function fetchData(jwtToken){
    console.log("in fetchdata 1")
    return fetch('https://01.kood.tech/api/graphql-engine/v1/graphql', {
       method: 'POST',
       headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwtToken}`
       },
       body: JSON.stringify({
          query: query
       })
    })
    .then(response => response.json())  
    .then(data => {
      if(data.errors){
         console.log('Console logging data:',data)
         console.log('GraphQl Error:', data.errors)
      }else{ 
       console.log('GraphQl RESPONSE:', data); 
      }
       return data;
    })
    .catch(error => console.log(error));  
 }

