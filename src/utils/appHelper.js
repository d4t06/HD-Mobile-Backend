const generateId = (name) => {
   const convertToEn = (str) => {
      const newString = str
         .toLocaleLowerCase()
         .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a")
         .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
         .replace(/ì|í|ị|ỉ|ĩ/g, "i")
         .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ/g, "o")
         .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
         .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
         .replace(/đ/g, "d");
      return newString;
   };
   return convertToEn(name).replaceAll(/[\W_]/g, "-");
};

const convertDate = (dateString) => {
   const mysqlDate = new Date(dateString);
   const currentDate = new Date();

   const daysDiff = (currentDate - mysqlDate) / (1000 * 60 * 60 * 24);
   // if rather than a month
   if (daysDiff > 30) return mysqlDate.toLocaleDateString("en-gb");

   // if less than a month
   if (daysDiff < 1) {
      const timeDiff = Math.floor(daysDiff * 24);
      if (timeDiff === 0) return `Less than a hour`;
      return `${timeDiff} hours ago`;
   }

   return `${Math.floor(daysDiff)} days ago`;
};

module.exports = { generateId, convertDate };
