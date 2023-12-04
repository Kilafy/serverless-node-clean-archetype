# Introducción

Este es un arquetipo para una arquitectura serverless, la idea principal para este
arquetipo es facilitar muchos procesos al desarrollador

## Responsabilidades del desarrollador

En este momento el arquetipo entrega un objeto de respuesta a la API desde el use case
en la capa app, el controlador del apigateway se implemento de forma general para
inicializar de diferentes formas. Sin embargo, el desarrollador aún tiene las siguientes
responsabilidades:

- Desarrollo de test
- Implementar la lógica de tu lambda
- Implementar tus servicios externos como bases de datos o llamadas a servicios aws

# Nota

Si modificas el controlador, esta bajo tu responsabilidad la ejecución exitosa de los test

# Explicación de directorios y flujo de trabajo

Aquí encontraras una explicación de las carpetas siguiendo los estándares de código:
[directorios](./docs/directorios.md)

# Scripts del Package.

Este proyecto utiliza scripts definidos en el package.json para ejecutar pruebas y generar informes de cobertura.

## Scripts Disponibles

`test`

```bash
npm run test
```

Ejecuta las pruebas utilizando Mocha y genera un informe de cobertura utilizando NYC (Istanbul). Utiliza el comando nyc mocha para ejecutar las pruebas.

`test-dev`

```bash
npm run test-dev
```

Ejecuta las pruebas utilizando Mocha con un informe detallado en formato spec y genera un informe de cobertura utilizando NYC. Utiliza el comando nyc --reporter=text mocha --reporter spec.

`coverage`

```bash
npm run coverage
```

Genera un informe de cobertura utilizando NYC, que a su vez ejecuta el comando nyc npm run test para realizar las pruebas y generar el informe de cobertura.