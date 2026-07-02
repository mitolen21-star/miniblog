const request = require("supertest");
const app = require("../src/app.js");
const db = require("../db");

describe("Pruebas de la API de Comentarios", () => {

  it("Debería responder con estado 200 al pedir los comentarios", async () => {
    const response = await request(app).get("/comments");
    expect(response.status).toBe(200);
  });

  it("Debería dar error 404 al buscar un comentario inexistente", async () => {
    const response = await request(app).get("/comments/9999");
    expect(response.status).toBe(404);
  });

  it.skip("Debería responder con estado 201 al crear un comentario", async () => {
    const response = await request(app).post("/comments").send({
      content: "Comentario de prueba desde Supertest",
      post_id: 1,
      author_id: 1
    });
    expect(response.statusCode).toBe(201);
  });

  it("Debería obtener un comentario específico por su ID", async () => {
    const response = await request(app).get("/comments/11");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("content");
  });

  it.skip("Debería actualizar un comentario (PATCH)", async () => {
    const response = await request(app).patch("/comments/2").send({ 
      content: "Comentario editado en el test" 
    });
    expect(response.status).toBe(200);
  });

  it.skip("Debería eliminar un comentario (DELETE)", async () => {
    const response = await request(app).delete("/comments/3");
    expect(response.status).toBe(200);
  });

  afterAll(async () => await db.end());
});
