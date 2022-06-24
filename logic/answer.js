const { setUserAnswer } = require("../db/db");
const { recalculate } = require("./calc");

const submitAsnwer = async (takeId, questionId, answerId) => {
    await setUserAnswer(takeId, questionId, answerId);
    await recalculate(takeId);
}

module.exports = submitAsnwer;