import request from "supertest";
import express from "express";
import { habitacionRouter } from "../src/routes/habitacion.route.js";
import { sequelize } from '../src/database/database.js';

const app = express();
app.use(express.json());
app.use('/api/habitaciones', habitacionRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});
  
afterAll(async () => {
    await sequelize.close();
});

describe("GET /api/habitaciones", () => {
    test("should respond with an array of rooms", async () => {
        const response = await request(app).get("/api/habitaciones");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/habitaciones", () => {
    test("should create a new room", async () => {
        const newHabitacion = {
            num_habitacion: 101,
            tipo_amueblado: "Deluxe",
            alto: 3.0,
            ancho: 4.0,
            largo: 5.0,
            tipo_camas: "King Size",
            num_camas: 1,
            precio: 150.00,
            estado: "Disponible"
        };
        const response = await request(app).post("/api/habitaciones").send(newHabitacion);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("codigo_habitacion");
        expect(response.body.num_habitacion).toBe(newHabitacion.num_habitacion);
    });
});

describe("GET /api/habitaciones/:idHabitacion", () => {
    test("should respond with a single room", async () => {
        const newHabitacion = {
            num_habitacion: 102,
            tipo_amueblado: "Suite",
            alto: 3.5,
            ancho: 4.5,
            largo: 5.5,
            tipo_camas: "Queen Size",
            num_camas: 2,
            precio: 200.00,
            estado: "Disponible"
        };
        const createdHabitacion = await request(app).post("/api/habitaciones").send(newHabitacion);
        const habitacionId = createdHabitacion.body.codigo_habitacion;
        const response = await request(app).get(`/api/habitaciones/${habitacionId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_habitacion).toBe(habitacionId);
    });

    test("should respond with 404 if room not found", async () => {
        const response = await request(app).get("/api/habitaciones/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Habitacion no encontrada");
    });
});

describe("PUT /api/habitaciones/:idHabitacion", () => {
    test("should update an existing room", async () => {
        const newHabitacion = {
            num_habitacion: 103,
            tipo_amueblado: "Standard",
            alto: 2.5,
            ancho: 3.5,
            largo: 4.5,
            tipo_camas: "Single",
            num_camas: 1,
            precio: 100.00,
            estado: "Disponible"
        };
        const createdHabitacion = await request(app).post("/api/habitaciones").send(newHabitacion);
        const habitacionId = createdHabitacion.body.codigo_habitacion;
        const updatedHabitacion = {
            num_habitacion: 104,
            tipo_amueblado: "Suite",
            alto: 3.5,
            ancho: 4.5,
            largo: 5.5,
            tipo_camas: "Queen Size",
            num_camas: 2,
            precio: 250.00,
            estado: "Ocupada"
        };
        const response = await request(app).put(`/api/habitaciones/${habitacionId}`).send(updatedHabitacion);
        expect(response.statusCode).toBe(200);
        const habitacionResponse = await request(app).get(`/api/habitaciones/${habitacionId}`);
        expect(habitacionResponse.body[0].num_habitacion).toBe(updatedHabitacion.num_habitacion);
    });

    test("should respond with 404 if room not found", async () => {
        const response = await request(app).put("/api/habitaciones/9999").send({
            num_habitacion: 105,
            tipo_amueblado: "Deluxe",
            alto: 3.0,
            ancho: 4.0,
            largo: 5.0,
            tipo_camas: "King Size",
            num_camas: 1,
            precio: 300.00,
            estado: "Disponible"
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Habitacion no encontrada");
    });
});

describe("DELETE /api/habitaciones/:idHabitacion", () => {
    test("should delete an existing room", async () => {
        const newHabitacion = {
            num_habitacion: 106,
            tipo_amueblado: "Standard",
            alto: 2.5,
            ancho: 3.5,
            largo: 4.5,
            tipo_camas: "Single",
            num_camas: 1,
            precio: 100.00,
            estado: "Disponible"
        };
        const createdHabitacion = await request(app).post("/api/habitaciones").send(newHabitacion);
        const habitacionId = createdHabitacion.body.codigo_habitacion;
        const response = await request(app).delete(`/api/habitaciones/${habitacionId}`);
        expect(response.statusCode).toBe(200);
        const habitacionResponse = await request(app).get(`/api/habitaciones/${habitacionId}`);
        expect(habitacionResponse.statusCode).toBe(404);
        expect(habitacionResponse.body).toHaveProperty("message", "Habitacion no encontrada");
    });

    test("should respond with 404 if room not found", async () => {
        const response = await request(app).delete("/api/habitaciones/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Habitacion no encontrada");
    });
});
