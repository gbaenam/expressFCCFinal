
const express = require('express')

// Importación de los cursos de matemáticas.
const { matematicas } = require('../datos/cursos').infoCursos

const routerMatematicas = express.Router()

routerMatematicas.get("/", (req, res) => {
    res.send(JSON.stringify(matematicas))
})

// Parámetros de ruta cursos de matemáticas
routerMatematicas.get("/:tema", (req, res) => {
    const tema = req.params.tema
    const resultados = matematicas.filter(curso => curso.tema === tema)

    if (resultados.length === 0) {
        return res.status(404).send(`No encontraron cursos de ${tema}`)
    }
    res.send(JSON.stringify(resultados))
})

// Filtrando con dos parámetros.
routerMatematicas.get("/:tema/:nivel", (req, res) => {
    // console.log(req.params)
    const tema = req.params.tema
    const nivel = req.params.nivel
    const resultados = matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel)

    if (resultados.length === 0) {
        return res.status(404).send(`No encontraron cursos de ${tema} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados))
})


// Exportación del Router de Matemáticas.
module.exports = {
    routerMatematicas
}





