import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('🚀 ~ createNew ~ req.body:', req.body)
    // console.log('🚀 ~ createNew ~ req.query:', req.query)
    // console.log('🚀 ~ createNew ~ req.params:', req.params)

    // Điều hướng data sang tầng Service
    const createdBoard = await boardService.createNew(req.body)

    // Trả về kết quả cho Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    // console.log('🚀 ~ createNew ~ req.params:', req.params)

    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew,
  getDetails
}
