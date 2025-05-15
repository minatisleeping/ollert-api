/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

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

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    return await boardModel.update(boardId, updateData)
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    //* B1: Update cardOrderIds của Column ban đầu chứa nó (bản chất là xáo cái _id của Card ra khỏi mảng)
    columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })

    //* B2: Update mảng cardOrderIds của Column tiếp theo (bản chất là thêm _id của Card vào mảng)
    columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })

    //* B3: Update lại columnId mới của Card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully!' }
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
