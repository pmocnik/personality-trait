import express from 'express';
import { getUserAnswers } from './db/userAnswer.js';
import { getCalc } from './db/userCalc.js';

import submitAsnwer from './logic/answer.js';
import { startUserCalc, getCalculation } from './logic/calc.js';
import getAllQuestions from './logic/question.js';

const app = express()

app.use('/', express.static('public', {}),)

app.use(express.json());

console.log("start");

app.get("/questions", async (req, res) => {
    res.status(200).send(JSON.stringify(await getAllQuestions()));
})

app.put("/startExam", async (req, res) => {
    await startUserCalc(req.body.takeId);
    res.status(200).send();
})

app.put("/save", async (req, res) => {
    submitAsnwer(req.body.takeId, req.body.questionId, req.body.answerId);
    res.status(200).send();
})

app.get("/userAnswers", async (req, res) => {
    res.status(200).send(JSON.stringify(await getUserAnswers(req.query.takeId)));
})

app.get("/getCalc", async (req, res) => {
    res.status(200).send(JSON.stringify(await getCalc()));
})

app.get("/getCalculation", async (req, res) => {
    res.status(200).send(JSON.stringify(await getCalculation(req.query.takeId)));
})

app.listen(3000);