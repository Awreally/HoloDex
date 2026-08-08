import 'dotenv/config'
import express from 'express'
import { prisma } from './lib/prisma'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok' })
  } catch {
    res.status(503).json({ status: 'db unavailable' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
