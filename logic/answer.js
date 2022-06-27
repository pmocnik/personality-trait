import { setUserAnswer } from "../db/userAnswer.js";
import { recalculate } from "./calc.js";

const submitAsnwer = async (takeId, questionId, answerId) => {
    if (answerId == null) return;
    await setUserAnswer(takeId, questionId, answerId);
    await recalculate(takeId);
}

export default submitAsnwer;
