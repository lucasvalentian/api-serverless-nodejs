'use strict';

 const translateFields = (data,isArralEnty) => {


        //CREACIÓN DLE OBJETO para la traducción 
     

        const translations = {

          name: 'nombre',
          height: 'altura',
          mass: 'peso',
          hair_color: 'color_pelo',
          skin_color: 'color_piel',
          eye_color:'color_ojos',
          birth_year:'año_nacimiento',
          gender: 'genero',
          homeworld:'mundo_natal',
          films: 'peliculas',
          species: 'especies',
          vehicles: 'vehiculos',
          starships: 'naves_estelares',
          created: 'creado',
          edited: 'editado',
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