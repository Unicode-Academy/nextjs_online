# Parallel Routes

Parallel Routes là một tính năng mạnh mẽ trong Next.js App Router (giới thiệu từ Next.js 13), cho phép render đồng thời nhiều trang hoặc thành phần trong cùng một layout mà vẫn đảm bảo khả năng điều hướng độc lập

## Parallel Routes là gì?

Parallel Routes cho phép hiển thị nhiều slot trong cùng một layout, mỗi slot có thể render một Page hoặc Component riêng biệt.

Các slot này hoạt động độc lập, nghĩa là chúng có thể có trạng thái tải (loading), lỗi (error) riêng, và người dùng có thể điều hướng trong từng slot mà không ảnh hưởng đến các slot khác.

- Ứng dụng thực tế: Parallel Routes đặc biệt hữu ích trong các ứng dụng có giao diện phức tạp, như dashboard, mạng xã hội, hoặc các trang cần hiển thị nhiều nội dung động cùng lúc (ví dụ: hiển thị đồng thời danh sách bài viết và thông tin người dùng).

- Đặc điểm chính:

* Render đồng thời nhiều trang trong cùng layout.
* Mỗi slot có thể có trạng thái tải và lỗi độc lập.
* Không ảnh hưởng đến cấu trúc URL (slots không phải là segment trong URL).

## Cách hoạt động của Parallel Routes

Parallel Routes được định nghĩa bằng cách sử dụng named slots với quy ước @folder. Mỗi slot là một thư mục bắt đầu bằng ký tự @ trong cấu trúc thư mục của Next.js App Router.

Cấu trúc thư mục:

Ví dụ: Muốn tạo một dashboard hiển thị đồng thời hai slot @team và @analytics cùng với nội dung chính (children):

```
app/
├── dashboard/
│   ├── @team/
│   │   └── page.tsx
│   ├── @analytics/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
```

- @team và @analytics: Đây là các slot, đại diện cho các nội dung độc lập.
- page.tsx trong dashboard/: Đại diện cho nội dung chính (implicit slot children).
- layout.tsx: Nơi render các slot và nội dung chính.

Ví dụ layout.tsx:

Trong file app/dashboard/layout.tsx, nhận các slot dưới dạng props và render chúng:

```ts
export default function DashboardLayout({
  children, // Nội dung chính (page.tsx trong dashboard/)
  team, // Nội dung của @team
  analytics, // Nội dung của @analytics
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <section>{team}</section>
      <section>{analytics}</section>
    </div>
  );
}
```

- children: Render nội dung của dashboard/page.tsx.
- team: Render nội dung của dashboard/@team/page.tsx.
- analytics: Render nội dung của dashboard/@analytics/page.tsx.

Kết quả:
Khi truy cập /dashboard, cả ba nội dung (children, team, analytics) sẽ được render đồng thời trong cùng một layout.
