
// Importando express
const express = require('express')

// Creando una instancia de express
const app = express()


// Esta opción utiliza la desestructuración.
// Al importar, le estás diciendo a Node: "Trae el objeto que exporta
// ... el archivo y extrae solo la propiedad llamada infoCursos".

const { infoCursos } = require('./datos/cursos')




