const express = require('express')  //Framework
const mysql = require('mysql2')     //Acceso DB
const bodyParser = require('body-parser')   //Interactuar con el JSON

const app = express()
app.use(bodyParser.json())

// Configuración de acceso a la BD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbstore'
})

// Aperturar la conexión
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la BD Store...")
})

// Iniciar el servidor
const PORT = 3000

// ================== ENDPOINTS ================== //

// Crear producto
app.post('/productos', (req, res) => {
    const { idmarca, nombre, descripcion, precio, stock, garantia } = req.body
    const sql = "INSERT INTO productos (idmarca, nombre, descripcion, precio, stock, garantia) VALUES (?,?,?,?,?,?)"
    
    db.query(sql, [idmarca, nombre, descripcion, precio, stock, garantia], (err, results) => {
        if (err) return res.status(500).send({
            success: false,
            message: 'No se concretó el registro'
        })

        res.send({
            success: true,
            message: 'Nuevo producto registrado',
            id: results.insertId
        })
    })
})

// Listar productos
app.get('/productos', (req, res) => {
    const sql = `
        SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.garantia, m.marca 
        FROM productos p 
        JOIN marcas m ON p.idmarca = m.id
        LIMIT 20
    `
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send({ message: 'Error acceso a datos' })
        res.json(results)
    })
})

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const { id } = req.params
    const { idmarca, nombre, descripcion, precio, stock, garantia } = req.body
    const sql = `
        UPDATE productos SET
        idmarca = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, garantia = ?
        WHERE id = ?
    `

    db.query(sql, [idmarca, nombre, descripcion, precio, stock, garantia, id], (err, results) => {
        if (err) return res.status(500).send({
            success: false,
            message: 'No se concretó la actualización'
        })

        res.send({
            success: true,
            message: 'Producto actualizado'
        })
    })
})

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM productos WHERE id = ?"

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send({
            success: false,
            message: 'No se puede eliminar el producto'
        })

        if (results.affectedRows === 0) return res.status(404).send({
            success: false,
            message: "No existe el producto"
        })

        res.send({
            success: true,
            rows: results.affectedRows,
            message: 'Producto eliminado correctamente'
        })
    })
})

// Levantar servidor
app.listen(PORT, () => {
    console.log("Servidor iniciado correctamente en http://localhost:3000")
})