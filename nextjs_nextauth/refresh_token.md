# Cách xử lý Refresh Token

- Login --> Access Token và Refresh Token --> Lưu vào localStorage hoặc cookie
- Call Protected API --> Đọc access token --> Gửi lên Back-End

* Nếu accessToken hợp lệ: Back-end trả về dữ liệu
* Nếu accessToken bị hết hạn hoặc không hợp lệ --> Back-end trả về lỗi 401 --> Gọi API Refresh token (Kèm theo refresh token đã lưu) --> Access token mới --> Lưu vào localStorage hoặc oookie và gọi lại Protected API bị failed

Luồng NextAuth: signIn() --> jwt() --> session()

Login --> accessToken, refreshToken, tính được thời gian hết hạn
