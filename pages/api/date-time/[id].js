const { FIREBASE_REF_DATETIME } = require("../../../const");
const { database } = require("../../../database");
const {
  MSG_IS_EMPTY_OR_WRONG,
  MSG_NOT_ALLOWD_METHOD,
  MSG_SUCCESS,
  NOT_FOUND_THIS_ID,
} = require("../../../const/message");

const handleRequest = async (res, id) => {
  if (!id) {
    res.status(400).json({ message: `id ${MSG_IS_EMPTY_OR_WRONG}` });
  }
  const dateTimeNow = new Date();
  try {
    const ref = database.ref(FIREBASE_REF_DATETIME).child(id);
    const data = await ref.once("value");

    if (!data.exists()) {
      res.status(404).json({ message: NOT_FOUND_THIS_ID });
    }

    const updateObject = {
      lastSeenAt: dateTimeNow.toGMTString(),
    };
    await ref.update(updateObject);

    const response = Object.assign(data.val(), updateObject);
    res.status(200).json({ data: response, message: MSG_SUCCESS });
  } catch (reject) {
    console.log("The read failed: " + reject.code);
    res.status(500).send("The read failed: " + reject.code);
  }
};

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      await handleRequest(res, id);
      break;
    default:
      res.status(405).send(MSG_NOT_ALLOWD_METHOD);
      break;
  }
};
