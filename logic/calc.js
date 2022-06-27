import { getAnswer } from "../db/answer.js";
import { countQuestions } from "../db/question.js";
import { getUserAnswers } from "../db/userAnswer.js";
import { getCalcByTakeId, getUserCalcQuestionCount, setUserCalc } from "../db/userCalc.js";

const startUserCalc = async (takeId) => {
    let questionCount = await countQuestions();
    await setUserCalc(takeId, questionCount, 0);
    return;
}

const recalculate = async (takeId) => {

    let userAsnswers = await getUserAnswers(takeId);
    let ponders = [];
    for (const userAnswer of userAsnswers) {
        var ponder = (await getAnswer(userAnswer.answerId)).ponder;
        ponders.push(await ponder);
    }

    let qCount = await getUserCalcQuestionCount(takeId);
    let calc = (ponders.reduce(function (accumVariable, curValue) { return accumVariable + curValue }, 0)) / qCount;
    await setUserCalc(takeId, 0, calc);
}

const getCalculation = async (takeId) => {
    let result = await getCalcByTakeId(takeId);
    if (result < 0.5) return "introvert";
    if (result > 0.5) return "extrovert";
    if (result == 0.5) return "someting in the middle";
    return;
}

export { startUserCalc, recalculate, getCalculation };