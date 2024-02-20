### update thứ 6 31/3/2023
-  res.locals chu khong phai req.locals
-  /refresh trong auth router
-  Fix logic pagination, mỗi trang chỉ trả về pageSize phần tử trang đó


### update thứ 3 9/1/2024
- Localhost và github.io phải được thêm vào white list khi deploy
- Thêm dialectModule: require("mysql2") vào sequelize config để fix lỗi
'install mysql2 manually'

### update thu 3 23/1/2024
- Gợp chung các route cần thiết lại với nhau, tách các controller

### update thu 3 20/2/2024
- Fix route /products/details