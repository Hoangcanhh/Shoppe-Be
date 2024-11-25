
import JWT from 'jsonwebtoken'

/**
 * Function tạo mới một token cần 3 tham số đầu vào
 * userInfo: Những thông tin muốn đính kèm vào token
 * secretSignaturer: chứ ký bí mật(dạng chuỗi ngẫu nhiên) trên docs thì đề tên là privateKey tùy đều được
 * tokenLife: Thời gian sống của token
 */
// const tokenLife = '1h';
const generateToken = async (userInfo, secretSignaturer) => {
    try {
        //Hàm sign là thư viện của jwt - thuật toán mặc định là HS256, cứ cho vào code để dễ nhớ kiến thức
        return JWT.sign(userInfo, secretSignaturer, {algorithm: 'HS256', expiresIn: '1h'})

    } catch (error) { throw new Error(error) 

    }
}
//Function kiểm tra 1 token có hợp lệ hay không
//hợp lệ ở đây hiểu đơn giản là cái token được tạo ra có đúng với cái chữ kí bí mật secreSignature trong dự án hay không
const verifyToken = async (token, secretSignaturer) => {
    try {
        //hàm verify của jwt
        return JWT.verify(token, secretSignaturer)
    } catch (error) { throw new Error(error) 

    }
}
/**
 * 2 cái chữ ký bí mật quan trọng trong dự án. Dành cho JWT - Jsonwebtokens
 * Lưu ý phải lưu vào biến môi trường ENV trong thực tế cho bảo mật.
 * Ở đây mình làm Demo thôi nên mới đặt biến const và giá trị random ngẫu nhiên trong code nhé.
 * Xem thêm về biến môi trường: https://youtu.be/Vgr3MWb7aOw
 */
export const ACCESS_TOKEN_SECRET_SIGNATURE = 'KBgJwUETt4HeVD05WaXXI9V3JnwCVP'
export const REFRESH_TOKEN_SECRET_SIGNATURE = 'fcCjhnpeopVn2Hg1jG75MUi62051yL'

export const JwtProvider = {
    generateToken,
    verifyToken,  // Function này sử dụng JWT.verify() để xác thực token
}

