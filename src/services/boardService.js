/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'

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

    //* B1: cloneDeep: clone api getBoard ra 1 cái mới để xử lí, k modify board ban đầu
    const resBoard = cloneDeep(board)

    //* B2: Đưa Card về đúng Column của nó
    resBoard.columns.forEach(column => {
      //? Cách dùng equals() của mongodb support để so sánh 2 ObjectId
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      //? Cách dùng toString() là để convert ObjectId sang String để so sánh, hàm này của JS
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString()) //! filter() return new array -> khá là hay
    })

    //* B3: Xoá mảng Cards khỏi Board ban đầu
    delete resBoard.cards // API của mình k cần cards nữa, nói chung cứ nhìn res là biết phải thêm or xoá cái nào

    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}
