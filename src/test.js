const models = require("./models");

const getUser = async () => {
   try {
      const data = await models.User.findOne({
         where: {
            username: "admin",
         },
         include: [
            {
               model: models.Role,
               as: "role_data",
            },
         ],
         raw: true,
      });

      console.log(data);
   } catch (error) {
      console.log(error);
   }
};

const getProduct = async () => {
   try {
      const data = await models.Product.findAll({
         attributes: ["name"],
         // raw: true,
      });


      data.map(item => console.log('check item', item.name))

      // console.log(data);
   } catch (error) {
      console.log(error);
   }
};

const getVariant = async () => {
   const data = await models.Product_Variant.findAll({ where: { product_id: ["iphone-11", 'iphone-12']}});

   console.log(data);
   return;
};

const getBrand = async () => {
   const data = await models.Brand.findAll({ group: 'category_id' });

   console.log(data);
   return;
};

// getUser()
// getVariant();
// getBrand()

console.log([''].length)

// console.log({...{}})
