//Simula las peticiones al servidor como si fuerapostman
const request = require("supertest");

// Importq la apliación principal
const app = require("../src/app.js");

// Importa la conexión a postgresql para poder apagarla al final
const db = require("../db");

// "describe" agrupa todas las pruebas relacionadas con "autores"
describe("Pruebas de la API de Autores", () => {

  // beforeEach(async () => {
  //   // Borra todos los autores
  //   await db.query("DELETE FROM authors");
  // });
  

  // "it" evalúa una acción específica. Aquí se verifica que traiga la tabla de autores
  it("Debería responder con estado 200 al pedir los autores", async () => {
   
    const response = await request(app).get("/autores");
    expect(response.status).toBe(200);
  });

  it("Debería dar error 404 al buscar un autor inexistente", async () => {
   
    const response = await request(app).get("/autores/9999");
    expect(response.status).toBe(404);
  });



    // it("Debería responder con estado 201 al crear un autor", async () => {
    
   //   const response = await request(app).post("/autores").send({
  //     name: "Carlos Pira",
  //     email: "carlospira@testss.com",
  //     bio: "COantent creator professional and software developer",
  //   });
  //   console.log(response.text); // Tenerlo en cuenta

  //   expect(response.statusCode).toBe(201);
  // });



  it("Debería obtener un autor específico por su ID", async () => {
  
  const response = await request(app).get("/autores/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
  });


  // it("Debería actualizar la bio de un autor (PATCH)", async () => {
  //   // 1. Enviamos el cambio
  //   const response = await request(app)
  //     .patch("/autores/15")
  //     .send({ bio: "Bio actualizada desde el test" });

  //   // 2. Verificamos que salió bien
  //   expect(response.status).toBe(200);
  // });


  it("Debería eliminar un autor (DELETE)", async () => {
   
    const response = await request(app).delete("/autores/20");
    expect(response.status).toBe(200);
  });


  // it("Debería reemplazar un autor completo (PUT)", async () => {
  //   const response = await request(app)
  //     .put("/autores/11")
  //     .send({
  //       name: "Nuevo Nombre",
  //       email: "nuevo@test.com",
  //       bio: "Bio nueva",
  //     });
  //   expect(response.status).toBe(200);
  // });

  afterAll(async () => await db.end());
});