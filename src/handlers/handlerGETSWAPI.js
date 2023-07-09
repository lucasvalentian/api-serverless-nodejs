'use strict';
const axios = require('axios');
const Config= require('../context/config')


/**
* Funcion cosumo-api: Maneja la lógica para consumir el api de GETSWAPI- Devuelve todos la data de person
* 
*/

const servicioALLGETSWAPI=async(event)=>{


      try {
        
        console.log('getclienteInfoAll INIT');
        
        let url=Config.SWAPI_PEOPLE_ALL
        console.log('Url del api '+ url);
        const response= await axios.get(url);
        console.log('Data '+ response);

        const data = response.data.results.map((person) => ({
            nombre: person.name,
            altura: person.height,
            peso: person.mass,
            color_piel: person.skin_color,
            color_ojos:person.eye_color,
            año_nacimiento:person.birth_year,
            genero: person.gender,
            mundo_natal:person.homeworld,
            peliculas: person.films,
            especies: person.species,
            vehiculos: person.vehicles,
            naves_estelares: person.starships,
            creado: person.created,
            editado: person.edited,
            url: person.url
          }));


          return {

            statusCode:200,
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                message:'Datos obtenidos correctamente',
                data:data
              })
    
        }
      





      } catch (error) {

           console.error(error)

                return {
                    statusCode:400,
                    headers:{
                    'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                    message:'Error al cargar los datos',
                    error:error
                    })
                }
                
      }


}


/**
* Funcion cosumo-api: Maneja la lógica para consumir el api de GETSWAPI- Devuelve un dato en especifico
* 
*/

/*const  servicioGETSWAPI=async (event)=>{

      try {

        console.log('getclienteInfo INIT');

        const {codigo}=event.pathParameters;

        let url=Config.SWAPI_PEOPLE
        url = url.replace("[CODE]", codigo);
        console.log('Url del api '+ url);
        const response= await axios.get(url);
        console.log('Data '+ response);

        const data = {
                      nombre: response.data.name,
                      altura: response.data.height,
                      peso: response.data.mass,
                      color_piel: response.data.skin_color,
                      color_ojos: response.data.eye_color,
                      año_nacimiento: response.data.birth_year,
                      genero: response.data.gender,
                      mundo_natal: response.data.homeworld,
                      peliculas: response.data.films,
                      especies: response.data.species,
                      vehiculos: response.data.vehicles,
                      naves_estelares: response.data.starships,
                      creado: response.data.created,
                      editado: response.data.edited,
                      url: response.data.url
        };
        


          return {

            statusCode:200,
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                message:'Datos obtenidos correctamente',
                data:data
              })
    
        }
      



          

        
      } catch (error) {

        console.error(error)

        return {
            statusCode:400,
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
            message:'Error al cargar los datos',
            error:error
            })
        }


        
      }
}*/


module.exports ={

    //servicioGETSWAPI,
    servicioALLGETSWAPI
}