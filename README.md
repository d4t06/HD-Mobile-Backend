## chạy xampp

sudo /opt/lampp/manager-linux-x64.run
sudo /opt/lampp/xampp startmysql
npx sequelize-cli db:migrate

-  res.locals chu khong phai req.locals

### update thứ 6 31/3/2023

-  /refresh trong auth router
-  Fix logic pagination, mỗi trang chỉ trả về pageSize phần tử trang đó
