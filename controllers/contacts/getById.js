// const createError = require("http-errors");
const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);

    if (!contactById) {
      // throw createError(404, `Contact with id=${contactId} not found.`);

      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "Success",
      code: 200,
      data: {
        result: contactById,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
