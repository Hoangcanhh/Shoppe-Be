
import JWT from 'jsonwebtoken'

/**
 * Function tạo mới một token cần 3 tham số đầu vào
 * userInfo: Những thông tin muốn đính kèm vào token
 * secretSignaturer: chứ ký bí mật(dạng chuỗi ngẫu nhiên) trên docs thì đề tên là privateKey tùy đều được
 * tokenLife: Thời gian sống của token
 */
const generateToken = async (userInfo, secretSignaturer, tokenLife) => {
    try {
        //Hàm sign là thư viện của jwt - thuật toán mặc định là HS256, cứ cho vào code để dễ nhớ kiến thức
        return JWT.sign(userInfo, secretSignaturer, {algorithm: 'HS256', expiresIn: tokenLife})

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

export const JwtProvider = {
    generateToken,
    verifyToken,  // Function này sử dụng JWT.verify() để xác thực token
}

