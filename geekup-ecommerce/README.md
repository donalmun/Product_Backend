# GeekUp E-commerce Backend

## 1. Cài đặt và khởi tạo dự án

```sh
npm install
```

## 2. Khởi tạo MySQL bằng Docker (khuyên dùng cho môi trường dev)

```sh
docker run --name mysql-geekup -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:8
```

- Thay `yourpassword` bằng mật khẩu bạn muốn đặt cho user root.
- Đảm bảo cổng 3306 chưa bị ứng dụng khác chiếm dụng.

## 3. Thiết lập kết nối database

- Tạo file `.env` ở thư mục gốc với nội dung:
  ```env
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=geekupdb
  ```
- Đảm bảo container MySQL đã chạy (`docker ps`).

## 4. Tạo database (nếu chưa có)

- **Cách 1: Tạo thủ công qua MySQL shell:**
  - Kết nối vào MySQL container:
    ```sh
    docker exec -it mysql-geekup mysql -u root -p
    ```
  - Trong MySQL shell, tạo database:
    ```sql
    CREATE DATABASE geekupdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```
- **Cách 2: Tạo tự động bằng NodeJS:**
  - Chạy script có sẵn:
    ```sh
    node create_db.js
    ```
  - Script này sẽ tự động tạo database `geekupdb` nếu chưa có, dựa trên thông tin trong file `.env`.

## 5. Chạy migration để tạo bảng

```sh
npx sequelize-cli db:migrate
```

## 6. Seed mockdata vào database

```sh
npx sequelize-cli db:seed:all
```

## 7. Chạy ứng dụng

```sh
node index.js
```

---

## 8. Các câu truy vấn SQL (theo yêu cầu đề bài)

### a) Insert order mẫu cho user "assessment"

<!-- Viết câu SQL ở đây -->

### b) Tính trung bình giá trị đơn hàng theo tháng

<!-- Viết câu SQL ở đây -->

### c) Tính churn rate khách hàng

<!-- Viết câu SQL ở đây -->

---

## 9. Ghi chú

- Nếu gặp lỗi khi seed, hãy kiểm tra thứ tự seed và dữ liệu khóa ngoại.
- Nếu thay đổi migration, hãy rollback và migrate lại từ đầu.
- Nếu dùng Docker, có thể dùng lệnh `docker stop mysql-geekup` để tắt container khi không dùng nữa.
