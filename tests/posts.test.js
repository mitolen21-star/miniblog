const request = require("supertest");
const app = require("../src/app.js");
const db = require("../db");

describe("Pruebas de la API de Posts", () => {
  const postId = 7; //quí cambiamos el ID, para probar

  it.skip("Debería crear un post (201)", async () => {
    const response = await request(app).post("/posts").send({
      title: "Post de prueba completa",
      content: "Contenido de prueba",
      author_id: 1,
      published: true
    });
    expect(response.statusCode).toBe(201);
    
    postId = response.body.id;
  });

  it("Debería responder 200 al traer todos los posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
  });

  it.skip("Debería actualizar todo el post con PUT (200)", async () => {
    const response = await request(app).put(`/posts/${postId}`).send({
      title: "Post editado en test",
      content: "Contenido actualizado",
      author_id: 10,
      published: false,
    });
    expect(response.statusCode).toBe(200);
  });

  it.skip("Debería actualizar parcialmente con PATCH (200)", async () => {
    const response = await request(app).patch(`/posts/${postId}`).send({
      title: "Título modificado con patch",
    });
    expect(response.statusCode).toBe(200);
  });

  it.skip("Debería eliminar el post creado (200 o 204)", async () => {
    const response = await request(app).delete(`/posts/${postId}`);
    expect([200, 204]).toContain(response.statusCode);
  });

  afterAll(async () => await db.end());
});
