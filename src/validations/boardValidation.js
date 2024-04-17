import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required..',
      'string.empty': 'Title is not allowed to be empty..',
      'string.min': 'Title length must be at least 3 chars long..',
      'string.max': 'Title length must be less than or equal to 50 chars long..',
      'string.trim': 'Title must not have leading or trailing whitespace..'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict().messages({
      'any.required': 'Description is required..',
      'string.empty': 'Description is not allowed to be empty..',
      'string.min': 'Description length must be at least 3 chars long..',
      'string.max': 'Description length must be less than or equal to 255 chars long..',
      'string.trim': 'Description must not have leading or trailing whitespace..'
    }),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // ! Note: Mặc định mình k cần phải custom message & phía BE vi để cho Front-end validate và custom message phía FE cho đẹp
    /**
      * * Back-end chỉ cần validate đảm bảo data chuẩn xác, và trả về message mặc định từ thư viện là được.
      * * Quan trong: Viêc validate data BẮT BUỘC phải có ở phia Back-end vì đây là điểm cuối để lưu trữ data vào db.
      **và thông thường trong thực tê, điều tôt nhất cho hệ thông là häy luôn validate data & cà Back-end và Front-end.
    */
    // ! abortEarly: false: trả về tất cả các lỗi không chỉ lỗi đầu tiên
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    // const errMsg = new Error(error).message
    // const customErr = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errMsg)
    // next(customErr)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  //* K require khi update
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true //* K cho phép validate các key không được định nghĩa trong schema
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  //* K require khi update
  const correctCondition = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevColumnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),
    nextColumnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumn
}
