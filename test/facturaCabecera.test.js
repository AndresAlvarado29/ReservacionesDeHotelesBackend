import request from "supertest";
import express from "express";
import { cabeceraRouter } from "../src/routes/facturaCabecera.route.js";
import { sequelize } from '../src/database/database.js';
import { Cliente } from '../src/models/cliente.js';
import { Usuario } from '../src/models/usuario.js';

const app = express();
app.use(express.json());
app.use('/api/facturas', cabeceraRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Crear un usuario y un cliente para las pruebas
    const usuario = await Usuario.create({
        usuario: "testuser",
        clave: "testpassword",
        email: "testuser@example.com"
    });

    await Cliente.create({
        cedula: "1234567890",
        nombres: "Juan",
        apellidos: "Perez",
        direccion: "Av. Siempre Viva 742",
        telefono: "0987654321",
        correo: "juan.perez@example.com",
        fecha_nacimiento: "1985-01-01",
        usuario_codigo: usuario.codigo_usuario
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe("GET /api/facturas", () => {
    test("should respond with an array of invoices", async () => {
        const response = await request(app).get("/api/facturas");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /api/facturas", () => {
    test("should create a new invoice", async () => {
        const newFactura = {
            fecha_emision: "2024-06-15",
            tipo_pago: "Tarjeta de crédito",
            subtotal: 100.00,
            iva: 12.00,
            total: 112.00,
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const response = await request(app).post("/api/facturas").send(newFactura);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("codigo_factura");
        expect(Number(response.body.total)).toBe(newFactura.total);
    });
});

describe("GET /api/facturas/:idCabecera", () => {
    test("should respond with a single invoice", async () => {
        const newFactura = {
            fecha_emision: "2024-06-16",
            tipo_pago: "Efectivo",
            subtotal: 200.00,
            iva: 24.00,
            total: 224.00,
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const createdFactura = await request(app).post("/api/facturas").send(newFactura);
        const facturaId = createdFactura.body.codigo_factura;
        const response = await request(app).get(`/api/facturas/${facturaId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].codigo_factura).toBe(facturaId);
    });

    test("should respond with 404 if invoice not found", async () => {
        const response = await request(app).get("/api/facturas/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Factura no encontrado");
    });
});

describe("PUT /api/facturas/:idCabecera", () => {
    test("should update an existing invoice", async () => {
        const newFactura = {
            fecha_emision: "2024-06-17",
            tipo_pago: "Transferencia",
            subtotal: 300.00,
            iva: 36.00,
            total: 336.00,
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const createdFactura = await request(app).post("/api/facturas").send(newFactura);
        const facturaId = createdFactura.body.codigo_factura;
        const updatedFactura = {
            fecha_emision: "2024-07-01",
            tipo_pago: "Cheque",
            subtotal: 350.00,
            iva: 42.00,
            total: 392.00,
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const response = await request(app).put(`/api/facturas/${facturaId}`).send(updatedFactura);
        expect(response.statusCode).toBe(200);
        const facturaResponse = await request(app).get(`/api/facturas/${facturaId}`);
        expect(Number(facturaResponse.body[0].total)).toBe(updatedFactura.total);
    });

    test("should respond with 404 if invoice not found", async () => {
        const response = await request(app).put("/api/facturas/9999").send({
            fecha_emision: "2024-07-02",
            tipo_pago: "Efectivo",
            subtotal: 400.00,
            iva: 48.00,
            total: 448.00,
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Factura no encontrado");
    });
});

describe("DELETE /api/facturas/:idCabecera", () => {
    test("should delete an existing invoice", async () => {
        const newFactura = {
            fecha_emision: "2024-06-18",
            tipo_pago: "Tarjeta de débito",
            subtotal: 500.00,
            iva: 60.00,
            total: 560.00,
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const createdFactura = await request(app).post("/api/facturas").send(newFactura);
        const facturaId = createdFactura.body.codigo_factura;
        const response = await request(app).delete(`/api/facturas/${facturaId}`);
        expect(response.statusCode).toBe(200);
        const facturaResponse = await request(app).get(`/api/facturas/${facturaId}`);
        expect(facturaResponse.statusCode).toBe(404);
        expect(facturaResponse.body).toHaveProperty("message", "Factura no encontrado");
    });

    test("should respond with 404 if invoice not found", async () => {
        const response = await request(app).delete("/api/facturas/9999");
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Factura no encontrado");
    });
});
