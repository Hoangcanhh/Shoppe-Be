
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { JwtProvider, ACCESS_TOKEN_SECRET_SIGNATURE, REFRESH_TOKEN_SECRET_SIGNATURE } from '~/providers/JwtProvider'

/**
 * Mock nhanh thông tin user thay vì phải tạo Database rồi query.
 * Nếu muốn học kỹ và chuẩn chỉnh đầy đủ hơn thì xem Playlist này nhé:
 * https://www.youtube.com/playlist?list=PLP6tw4Zpj-RIMgUPYxhLBVCpaBs94D73V
 */
const MOCK_DATABASE = {
  USER: {
    ID: 'canhhoang-sample-id-12345678',
    EMAIL: 'canhhoang@gmail.com',
    PASSWORD: '123456'
  }
}



const login = async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.email !== MOCK_DATABASE.USER.EMAIL || req.body.password !== MOCK_DATABASE.USER.PASSWORD) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Your email or password is incorrect!' })
      return 
    } 

    // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
    // tạo thông tin payload để đính kèm trong jwt token bao gồm id, email của user
     const userInfo = {
      id: MOCK_DATABASE.USER.ID,
      email: MOCK_DATABASE.USER.EMAIL
     }
     //tạo 2 loại token, accessToken và refreshToken để trả về phía FE
     const accessToken = await JwtProvider.generateToken(userInfo, ACCESS_TOKEN_SECRET_SIGNATURE, { expiresIn: '10h' })
     const refreshToken = await JwtProvider.generateToken(userInfo, REFRESH_TOKEN_SECRET_SIGNATURE, { expiresIn: '2d' })

     //xử lý trường hợp trả về http cookie cho phía trình duyệt
     // về cái maxAge và thư việnms
     // đối với cái maxAge - thời gian sống của cookie thì chúng ta sẽ để tối đa 14 days, tùy dự án
     // thời gian sống của cookie khác với thời gian sống của token
     res.cookie('accessToken', accessToken, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('2d'),
      })
     res.cookie('refreshToken', refreshToken, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('2d'),
      })

      //trả về thông tin của user cũng như sẽ trả về token cho trường hợp phía FE cần lưu Tokens vào localStorage

    res.status(StatusCodes.OK).json({ 
      ...userInfo,
      accessToken,
      refreshToken
     })
  } catch (error) {
    console.log('err', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: 'Logout API success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    // Do something
    res.status(StatusCodes.OK).json({ message: ' Refresh Token API success.' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  login,
  logout,
  refreshToken
}
