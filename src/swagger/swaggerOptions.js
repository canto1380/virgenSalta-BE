export const options = {
  definition: {
    openapi: '3.0.0',
    info   : {
      title      : 'Virgen Salta API',
      version    : '1.0.0',
      description: 'API para la gestión de la Virgen de Salta.I'
    },
    servers: [
      {
        url: 'http://localhost:4001'
      }
    ],
    tags: [
      {
        name: "Inicio Sesion",
        description: "Ruta login"
      },
      {
        name: "Usuarios",
        description: "Rutas de Usuarios"
      },

    ],
    
    paths: {
      "/signin":{
        post: {
          summary: "Redirige al panel Admin",
          tags: ["Inicio Sesion"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema:{
                  $ref: '#/components/schemas/User'
                }
              }
            },
          },
          responses: {
            200: {
              description: "Datos del usuario",
            },
            404: {
              description: "Error en el usuario o clave ingresada"
            },
            500: {
              description: "Error en el servidor"
            }
          }
        }
      },
      "/users":{
        get: {
          parameters: [{
            name: "Authorization",
            in: "header",
            description: "Token devuelto en el login",
            required: true,
            type: "string"
          }],
          summary: "Retorna todos los usuarios",
          tags: ["Usuarios"],
          responses: {
            200: {
              description: "Lista de usuarios",
              content: {
                "application/json":{
                  schema:{
                    type:"array",
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            },
            401: {
              description:"Ingreso no autorizado. Token inexistente o erroneo"
            },
            400: {
              description: "Error en la consulta. Intente nuevamente"
            }
          }
        }
      },
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["email", "name","surname", "password"],
          properties: {
            id: {
              type: "string",
              description: "ID autogenerado por la base de datos"
            },
            avatar: {
              type: "string",
              description: "Avatar"
            },
            email: {
              type: "string",
              description: "Email"
            },
            name: {
              type: "string",
              description: "Nombres"
            },
            surname: {
              type: "string",
              description: "Apellidos"
            },
            nickname: {
              type: "string",
              description: "Iniciales"
            },
            password: {
              type: "string",
              description: "Clave encriptada"
            },
            phone: {
              type: "number",
              description: "Telefono"
            },
            birthdate: {
              type: "date",
              description: "Fecha de nacimiento"
            },
            emailValidate: {
              type: "boolean",
              description: "Email validado"
            },
            passExpiration: {
              type: "date",
              description: "Fecha de expiracion de la clave"
            },
            lastSession: {
              type: "string",
              description: "Ultimo inicio de sesion"
            },
            lastPassIncorrect: {
              type: "string",
              description: "Ultima clave incorrecta ingresada"
            },
            counterPassIncorrect: {
              type: "number",
              description: "Cantidad de ingresos incorrectos de la clave. Hasta 3 seguidos."
            },
            deleted: {
              type: "boolean",
              description: "Borrado logico."
            },
          },
          UserNotFound: {
            type: "object",
            properties: {
              msg: "string",
              description: "No se encontraron usuarios."
            }
          }
        }
      }
    }
  },
  apis: [ './src/routes/*.js' ]
}
