import request from "supertest";
import express from "express";
import { clienteRouter } from "../src/routes/cliente.route.js";
import { sequelize } from '../src/database/database.js';

const app = express();
app.use(express.json());
app.use('/api/clientes', clienteRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("GET /api/clientes", () => {
    test("should respond with an array of clients", async () => {
        const response = await request(app).get("/api/clientes");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/clientes", () => {
    test("should create a new client", async () => {
        const newCliente = {
            cedula: "1234567890",
            nombres: "Juan",
            apellidos: "Perez",
            direccion: "Av. Siempre Viva 742",
            telefono: "0987654321",
            correo: "juan.perez@example.com",
            fecha_nacimiento: "1985-01-01",
            usuario_codigo: 1
        };
        const response = await request(app).post("/api/clientes").send(newCliente);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("codigo_cliente");
        expect(response.body.cedula).toBe(newCliente.cedula);
    });
});

describe("GET /api/clientes/:idCliente", () => {
    test("should respond with a single client", async () => {
        const newCliente = {
            cedula: "1234567891",
            nombres: "Maria",
            apellidos: "Lopez",
            direccion: "Calle Falsa 123",
            telefono: "0987654322",
            correo: "maria.lopez@example.com",
            fecha_nacimiento: "1990-02-02",
            usuario_codigo: 1
        };
        const createdCliente = await request(app).post("/api/clientes").send(newCliente);
        const clienteId = createdCliente.body.codigo_cliente;
        const response = await request(app).get(`/api/clientes/${clienteId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_cliente).toBe(clienteId);
    });

    test("should respond with 404 if client not found", async () => {
        const response = await request(app).get("/api/clientes/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Cliente no encontrado");
    });
});

describe("PUT /api/clientes/:idCliente", () => {
    test("should update an existing client", async () => {
        const newCliente = {
            cedula: "1234567892",
            nombres: "Carlos",
            apellidos: "Martinez",
            direccion: "Calle 1",
            telefono: "0987654323",
            correo: "carlos.martinez@example.com",
            fecha_nacimiento: "1995-03-03",
            usuario_codigo: 1
        };
        const createdCliente = await request(app).post("/api/clientes").send(newCliente);
        const clienteId = createdCliente.body.codigo_cliente;
        const updatedCliente = {
            cedula: "1234567893",
            nombres: "Carlos",
            apellidos: "Martinez",
            direccion: "Calle 2",
            telefono: "0987654324",
            correo: "carlos.martinez_updated@example.com",
            fecha_nacimiento: "1995-03-03",
            usuario_codigo: 1
        };
        const response = await request(app).put(`/api/clientes/${clienteId}`).send(updatedCliente);
        expect(response.statusCode).toBe(200);
        const clienteResponse = await request(app).get(`/api/clientes/${clienteId}`);
        expect(clienteResponse.body[0].direccion).toBe(updatedCliente.direccion);
    });

    test("should respond with 404 if client not found", async () => {
        const response = await request(app).put("/api/clientes/9999").send({
            cedula: "1234567894",
            nombres: "Ana",
            apellidos: "Gomez",
            direccion: "Calle 3",
            telefono: "0987654325",
            correo: "ana.gomez@example.com",
            fecha_nacimiento: "2000-04-04",
            usuario_codigo: 1
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Cliente no encontrado");
    });
});

describe("DELETE /api/clientes/:idCliente", () => {
    test("should delete an existing client", async () => {
        const newCliente = {
            cedula: "1234567895",
            nombres: "Laura",
            apellidos: "Fernandez",
            direccion: "Calle 4",
            telefono: "0987654326",
            correo: "laura.fernandez@example.com",
            fecha_nacimiento: "2005-05-05",
            usuario_codigo: 1
        };
        const createdCliente = await request(app).post("/api/clientes").send(newCliente);
        const clienteId = createdCliente.body.codigo_cliente;
        const response = await request(app).delete(`/api/clientes/${clienteId}`);
        expect(response.statusCode).toBe(200);
        const clienteResponse = await request(app).get(`/api/clientes/${clienteId}`);
        expect(clienteResponse.statusCode).toBe(404);
        expect(clienteResponse.body).toHaveProperty("message", "Cliente no encontrado");
    });

    test("should respond with 404 if client not found", async () => {
        const response = await request(app).delete("/api/clientes/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Cliente no encontrado");
    });
});
