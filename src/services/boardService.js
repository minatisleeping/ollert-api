/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}
