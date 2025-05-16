import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API para geração de relatório de pacientes',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, '../docs/*.yaml')],
}

export const swaggerSpec = swaggerJSDoc(options)
export { swaggerUi }
