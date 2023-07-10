const chai = require('chai');
const chaiHttp = require('chai-http');
const Config= require('../src/context/config')
chai.use(chaiHttp);

const expect = chai.expect;




describe('serviceGetAllMarcas', () => {
    describe('serviceGetAllMarcas', () => {

        it('debería retornar los datos correctamente', async () => {
         
            const res = await chai
            .request(Config['API-MARCAS'])
            .get('/api/marcas');
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Datos Cargados Correctamente');
            expect(res.body.data).to.be.an('array');

        });
     

      });
      
  });

  describe('Pruebas de serviceGetMarca', () => {
    it('debería devolver los datos de una marca existente', async () => {

      const id = 'cae9b2e3-911c-48fa-a2fd-7ea67158ebe3';
  
      const res = await chai
        .request(Config['API-MARCAS'])
        .get(`/api/marcas/${id}`);
  
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Datos Cargados Correctamente');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.Item).to.exist;
      expect(res.body.data.Item.nombre).to.equal('Honada');
      expect(res.body.data.Item.descripcion).to.equal('Buena calidad');
      expect(res.body.data.Item.createaAt).to.exist;
      expect(res.body.data.Item.id).to.equal(id);
    });
  
    it('debería devolver un error para un ID inválido', async () => {
      const id = '123';
  
      const res = await chai
        .request(Config['API-MARCAS'])
        .get(`/api/marcas/${id}`);
  
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal('El ID ingresado no es válido');
    });
  
    it('debería devolver un error para una marca inexistente', async () => {
      const id = 'cae9b2e3-911c-48fa-a2fd-7ea67158ebe1';
  
      const res = await chai
        .request(Config['API-MARCAS'])
        .get(`/api/marcas/${id}`);
  
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('La marca no existe');
    });
  });


 

  describe('Pruebas de servicePostMarca', () => {

    it('debería almacenar los datos correctamente', async () => {

      const event = {
          nombre: 'Marca 1',
          descripcion: 'Descripción de la marca 1'
      
      };
  
      const response = await chai
        .request(Config['API-MARCAS'])
        .post('/api/marcas')
        .send(event);
  
      expect(response).to.have.status(200);
      expect(response.body.message).to.equal('Almacenado Correctamente');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.id).to.exist;
      expect(response.body.data.nombre).to.equal('Marca 1');
      expect(response.body.data.descripcion).to.equal('Descripción de la marca 1');
      expect(response.body.data.createaAt).to.exist;
    });
  
    it('debería manejar errores correctamente con parámetros faltantes o incorrectos', async () => {
      const event = {
       
          nombre: '',
          descripcion: null
        
      };
  
      const response = await chai
        .request(Config['API-MARCAS'])
        .post('/api/marcas')
        .send(event);
  
      expect(response).to.have.status(400);
      expect(response.body.message).to.equal('Error al guardar los datos');
      expect(response.body.error).to.exist;
    });
  
    it('debería manejar errores correctamente con objeto de evento vacío', async () => {
      const event = {};
  
      const response = await chai
        .request(Config['API-MARCAS'])
        .post('/api/marcas')
        .send(event);
  
      expect(response).to.have.status(400);
      expect(response.body.message).to.equal('Error al guardar los datos');
      expect(response.body.error).to.exist;
    });

  });



