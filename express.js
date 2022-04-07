const express = require("express");
const app = express();
const PORT = 8080;
const fs = require(`fs`);
class Contenedor {
  constructor() {
    this.nombreArchivo = "./productos.txt";
    this.id = 1;
  }
  save(title, price) {
    let producto = { title: title, price: price, id: this.id };
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    productos.push(producto);
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos));
    this.id++;
  }
  getById(id) {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    let producto = null;
    productos.forEach((product) => {
      if (product.id == id) {
        producto = product;
      }
    });
    console.log(producto);
  }
  getAll() {
    let productos = [];
    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    return productos;
  }
  deleteById(id) {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }

    let newArray = productos.filter(function (element) {
      return element.id !== id;
    });

    console.log("deleteById:" + JSON.stringify(newArray));
  }

  deleteAll() {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    productos.length = 0;
    console.log(" deleteAll" + productos);
  }

  getRandom() {
    let productos = [];

    try {
      let data = fs.readFileSync(this.nombreArchivo, `utf-8`);
      productos = JSON.parse(data);
    } catch (e) {
      console.log("archivo no creado");
    }
    let productoRandom =
      productos[Math.floor(Math.random() * productos.length)];
    return productoRandom;
  }
}

const server = app.listen(PORT, () => {
  console.log("Servidor express puerto 8080");
});

server.on("error", (error) => console.log(`Error: ${error}`));

app.get(`/`, (req, resp) => {
  resp.send({ mensaje: `hola hola` });
});
let producto = new Contenedor();
producto.save(`heladera`, 10000);
producto.save(`tv`, 20000);

// let productos = [
//   { nombre: `tv`, precio: 10000, id: 1 },
//   { nombre: `heladera`, precio: 20000, id: 2 },
// ];
let productoGet = producto.getAll();
let data = productoGet;

app.get(`/productos`, (req, resp) => {
  resp.send(data);
});
app.get(`/productoRandom`, (req, resp) => {
  // let productoRandom = producto[Math.floor(Math.random() * producto.length)];
  resp.send(producto.getRandom());
});
