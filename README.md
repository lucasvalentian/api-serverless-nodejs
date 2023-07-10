# Api-Serverless-NodeJs

Prueba Técnica


## Development

Instalación de dependencias:

```bash
npm install
```

# Configuración IAM

En el archivo `serverless.yml`, asegúrate de configurar correctamente las declaraciones de IAM para acceder a tu tabla de DynamoDB. 

```yaml
provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - dynamodb:*
      Resource: 
        - arn:aws:table/NombreDeLaBaseDeDatos
```



#### Apis Marcas

A continuación se detallan las APIs disponibles para gestionar las marcas:

**Endpoint: /api/marcas**

- `GET /api/marcas`: Obtiene todas las marcas existentes en la base de datos.

  Descripción: Esta solicitud obtiene todas las marcas registradas en la base de datos y devuelve una lista de marcas en formato JSON.
  Ejemplo de respuesta exitosa (código de estado 200):
    ```json
    [
        {
        "id": "1",
        "nombre": "Marca 1",
        "descripcion": "Descripción de la Marca 1",
        "createdAt": "2023-07-09T10:00:00Z"
        },
        {
        "id": "2",
        "nombre": "Marca 2",
        "descripcion": "Descripción de la Marca 2",
        "createdAt": "2023-07-09T11:00:00Z"
        },
    
    ]


- `GET /api/marcas/{id} `:Obtiene una marca específica según su ID.
Descripción: Esta solicitud obtiene una marca específica de la base de datos utilizando el ID proporcionado en la URL y devuelve los detalles de la marca en formato JSON.

Ejemplo de respuesta exitosa (código de estado 200):
 ```json
 {
   "id": "1",
   "nombre": "Marca 1",
   "descripcion": "Descripción de la Marca 1",
   "createdAt": "2023-07-09T10:00:00Z"
}

```
- `POST /api/marcas`: Crea una nueva marca en la base de datos.

  Descripción: Esta solicitud crea una nueva marca en la base de datos utilizando los datos proporcionados en el cuerpo de la solicitud en formato JSON.

  Ejemplo de cuerpo de solicitud:

  ```json
  {
    "nombre": "Nueva Marca",
    "descripcion": "Descripción de la Nueva Marca"             
  }

  Ejemplo de respuesta exitosa (código de estado 200):
 ```json
        {
        "id": "3",
        "nombre": "Nueva Marca",
        "descripcion": "Descripción de la Nueva Marca",
        "createdAt": "2023-07-09T12:00:00Z"
        }