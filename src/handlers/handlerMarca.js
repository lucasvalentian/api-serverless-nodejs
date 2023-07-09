'use strict';
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser  = require('@middy/http-json-body-parser');

/**
* Funcion cosumo-api: Maneja la lógica para pode realizar peticiones get de todas las marcas
* 
*/

const serviceGetAllMarcas=async()=>{

    try {
        
    } catch (error) {
        
    }
}

/**
* Funcion cosumo-api: Maneja la lógica para poder guardar las marcas
* 
*/


const servicePostMarca=async(event)=>{

      try {

        console.log('postMarca INIT');

        const dynamodb=new AWS.DynamoDB.DocumentClient();
        const {nombre,descripcion} = event.body;

        console.log('Data de Input ', nombre, descripcion);

        const createaAt=new Date().getTime();
        const id=uuidv4();
        console.log('ID ', id);

        const marca={
             id,
             nombre,
             descripcion,
             createaAt
        }

        await dynamodb.put({
            TableName:'MarcaTable',
            Item:marca
         }).promise()

         return {

            statusCode:200,
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                message:'Almacenado Correctamente',
                data:marca
            
                
              })
    
        }






        
      } catch (error) {

         console.error(error);

        return {
            statusCode:400,
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              message:'Error al guardar los datos',
              error:error
            })
          }

        
      }
}



module.exports={
    serviceGetAllMarcas,
    servicePostMarca: middy(servicePostMarca).use(httpJsonBodyParser())

}