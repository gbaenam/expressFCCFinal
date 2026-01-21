
const express = require('express')

const { programacion } = require('/../datos/cursos').infoCursos

const routerProgramacion = express.Router()


routerProgramacion.get("/", (req, res) => {
    res.send(JSON.stringify(programacion));
})

// Parámetros de ruta cursos programación
routerProgramacion.get("/:lenguaje", (req, res) => {
    // console.log(req.params)
    const lenguaje = req.params.lenguaje
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje)

    if (resultados.length === 0) {
        return res.status(404).send(`No encontraron cursos de ${lenguaje}`)
    }

    // Parámetros query (Ordenado de menor a mayor)
    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultados.sort((a,b) => a.vistas - b.vistas)))
    }

    res.send(JSON.stringify(resultados))
})

// Filtrando con dos parámetros.
routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
    // console.log(req.params)
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)

    if (resultados.length === 0) {
        return res.status(404).send(`No encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados))
})