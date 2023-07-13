'use strict';
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser  = require('@middy/http-json-body-parser');
const {getAllMarcas,getMarcaById,saveMarca}=require('../model/model-marca');
const validator = require('../validator/uuidRegex');


/**
* Funcion cosumo-api: Maneja la lógica para pode realizar peticiones get de todas las marcas
* 
*/

const serviceGetAllMarcas=async()=>{

    try {

        console.log('GetMarcas INIT');
        const marcas= await getAllMarcas();
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

      // Validar si el ID es un UUID válido
        if (!validator.validateUUID(id)) {
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
        
      const result =await getMarcaById(id); 

      console.log('Data ',result)

       // Validar si la marca existe
    if (!result) {
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
            message:'Datos Cargados Correctamente',
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

       
        const {nombre,descripcion} = event.body;

        if (!event.body || !nombre || !descripcion) {
          throw new Error('Parámetros faltantes o incorrectos');
        }
        

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

        //GUARDAR LOS DATOS
        await saveMarca(marca)

       
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