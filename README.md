**Proyecto de reservas de hoteles**


En este proyecto se va a realizar la parte del backend para gestionar las funcionalidades del programa y conexion con la base de datos con el uso de node.js

**Diagramas**

![Imagen del diagrama](./imagenes/Screenshot%20from%202024-06-12%2008-45-03.png)

![Imagen del diagrama](./imagenes/Screenshot%20from%202024-06-12%2008-42-26.png)

Para crear el proyecto seguimos los siguientes pasos:

1. crear un directorio y acceder a el
2. establecer el directorio como predeterminado con
        
        npm init -y // -y: set with package.json

3. instalamos express
       
        npm i express

4. instalamos nodomon
      
        npm i -D nodemon //// -D: set as a development dependency

5. index para la configuracion
6. ponemos en el package.json que ejecute el servidor con nodemon
   
        "main": "server.js",

        "scripts": {

        "dev": "nodemon server.js"

                   },

7. nodejs viene por defecto con CommonJS para poder usar ECMAScripts agregamos en el package.json, en la imagen a continuacion se podra ver como queda el package.json                    
    
        "type": "module"

8. creamos un archivo .env en la raíz del proyecto que contenga los siguientes campos (opcional):
    - PORT
    - USER_DB
    - PASSWORD_DB
    - HOST_DB
    - DATABASE
    - PORT_DB
9. ejecutamos
        
        npm run dev

Una vez creado el proyecto instalamos los siguiente:
 
Para usar las variables de entorno intalamos dotenv

    npm install dotenv

Para usar la base de datos se usa pg

    npm install pg

Para ver mensajes por consola de las solicitudes que han hecho
    
    npm install morgan

Instalamos un orm en este caso sequelize para facilitarnos la creacion de tablas

    npm install sequelize pg pg-hstore

Despues de aplicar los pasos anteriores asi nos queda el package.json

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-22-12.png)

Ahora creamos los ficheros para las clases,controladores,rutas,asociaciones,base de datos.

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-26-13.png)

**Clases**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-28-21.png)

Aqui presento el codigo de una de las clases

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-47-10.png)

**Controladores**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-32-26.png)

Codigo de uno de los controladores

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-47-54.png)

**Rutas**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-35-03.png)

Codigo de una de las rutas

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-48-43.png)

**Asociaciones**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-35-43.png)

Las asociaciones queda de la siguiente manera

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-49-07.png)

**Base de Datos**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-37-03.png)

Para la conexion con la base de datos usamos el siguiente codigo:

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-45-29.png)

Ya con todo el proyecto creado el index para la ejecucion del backend queda de la siguiente manera

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-38-01.png)

Ahora ejecutamos y probamos en postman 

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-39-12.png)

Pruebas en postman

Listar 

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-40-12.png)

Crear

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-42-31.png)

Listar con el nuevo cliente creado

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-11%2021-43-21.png)


**Testing**

Para realizar el test vamos a usar jest y supertest 

    npm install -D  jest supertest

jest no reconoce el module por lo que hay que agregarle 
    
    set NODE_OPTIONS= --experimental-vm-modules && npx jest

pero para no poner esto en consola y solo mandar a ejecutar le cambiamos en el package.json en la parte de "test" de la seccion scripts poniendo lo siguiente:

    "test": "NODE_OPTIONS=--experimental-vm-modules jest"

en windows es:

    "test": "set NODE_OPTIONS=--experimental-vm-modules && jest"
    
Despues de eso mandamos en la consola el comando para ejecutar para ver si funciona (va a dar error por no tener las pruebas)

     npm test

Captura de la primera ejecucion sin pruebas en los archivos 

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-52-33.png)

Ahora empezamos hacer las pruebas para cada clase

**Cliente**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-45-25.png)

**Factura Cabecera**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-45-36.png)

**Factura Detalle**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-45-40.png)

**Habitacion**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-45-45.png)

**Reserva**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-45-49.png)

**Usuario**

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-45-52.png)


Al inicio esto nos salio cuando lo ejecutamos por primera vez

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-17%2022-50-48.png)

Despues de corregir los errores queda asi la terminal 

![imagane el package.json](./imagenes/Screenshot%20from%202024-06-18%2000-58-18.png)

