import request from "supertest";
import express from "express";
import { detallesRouter } from "../src/routes/facturaDetalle.route.js";
import { sequelize } from '../src/database/database.js';
import { FacturaCabecera } from '../src/models/facturaCabecera.js';
import { Reserva } from '../src/models/reserva.js';
import { Cliente } from '../src/models/cliente.js';
import { Usuario } from '../src/models/usuario.js';
import { Habitacion } from '../src/models/habitacion.js';

const app = express();
app.use(express.json());
app.use('/api/detalles', detallesRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Crear un usuario, cliente, habitación, reserva y factura para las pruebas
    const usuario = await Usuario.create({
        usuario: "testuser",
        clave: "testpassword",
        email: "testuser@example.com"
    });

    const cliente = await Cliente.create({
        cedula: "1234567890",
        nombres: "Juan",
        apellidos: "Perez",
        direccion: "Av. Siempre Viva 742",
        telefono: "0987654321",
        correo: "juan.perez@example.com",
        fecha_nacimiento: "1985-01-01",
        usuario_codigo: usuario.codigo_usuario
    });

    const habitacion = await Habitacion.create({
        num_habitacion: 101,
        tipo_amueblado: "Deluxe",
        alto: 3.0,
        ancho: 4.0,
        largo: 5.0,
        tipo_camas: "King Size",
        num_camas: 1,
        precio: 150.00,
        estado: "Disponible"
    });

    await Reserva.create({
        fecha_entrada: "2024-06-15",
        fecha_salida: "2024-06-20",
        personas: 2,
        numero_habitaciones: 1,
        numero_adultos: 2,
        numero_ninios: 0,
        habitacion_codigo: habitacion.codigo_habitacion,
        cliente_codigo: cliente.codigo_cliente
    });

    await FacturaCabecera.create({
        fecha_emision: "2024-06-15",
        tipo_pago: "Tarjeta de crédito",
        subtotal: 100.00,
        iva: 12.00,
        total: 112.00,
        cliente_codigo: cliente.codigo_cliente
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe("GET /api/detalles", () => {
    test("should respond with an array of invoice details", async () => {
        const response = await request(app).get("/api/detalles");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/detalles", () => {
    test("should create a new invoice detail", async () => {
        const newDetalle = {
            iva: 12.00,
            subtotal: 100.00,
            reserva_codigo: 1,  // Asociado a la reserva creada en beforeAll
            factura_codigo: 1  // Asociado a la factura creada en beforeAll
        };
        const response = await request(app).post("/api/detalles").send(newDetalle);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("codigo_detalle");
        expect(Number(response.body.subtotal)).toBe(newDetalle.subtotal);
    });
});

describe("GET /api/detalles/:idDetalle", () => {
    test("should respond with a single invoice detail", async () => {
        const newDetalle = {
            iva: 24.00,
            subtotal: 200.00,
            reserva_codigo: 1,  // Asociado a la reserva creada en beforeAll
            factura_codigo: 1  // Asociado a la factura creada en beforeAll
        };
        const createdDetalle = await request(app).post("/api/detalles").send(newDetalle);
        const detalleId = createdDetalle.body.codigo_detalle;
        const response = await request(app).get(`/api/detalles/${detalleId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_detalle).toBe(detalleId);
    });

    test("should respond with 404 if detail not found", async () => {
        const response = await request(app).get("/api/detalles/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Detalle no encontrado");
    });
});

describe("PUT /api/detalles/:idDetalle", () => {
    test("should update an existing invoice detail", async () => {
        const newDetalle = {
            iva: 36.00,
            subtotal: 300.00,
            reserva_codigo: 1,  // Asociado a la reserva creada en beforeAll
            factura_codigo: 1  // Asociado a la factura creada en beforeAll
        };
        const createdDetalle = await request(app).post("/api/detalles").send(newDetalle);
        const detalleId = createdDetalle.body.codigo_detalle;
        const updatedDetalle = {
            iva: 48.00,
            subtotal: 400.00,
            reserva_codigo: 1,  // Asociado a la reserva creada en beforeAll
            factura_codigo: 1  // Asociado a la factura creada en beforeAll
        };
        const response = await request(app).put(`/api/detalles/${detalleId}`).send(updatedDetalle);
        expect(response.statusCode).toBe(200);
        const detalleResponse = await request(app).get(`/api/detalles/${detalleId}`);
        expect(Number(detalleResponse.body[0].subtotal)).toBe(updatedDetalle.subtotal);
    });

    test("should respond with 404 if detail not found", async () => {
        const response = await request(app).put("/api/detalles/9999").send({
            iva: 60.00,
            subtotal: 500.00,
            reserva_codigo: 1,  // Asociado a la reserva creada en beforeAll
            factura_codigo: 1  // Asociado a la factura creada en beforeAll
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Detalle no encontrado");
    });
});

describe("DELETE /api/detalles/:idDetalle", () => {
    test("should delete an existing invoice detail", async () => {
        const newDetalle = {
            iva: 72.00,
            subtotal: 600.00,
            reserva_codigo: 1,  // Asociado a la reserva creada en beforeAll
            factura_codigo: 1  // Asociado a la factura creada en beforeAll
        };
        const createdDetalle = await request(app).post("/api/detalles").send(newDetalle);
        const detalleId = createdDetalle.body.codigo_detalle;
        const response = await request(app).delete(`/api/detalles/${detalleId}`);
        expect(response.statusCode).toBe(200);
        const detalleResponse = await request(app).get(`/api/detalles/${detalleId}`);
        expect(detalleResponse.statusCode).toBe(404);
        expect(detalleResponse.body).toHaveProperty("message", "Detalle no encontrado");
    });

    test("should respond with 404 if detail not found", async () => {
        const response = await request(app).delete("/api/detalles/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Detalle no encontrado");
    });
});
