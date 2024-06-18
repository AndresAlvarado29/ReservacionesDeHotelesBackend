import request from "supertest";
import express from "express";
import { reservaRouter } from "../src/routes/reserva.route.js";
import { sequelize } from '../src/database/database.js';

const app = express();
app.use(express.json());
app.use('/api/reservas', reservaRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});
  
afterAll(async () => {
    await sequelize.close();
});

describe("GET /api/reservas", () => {
    test("should respond with an array of reservations", async () => {
        const response = await request(app).get("/api/reservas");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/reservas", () => {
    test("should create a new reservation", async () => {
        const newReserva = {
            fecha_entrada: "2024-06-15",
            fecha_salida: "2024-06-20",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            codigo_habitacion: 1,
            cliente_codigo: 1
        };
        const response = await request(app).post("/api/reservas").send(newReserva);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("codigo_reserva");
        expect(response.body.fecha_entrada).toBe(newReserva.fecha_entrada);
    });
});

describe("GET /api/reservas/:idReserva", () => {
    test("should respond with a single reservation", async () => {
        const newReserva = {
            fecha_entrada: "2024-06-15",
            fecha_salida: "2024-06-20",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            codigo_habitacion: 1,
            cliente_codigo: 1
        };
        const createdReserva = await request(app).post("/api/reservas").send(newReserva);
        const reservaId = createdReserva.body.codigo_reserva;
        const response = await request(app).get(`/api/reservas/${reservaId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_reserva).toBe(reservaId);
    });

    test("should respond with 404 if reservation not found", async () => {
        const response = await request(app).get("/api/reservas/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Reserva no encontrada");
    });
});

describe("PUT /api/reservas/:idReserva", () => {
    test("should update an existing reservation", async () => {
        const newReserva = {
            fecha_entrada: "2024-06-15",
            fecha_salida: "2024-06-20",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            codigo_habitacion: 1,
            cliente_codigo: 1
        };
        const createdReserva = await request(app).post("/api/reservas").send(newReserva);
        const reservaId = createdReserva.body.codigo_reserva;
        const updatedReserva = {
            fecha_entrada: "2024-07-01",
            fecha_salida: "2024-07-05",
            personas: 3,
            numero_habitaciones: 2,
            numero_adultos: 3,
            numero_ninios: 0,
            codigo_habitacion: 1,
            cliente_codigo: 1
        };
        const response = await request(app).put(`/api/reservas/${reservaId}`).send(updatedReserva);
        expect(response.statusCode).toBe(200);
        const reservaResponse = await request(app).get(`/api/reservas/${reservaId}`);
        expect(reservaResponse.body[0].fecha_entrada).toBe(updatedReserva.fecha_entrada);
    });

    test("should respond with 404 if reservation not found", async () => {
        const response = await request(app).put("/api/reservas/9999").send({
            fecha_entrada: "2024-07-01",
            fecha_salida: "2024-07-05",
            personas: 3,
            numero_habitaciones: 2,
            numero_adultos: 3,
            numero_ninios: 0,
            codigo_habitacion: 1,
            cliente_codigo: 1
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Reserva no encontrada");
    });
});

describe("DELETE /api/reservas/:idReserva", () => {
    test("should delete an existing reservation", async () => {
        const newReserva = {
            fecha_entrada: "2024-06-15",
            fecha_salida: "2024-06-20",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            codigo_habitacion: 1,
            cliente_codigo: 1
        };
        const createdReserva = await request(app).post("/api/reservas").send(newReserva);
        const reservaId = createdReserva.body.codigo_reserva;
        const response = await request(app).delete(`/api/reservas/${reservaId}`);
        expect(response.statusCode).toBe(200);
        const reservaResponse = await request(app).get(`/api/reservas/${reservaId}`);
        expect(reservaResponse.statusCode).toBe(404);
        expect(reservaResponse.body).toHaveProperty("message", "Reserva no encontrada");
    });

    test("should respond with 404 if reservation not found", async () => {
        const response = await request(app).delete("/api/reservas/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Reserva no encontrada");
    });
});
