import express from 'express'
import { config as enableEnviromentVars } from 'dotenv'
import { userRouter, categoryRouter, recordRouter } from './routes'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT ?? 4000

export function setupServer(): void {
  enableEnviromentVars()
  app.use(express.json())

  app.listen(PORT, () => {
    console.log(`Server runing in port: ${PORT} 🚀`)
  })
}

app.get('/', (req, res) => {
  const domain = req.headers.host
  res.send(`El dominio del servidor es: ${domain}`)
})

export function routing(): void {
  app.use('/api/user', userRouter)
  app.use('/api/category', categoryRouter)
  app.use('/api/record', recordRouter)
}

export async function DBconnect(): Promise<void> {
  const optionsConnection: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI ?? '',
      optionsConnection
    )
    console.log(
      'Conectado a la base de datos 📀',
      connection.connection.db.databaseName
    )
  } catch (error: any) {
    console.error(
      `El error al momento de conectarse a la base de datos es: ${error}`
    )
  }
}

export function corsConfig(): void {
  const whiteList = [process.env.FRONTEND_URL, 'http://192.168.0.15:5173']
  const corsOptions = {
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void
    ) => {
      if (whiteList.includes(origin)) {
        callback(null, true)
      } else {
        const error = new Error('Sin acceso por política de CORS')
        callback(error)
      }
    }
  }
  app.use(cors(corsOptions))
}
