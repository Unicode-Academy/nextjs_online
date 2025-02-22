import Login from "./_components/Login";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Login />
    </div>
  );
}

/*
Callbacks: 

jwt → Thêm dữ liệu vào token trước khi gửi về client.
session → Thêm dữ liệu vào session, giúp client truy cập thông tin.
signIn → Chặn hoặc cho phép đăng nhập dựa vào điều kiện.
redirect → Điều hướng người dùng sau khi đăng nhập hoặc đăng xuất.
authorized (Middleware) → Kiểm soát truy cập API.
*/
