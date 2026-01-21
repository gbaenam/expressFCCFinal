// Importando express
const express = require("express")

// Creando una instancia de express
const app = express()

// Esta opción utiliza la desestructuración.
// Al importar, le estás diciendo a Node: "Trae el objeto que exporta
// ... el archivo y extrae solo la propiedad llamada infoCursos".

const { infoCursos } = require("./datos/cursos")

// Routers
// Router programación
app.use('/api/cursos/programacion', routerProgramacion)
// Router matematicas.
app.use('/api/cursos/matematicas', routerMatematicas)


// Routing con Express
// Función de Express para definir una ruta que maneje solicitudes HTTP GET.
app.get("/", (req, res) => {
    res.send("Mi primer servidor con Express")
})

app.get("/api/cursos", (req, res) => {
    res.send(JSON.stringify(infoCursos));
})

// Establece un puerto en que el servidor escucha las solicitudes entrantes.
const PUERTO = process.env.PORT || 3000

// Esta línea inicia el servidor y le indica en que puerto debe escuchar las solicitudes.
app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando el el puerto ${PUERTO}`)
})
