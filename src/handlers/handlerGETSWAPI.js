'use strict';
const axios = require('axios');
const Config= require('../context/config')
const translate = require('../translate/translate');


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

          //Manejo de la logica para poder enviar la data a traducir
        const data = translate.translateFields(response.data.results,false);


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

const  servicioGETSWAPI=async (event)=>{

      try {

        console.log('getclienteInfo INIT');

        const {codigo}=event.pathParameters;

        let url=Config.SWAPI_PEOPLE
        url = url.replace("[CODE]", codigo);
        console.log('Url del api '+ url);
        const response= await axios.get(url);
        console.log('Data '+ response.data);
        
        //Manejo de la logica para poder enviar la data a traducir
        const data = translate.translateFields(response.data,true);


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


module.exports ={

    servicioGETSWAPI,
    servicioALLGETSWAPI
}