const { getQuestions, getAnswers } = require('../db/db');

const getAllQuestions = async () => {

    let questionsDb = await getQuestions();

    for (let questionDb of questionsDb) {
        let answersDb = await getAnswers(questionDb.id);
        questionDb.question = questionDb.value;
        questionDb.value = undefined;
        questionDb.answers = [];
        for (const answerDb of answersDb) {
            questionDb.answers.push({ id: answerDb.id, answer: answerDb.value });
        }
    }

    return questionsDb;
}

module.exports = getAllQuestions;