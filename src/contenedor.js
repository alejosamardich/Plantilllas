const fs = require("fs");

module.exports = class Contenedor {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(this.nameFile, "utf-8");
    if(response === "") {
			return this.assign(true);
    } else {
      return JSON.parse(response);
    }
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		}
		return data.find(element => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		data.push(product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return product;
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		}
		product.id = id;
		const previousProduct = data.splice(id - 1, 1, product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			previous: previousProduct[0],
			new: product,
		};
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct[0]
			}
		}
	}

  assign(empty = false) {
		if(empty) {
			let id = 1;
			listaProductos.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(listaProductos));
			return listaProductos;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
		}
	}
}

const listaProductos = [

{nombre: "PS5", precio: 180000, imagen:"https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21"},
{nombre: "XBOX SERIES X", precio: 160000, imagen:"https://www.atajo.com.ar/thumb/0000000RRT-0000234357RRT-00002-Consola-Xbox-Series-X-01_800x800.jpg"},
{nombre: "NINTENDO SWITCH", precio: 150000, imagen:"https://www.atajo.com.ar/images/00000HAD-S-KABAA65619HAD-S-KABAA-Consola-Nintendo-Switch-Neon-01.jpg"},
{nombre: "PS2", precio: 10000, imagen:"https://sm.ign.com/t/ign_es/gallery/t/the-best-p/the-best-ps2-games-ever_7ser.1280.jpg"}

]
