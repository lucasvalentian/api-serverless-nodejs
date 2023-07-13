'use strict';

 const translateFields = (data,isArralEnty) => {


        //CREACIÓN DLE OBJETO para la traducción 
        const translations = {

            nombre: 'name',
            altura: 'height',
            peso: 'mass',
            color_piel: 'skin_color',
            color_ojos:'eye_color',
            año_nacimiento:'birth_year',
            genero: 'gender',
            mundo_natal:'homeworld',
            peliculas: 'films',
            especies: 'species',
            vehiculos: 'vehicles',
            naves_estelares: 'starships',
            creado: 'created',
            editado: 'edited',
            url: 'url'
        };

      


            //Logica para poder manejar la traducción del array del api

          if (isArralEnty) {
            const translatedData = {};
            for (const key in data) {
              if (translations[key]) {
                translatedData[translations[key]] = data[key];
              } else {
                translatedData[key] = data[key];
              }
            }
            return translatedData;
          } else {

            return data.reduce((translatedData, person) => {
              const translatedPerson = {};
              for (const key in person) {
                if (translations[key]) {
                  translatedPerson[translations[key]] = person[key];
                } else {
                  translatedPerson[key] = person[key];
                }
              }
              translatedData.push(translatedPerson);
              return translatedData;

            }, []);
          }








      
 }

 module.exports = {
    translateFields
  };