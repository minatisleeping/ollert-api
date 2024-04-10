import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required..',
      'string.empty': 'Title is not allowed to be empty..',
      'string.min': 'Title length must be at least 3 chars long..',
      'string.max': 'Title length must be less than or equal to 5 chars long..',
      'string.trim': 'Title must not have leading or trailing whitespace..'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    /**
     * Note: Mặc định mình k cần phải custom message & phía BE vi để cho Front-end validate và custom
      message phía FE cho dep.
      * Back-end chỉ cần validate đảm bảo data chuẩn xác, và trả về message mặc định từ thư viện là được.
      * Quan trong: Viêc validate data BẮT BUỘC phải có ở phia Back-end vì đây là điểm cuối để lưu trû data vào db.
      * và thông thường trong thực tê, điều tôt nhất cho hệ thông là häy luôn validate dữ Lieu & cà Back-end và Front-end nhé.
    */

    // ! abortEarly: false: trả về tất cả các lỗi không chỉ lỗi đầu tiên
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation layer: API create new boards' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}

