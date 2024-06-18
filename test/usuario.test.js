import request from "supertest"
import { usuarioRouter } from "../src/routes/usuario.route.js";
import express from "express"
import { sequelize } from '../src/database/database.js';

//testing de usuario
const app = express();
app.use(express.json());
app.use('/api/usuarios', usuarioRouter);

beforeAll(async () => {
    await sequelize.sync();
  });
  
  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/usuarios", () => {
    test("should respond with an array of users", async () => {
        const response = await request(app).get("/api/usuarios");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/usuarios", () => {
    test("should create a new user", async () => {
        const newUser = {
            usuario: "testuser",
            clave: "testpassword",
            email: "testuser@example.com"
        };
        const response = await request(app).post("/api/usuarios").send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("codigo_usuario");
        expect(response.body.usuario).toBe(newUser.usuario);
    });
});

describe("GET /api/usuarios/:idUsuario", () => {
    test("should respond with a single user", async () => {
        const newUser = {
            usuario: "singleuser",
            clave: "singlepassword",
            email: "singleuser@example.com"
        };
        const createdUser = await request(app).post("/api/usuarios").send(newUser);
        const userId = createdUser.body.codigo_usuario;
        const response = await request(app).get(`/api/usuarios/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_usuario).toBe(userId);
    });

    test("should respond with 404 if user not found", async () => {
        const response = await request(app).get("/api/usuarios/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Usuario no encontrado");
    });
});

describe("PUT /api/usuarios/:idUsuario", () => {
    test("should update an existing user", async () => {
        const newUser = {
            usuario: "updateuser",
            clave: "updatepassword",
            email: "updateuser@example.com"
        };
        const createdUser = await request(app).post("/api/usuarios").send(newUser);
        const userId = createdUser.body.codigo_usuario;
        const updatedUser = {
            usuario: "updateduser",
            clave: "newpassword",
            email: "updateduser@example.com"
        };
        const response = await request(app).put(`/api/usuarios/${userId}`).send(updatedUser);
        expect(response.statusCode).toBe(200);
        const userResponse = await request(app).get(`/api/usuarios/${userId}`);
        expect(userResponse.body[0].usuario).toBe(updatedUser.usuario);
    });

    test("should respond with 404 if user not found", async () => {
        const response = await request(app).put("/api/usuarios/9999").send({
            usuario: "nonexistentuser",
            clave: "password",
            email: "nonexistent@example.com"
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Usuario no encontrado");
    });
});

describe("DELETE /api/usuarios/:idUsuario", () => {
    test("should delete an existing user", async () => {
        const newUser = {
            usuario: "deleteuser",
            clave: "deletepassword",
            email: "deleteuser@example.com"
        };
        const createdUser = await request(app).post("/api/usuarios").send(newUser);
        const userId = createdUser.body.codigo_usuario;
        const response = await request(app).delete(`/api/usuarios/${userId}`);
        expect(response.statusCode).toBe(200);
        const userResponse = await request(app).get(`/api/usuarios/${userId}`);
        expect(userResponse.statusCode).toBe(404);
        expect(userResponse.body).toHaveProperty("message", "Usuario no encontrado");
    });

    test("should respond with 404 if user not found", async () => {
        const response = await request(app).delete("/api/usuarios/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Usuario no encontrado");
    });
});
