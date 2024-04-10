import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoutes'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API_v1 is ready to use!' })
})

// Boards APIs
Router.use('/boards', boardRoute)

export const API_v1 = Router
