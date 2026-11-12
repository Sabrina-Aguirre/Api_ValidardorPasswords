const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const usuarios = require('../data/usuarios.json')
const { reglasAValidar } = require('./politicas/reglas')

app.use(express.json())
app.get('/validador', (_, res) => {

    const userNoCumple = usuarios
        .filter(u => !reglasAValidar(u))
        .map(({ password, id, ...resto }) => resto)
    return res.status(200).json(userNoCumple)
})

app.post('/usuarios', (req, res) => {

    const usuario = req.body
    if (!reglasAValidar(usuario))
        return res.status(200).json({ mensaje: `La password ${usuario.password} no cumple con las reglas` })

    const id = usuarios.reduce( (acum, each) => acum > each.id ? acum : each.id, 0) + 1
    const newUsuario = {id, ...usuario}
    usuarios.push(newUsuario)
    res.status(201).json(newUsuario)

})

app.get('/usuarios', (_, res) => {
    return res.status(200).json(usuarios)
})

app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id)
    const usuario = usuarios.find(usuario => usuario.id == id)
    if(!usuarios.id)
        return res.status(404).json({mensaje:`El usuario con id ${id} no existe`})
    res.status(200).json(usuario)
})
app.listen(PORT, () => {
    console.log(`La app esta inicializada en el puerto ${PORT}`)
})