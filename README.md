# Api-Serverless-NodeJs

Prueba Tecnica


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
#### Obtener todos los personajes

**Endpoint: /api/marcas**

- `GET /api/marcas`: Obtiene todas las marcas.
- `POST /api/marcas`: Crea una nueva marca.
- `GET /api/marcas/{id}`: Obtiene una marca específica según su ID.


#### Obtener todos los personajes

Endpoint: `GET /api/people`

```bash
curl https://swapi.py4e.com/api/people



