const models = require("../models");

const missPayloadError = (res, message = "missing payload") => {
  return res.status(402).json({ status: "finish", message });
};

class ProductCommentController {
  async addComment(req, res) {
    try {
      if (!req.body) {
        return missPayloadError(res);
      }

      const data = req.body;

      if (!data.content || !data.cus_name) {
        return missPayloadError(res, "comment data error");
      }

      await models.Question.create(data);

      res.status(201).json({ status: "successful", message: "comment successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "add comment error",
      });
    }
  }

  async addReply(req, res) {
    try {
      if (!req.body) {
        return missPayloadError(res);
      }

      const data = req.body;

      if (!data.q_id || !data.content) {
        return missPayloadError(res, "reply data error");
      }

      await models.Answer.create(data);

      res.status(201).json({ status: "successful", message: "reply successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "reply error",
      });
    }
  }
}

module.exports = new ProductCommentController();
