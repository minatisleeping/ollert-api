import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // console.log('🚀 ~ createNew ~ req.body:', req.body)
    // console.log('🚀 ~ createNew ~ req.query:', req.query)
    // console.log('🚀 ~ createNew ~ req.params:', req.params)

    // Điều hướng data sang tầng Service

    // Trả về kết quả cho Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation layer: API create new boards' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
