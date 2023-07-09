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

        console.log('GetMarcas INIT');

        const params = {
            TableName: 'MarcaTable',
          };

          console.log('Tabla ', params);

          const dynamodb=new AWS.DynamoDB.DocumentClient();
          const result = await dynamodb.scan(params).promise();
          const marcas = result.Items;

          console.log('Lista de Marcas ',marcas)


          return {

            statusCode:200,
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                message:'Datos Cargados Correctamente',
                data:marcas
              })
    
        }



        
    } catch (error) {

        console.log(error)

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
* Funcion cosumo-api: Maneja la lógica para pode realizar peticiones get de una Marca Especifica
* 
*/

const serviceGetMarca=async(event)=>{

    try {

        console.log('GetMarca INIT');

        const {id}=event.pathParameters;
        const dynamodb=new AWS.DynamoDB.DocumentClient();
       

        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

      // Validar si el ID es un UUID válido
        if (!uuidRegex.test(id)) {
        return {
            statusCode: 400,
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            message: 'El ID ingresado no es válido'
            })
        };
        }


 

      // Obtener la marca desde la base de datos
        
      const result = await dynamodb.get({
        TableName: 'MarcaTable',
        Key: {
          id: id
        }
      }).promise();

      console.log('Data ',result)

       // Validar si la marca existe
    if (!result.Item) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: 'La marca no existe'
          })
        };
      }


      return {

        statusCode:200,
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            message:'Datos',
            data:result
          })

    }



        
    } catch (error) {

        console.log(error)

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
    serviceGetMarca,
    servicePostMarca: middy(servicePostMarca).use(httpJsonBodyParser())

}