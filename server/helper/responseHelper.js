// helpers/responseHelper.js
export const sendSuccessResponse = (res, status, message, data) => {
  return res.status(status).json({
    message,
    data,
  });
};
