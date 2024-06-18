import request from "supertest";
import express from "express";
import { detallesRouter } from "../src/routes/detalles.route.js";
import { sequelize } from '../src/database/database.js';

const app = express();
app.use(express.json());
app.use('/api/facturadetalles', detallesRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("GET /api/facturadetalles", () => {
    test("should respond with an array of invoice details", async () => {
        const response = await request(app).get("/api/facturadetalles");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/facturadetalles", () => {
    test("should create a new invoice detail", async () => {
        const newDetalle = {
            iva: 12.00,
            subtotal: 100.00,
            reserva_codigo: 1,
            factura_codigo: 1
        };
        const response = await request(app).post("/api/facturadetalles").send(newDetalle);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("codigo_detalle");
        expect(response.body.subtotal).toBe(newDetalle.subtotal);
    });
});

describe("GET /api/facturadetalles/:idDetalle", () => {
    test("should respond with a single invoice detail", async () => {
        const newDetalle = {
            iva: 24.00,
            subtotal: 200.00,
            reserva_codigo: 1,
            factura_codigo: 1
        };
        const createdDetalle = await request(app).post("/api/facturadetalles").send(newDetalle);
        const detalleId = createdDetalle.body.codigo_detalle;
        const response = await request(app).get(`/api/facturadetalles/${detalleId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_detalle).toBe(detalleId);
    });

    test("should respond with 404 if detail not found", async () => {
        const response = await request(app).get("/api/facturadetalles/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Detalle no encontrado");
    });
});

describe("PUT /api/facturadetalles/:idDetalle", () => {
    test("should update an existing invoice detail", async () => {
        const newDetalle = {
            iva: 36.00,
            subtotal: 300.00,
            reserva_codigo: 1,
            factura_codigo: 1
        };
        const createdDetalle = await request(app).post("/api/facturadetalles").send(newDetalle);
        const detalleId = createdDetalle.body.codigo_detalle;
        const updatedDetalle = {
            iva: 48.00,
            subtotal: 400.00,
            reserva_codigo: 1,
            factura_codigo: 1
        };
        const response = await request(app).put(`/api/facturadetalles/${detalleId}`).send(updatedDetalle);
        expect(response.statusCode).toBe(200);
        const detalleResponse = await request(app).get(`/api/facturadetalles/${detalleId}`);
        expect(detalleResponse.body[0].subtotal).toBe(updatedDetalle.subtotal);
    });

    test("should respond with 404 if detail not found", async () => {
        const response = await request(app).put("/api/facturadetalles/9999").send({
            iva: 60.00,
            subtotal: 500.00,
            reserva_codigo: 1,
            factura_codigo: 1
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Detalle no encontrado");
    });
});

describe("DELETE /api/facturadetalles/:idDetalle", () => {
    test("should delete an existing invoice detail", async () => {
        const newDetalle = {
            iva: 72.00,
            subtotal: 600.00,
            reserva_codigo: 1,
            factura_codigo: 1
        };
        const createdDetalle = await request(app).post("/api/facturadetalles").send(newDetalle);
        const detalleId = createdDetalle.body.codigo_detalle;
        const response = await request(app).delete(`/api/facturadetalles/${detalleId}`);
        expect(response.statusCode).toBe(200);
        const detalleResponse = await request(app).get(`/api/facturadetalles/${detalleId}`);
        expect(detalleResponse.statusCode).toBe(404);
        expect(detalleResponse.body).toHaveProperty("message", "Detalle no encontrado");
    });

    test("should respond with 404 if detail not found", async () => {
        const response = await request(app).delete("/api/facturadetalles/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Detalle no encontrado");
    });
});
