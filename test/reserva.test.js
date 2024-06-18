import request from "supertest";
import express from "express";
import { reservaRouter } from "../src/routes/reserva.route.js";
import { sequelize } from '../src/database/database.js';
import { Usuario } from '../src/models/usuario.js';
import { Cliente } from '../src/models/cliente.js';
import { Habitacion } from '../src/models/habitacion.js';

const app = express();
app.use(express.json());
app.use('/api/reservas', reservaRouter);

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Crear un usuario, cliente y habitación para las pruebas
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

    await Habitacion.create({
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
            habitacion_codigo: 1,  // Asociado a la habitación creada en beforeAll
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const response = await request(app).post("/api/reservas").send(newReserva);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("codigo_reserva");
        const fechaEntradaActual = new Date(response.body.fecha_entrada).toISOString().split('T')[0];
        expect(fechaEntradaActual).toBe(newReserva.fecha_entrada);
    });
});

describe("GET /api/reservas/:idReserva", () => {
    test("should respond with a single reservation", async () => {
        const newReserva = {
            fecha_entrada: "2024-06-16",
            fecha_salida: "2024-06-21",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            habitacion_codigo: 1,  // Asociado a la habitación creada en beforeAll
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
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
            fecha_entrada: "2024-06-17",
            fecha_salida: "2024-06-22",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            habitacion_codigo: 1,  // Asociado a la habitación creada en beforeAll
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const createdReserva = await request(app).post("/api/reservas").send(newReserva);
        const reservaId = createdReserva.body.codigo_reserva;
        const updatedReserva = {
            fecha_entrada: "2024-07-01",
            fecha_salida: "2024-07-06",
            personas: 3,
            numero_habitaciones: 2,
            numero_adultos: 3,
            numero_ninios: 0,
            habitacion_codigo: 1,  // Asociado a la habitación creada en beforeAll
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        };
        const response = await request(app).put(`/api/reservas/${reservaId}`).send(updatedReserva);
        expect(response.statusCode).toBe(200);
        const reservaResponse = await request(app).get(`/api/reservas/${reservaId}`);
        const fechaEntradaActual = new Date(reservaResponse.body[0].fecha_entrada).toISOString().split('T')[0];
        expect(fechaEntradaActual).toBe(updatedReserva.fecha_entrada);
    });

    test("should respond with 404 if reservation not found", async () => {
        const response = await request(app).put("/api/reservas/9999").send({
            fecha_entrada: "2024-07-02",
            fecha_salida: "2024-07-07",
            personas: 4,
            numero_habitaciones: 2,
            numero_adultos: 4,
            numero_ninios: 0,
            habitacion_codigo: 1,  // Asociado a la habitación creada en beforeAll
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
        });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Reserva no encontrada");
    });
});

describe("DELETE /api/reservas/:idReserva", () => {
    test("should delete an existing reservation", async () => {
        const newReserva = {
            fecha_entrada: "2024-06-18",
            fecha_salida: "2024-06-23",
            personas: 2,
            numero_habitaciones: 1,
            numero_adultos: 2,
            numero_ninios: 0,
            habitacion_codigo: 1,  // Asociado a la habitación creada en beforeAll
            cliente_codigo: 1  // Asociado al cliente creado en beforeAll
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
