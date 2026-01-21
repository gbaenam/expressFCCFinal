// Importando express
const express = require("express")

// Creando una instancia de express
const app = express()

// Esta opción utiliza la desestructuración.
// Al importar, le estás diciendo a Node: "Trae el objeto que exporta
// ... el archivo y extrae solo la propiedad llamada infoCursos".

const { infoCursos } = require("./datos/cursos")

// Routers
const routerProgramacion = express.Router()
app.use('/api/cursos/programacion', routerProgramacion)

const routerMatematicas = express.Router()
app.use('/api/cursos/matematicas', routerMatematicas)


// Routing con Express
// Función de Express para definir una ruta que maneje solicitudes HTTP GET.
app.get("/", (req, res) => {
    res.send("Mi primer servidor con Express")
})

app.get("/api/cursos", (req, res) => {
    res.send(JSON.stringify(infoCursos));
})

// Programación
routerProgramacion.get("/", (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
})

// Parámetros de ruta cursos programación
routerProgramacion.get("/:lenguaje", (req, res) => {
    // console.log(req.params)
    const lenguaje = req.params.lenguaje
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje)

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
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)

    if (resultados.length === 0) {
        return res.status(404).send(`No encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados))
})

// Matemáticas
routerMatematicas.get("/", (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas))
})

// Parámetros de ruta cursos de matemáticas
routerMatematicas.get("/:tema", (req, res) => {
    const tema = req.params.tema
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)

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
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel)

    if (resultados.length === 0) {
        return res.status(404).send(`No encontraron cursos de ${tema} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados))
})

// Establece un puerto en que el servidor escucha las solicitudes entrantes.
const PUERTO = process.env.PORT || 3000

// Esta línea inicia el servidor y le indica en que puerto debe escuchar las solicitudes.
app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando el el puerto ${PUERTO}`)
})
