import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🐾 API Clínica Veterinária',
      version: '1.0.0',
      description: 'API REST para gerenciamento de clínica veterinária com autenticação JWT, CRUD de pacientes, consultas e carteira de vacinação.',
      contact: {
        name: 'Suporte',
        email: 'contato@clinicapet.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://clinica-veterinaria-backend.onrender.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-123' },
            nome: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@example.com' }
          }
        },
        Pet: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nome: { type: 'string', example: 'Rex' },
            especie: { type: 'string', example: 'Cão' },
            raca: { type: 'string', example: 'Labrador' },
            idade: { type: 'number', example: 3 },
            donoNome: { type: 'string', example: 'João Silva' },
            donoTelefone: { type: 'string', example: '(83) 99999-1111' }
          }
        },
        Consulta: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            petNome: { type: 'string', example: 'Rex' },
            donoNome: { type: 'string', example: 'João Silva' },
            donoTelefone: { type: 'string', example: '(83) 99999-1111' },
            veterinario: { type: 'string', example: 'Dr. Carlos' },
            motivo: { type: 'string', example: 'Vacina anual' },
            data: { type: 'string', example: '2025-11-25' },
            hora: { type: 'string', example: '10:00' }
          }
        },
        Vacina: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            nome: { type: 'string', example: 'V10' },
            descricao: { type: 'string', example: 'Vacina múltipla completa' },
            precoFilhote: { type: 'number', example: 100 },
            precoAdulto: { type: 'number', example: 110 },
            idadeMinima: { type: 'number', example: 8 }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Mensagem de erro' }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Clínica Veterinária - Documentação'
  }));
  
  console.log('📚 Swagger disponível em: http://localhost:3000/api-docs');
};