const { database } = require("../../database");
const { FIREBASE_REF_DATETIME } = require("../../const");
const {
  MSG_IS_EMPTY_OR_WRONG,
  MSG_DATABASE_ERROR,
  MSG_NOT_ALLOWD_METHOD,
  MSG_SUCCESS,
} = require("../../const/message");

const handleRequest = async (res, request) => {
  const { startDateTime, targetDateTime } = request;
  if (!startDateTime) {
    res.status(400).json({ message: `startDateTime ${MSG_IS_EMPTY_OR_WRONG}` });
  }
  if (!targetDateTime) {
    res
      .status(400)
      .json({ message: `targetDateTime ${MSG_IS_EMPTY_OR_WRONG}` });
  }
  const dateTimeNow = new Date();
  const childKey =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  try {
    await database
      .ref(FIREBASE_REF_DATETIME)
      .child(childKey)
      .set({
        ...request,
        createdAt: dateTimeNow.toGMTString(),
        lastSeenAt: dateTimeNow.toGMTString(),
      });

    res.status(200).json({ request, message: MSG_SUCCESS });
  } catch (e) {
    if (e) {
      console.error(e);
      res.status(500).json({ request, message: MSG_DATABASE_ERROR });
    }
  }
};

export default (req, res) => {
  const {
    body: { startDateTime, targetDateTime },
    method,
  } = req;

  switch (method) {
    case "POST":
      const request = { startDateTime, targetDateTime };
      handleRequest(res, request);
      break;
    default:
      res.status(405).send(MSG_NOT_ALLOWD_METHOD);
      break;
  }
};
