/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //* Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào db
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log('🚀 ~ createNew ~ createdBoard:', createdBoard)

    //* Thường thì create(add) xong thì show ra luôn cho user xem(vary on each project)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log('🚀 ~ createNew ~ getNewBoard:', getNewBoard)

    //* Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')

    //* Trả kết quả về, trong Service luôn phải có return
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}
