const { Op } = require("sequelize");
const models = require("../models");

function errorRes(res, msg) {
  return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class AppController {
  async getAllCategory(req, res, next) {
    try {
      const categories = await models.Category.findAll({
        where: { default: { [Op.is]: null } },
        include: {
          model: models.Category_Attribute,
          as: "attributes",
        },
      });
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async addCategory(req, res) {
    try {
      const category = req.body;
      if (!category) {
        return res.status(402).json({ status: "error", message: "missing payload" });
      }

      const newCategory = await models.Category.create({ ...category });

      res.json(newCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const category = req.body;
      if (!category || !category.id) {
        return res.status(402).json({ status: "error", message: "missing payload" });
      }

      await models.Category.update({ ...category }, { where: { id: category.id } });
      res.json({ message: "update category successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    if (!id) return errorRes(res);

    try {
      await models.Category.destroy({ where: { id: id } });
      res.status(201).json({
        status: "successful",
        message: "delete category successful",
      });
    } catch (error) {
      console.log(error);
      res.status(501).json({ status: "fail", message: error });
    }
  }

   async getCategoryAttributes(req, res) {
    try {
      const { id } = req.params;
      if (id === undefined) return errorRes(res);

      const data = await models.Category_Attribute.findAll({ where: { category_id: id } });

      res.status(200).json({
        status: "successful",
        message: "get all category attribute successful",
        data
      });

    } catch (error) {
      console.log(error);
      res.status(501).json({ status: "fail", message: error });
    }
  }




  async addAttribute(req, res) {
    try {
      const attr = req.body;
      if (!attr) {
        return errorRes(res)
      }

      const newAttr = await models.Category_Attribute.create(attr);

      res.json({
        status: 'successful',
        message: 'add category attribute successful',
        data: newAttr
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateAttribute(req, res) {
    try {
      const attr = req.body;
      if (!attr || attr.id === undefined) return errorRes(res)
      

      await models.Category_Attribute.update(attr, { where: { id: attr.id } });
      res.json({ message: "update category attribute successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAttribute(req, res) {
    const { id } = req.params;
    if (id === undefine) return errorRes(res);

    try {
      await models.Category_Attribute.destroy({ where: { id: id } });
      res.status(201).json({
        status: "successful",
        message: "delete category attribute successful",
      });
    } catch (error) {
      console.log(error);
      res.status(501).json({ status: "fail", message: error });
    }
  }



  async getAllBrand(req, res, next) {
    try {
      const { category_id } = req.query;

      if (!category_id) return errorRes(res);

      const brands = await models.Brand.findAll({ where: { category_id } });
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addBrand(req, res) {
    try {
      const brand = req.body;
      if (!brand) {
        return res.status(402).json({ status: "finish", message: "missing payload" });
      }

      const newBrand = await models.Brand.create({ ...brand });

      res.json({ status: "200", message: "Add brand successful", data: newBrand });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateBrand(req, res) {
    try {
      const brand = req.body;
      if (!brand || !brand.id) {
        return res.status(402).json({ status: "error", message: "missing payload" });
      }

      await models.Brand.update({ ...brand }, { where: { id: brand.id } });
      res.json({ message: "update brand successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteBrand(req, res) {
    const { id } = req.params;
    if (!id) return errorRes(res);

    try {
      await models.Brand.destroy({ where: { id } });
      res.status(201).json({
        status: "successful",
        message: "delete brand successful",
      });
    } catch (error) {
      console.log(error);
      res.status(501).json({ status: "fail", message: error });
    }
  }
}

module.exports = new AppController();
