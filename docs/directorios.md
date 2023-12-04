# Explicación de directorios

## HandlerHttp

Nuestro `handlerHttp.ts` se encuentra en `src/handlerHttp.ts`, este es el punto donde
expondremos nuestras funciones en la definición del `serverless.yml` e inicializamos las
dependencias de las clases o funciones

## Utilidades

dentro de la carpeta `src` encontraras una carpeta llamada `utils`, en esta carpeta
se encuentras todas las clases o funciones que funcionen en varios servicios distintos.

Por otro lado, se encuentra el archivo de constantes, en el cual se guardaran todas
las constantes, enums, interfaces, types que se requieran en el proyecto para evitar
el hard code.

## Infrastructure

En infraestructura tenemos 2 sub carpetas: `driving` y `driven`

### Driving

Es el punto de entrada de la aplicación en la cuál expondremos al apigateway nuestra
función lambda, aquí se encuentra el controlador y las plantillas de zod

### Driven

Es el punto de conexión con nuestros repositorios, aquí podremos hacer nuestras llamadas
a bases de datos, servicios de aws como Step functions, lambdas, RDS, Dynamo Db

## App

En la carpeta `app` tenemos nuestra lógica de casos de uso, aquí llamaremos nuestros
repositorios de la capa infrastructure/driving

## Domain

En esta capa tendremos la definición de nuestros modelos de la aplicación y nuestros
repositorios, ambos serán interfaces que se exponen a las otras capas de nuestra aplicación

## Test

En la carpeta `test` tendremos una "copia" de nuestra carpeta `src`, aquí generamos nuestros
test y nuestros mocks para cumplir con un porcentaje de cobertura mínimo de 80% (recomendado: 85%)
