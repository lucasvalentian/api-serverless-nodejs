const AWS = require('aws-sdk');


//FUNCION PARA PODER CONSULTAR TODOS LOS DATOS DE LA TABLA MarcaTable
const getAllMarcas = async () => {

    
    const params = {
        TableName: 'MarcaTable',
      };
  
      const dynamodb=new AWS.DynamoDB.DocumentClient();
      const result = await dynamodb.scan(params).promise();
      const marcas = result.Items;
      return marcas;
  };

  //FUNCION PARA PODER CONSULTAR UNA MARCA ESPECIFICA POR ID

  const getMarcaById = async (id) => {

      const dynamodb=new AWS.DynamoDB.DocumentClient();
      const result = await dynamodb.get({
        TableName: 'MarcaTable',
        Key: {
          id: id
        }
      }).promise();

      return result.Item;


  }

  //FUNCION PARA PODER GUARDAR LOS DATOS EN LA TABLA
  const saveMarca = async (marca) => {

    const dynamodb=new AWS.DynamoDB.DocumentClient();

    await dynamodb.put({
      TableName:'MarcaTable',
      Item:marca
   }).promise()


  };





  module.exports={
    getAllMarcas,
    getMarcaById,
    saveMarca
  }

