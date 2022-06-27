import { db } from "./db.js";
import { sql } from '@databases/sqlite';

async function setUserCalc(takeId, questionCount, calc) {
    await db.query(sql`
      INSERT INTO user_calc (takeId, questionCount, calc)
        VALUES (${takeId},${questionCount},${calc})
      ON CONFLICT (takeId) DO UPDATE
        SET calc=excluded.calc;`);
}

async function getUserCalcQuestionCount(takeId) {
    const results = await db.query(sql`
      SELECT questionCount FROM user_calc WHERE takeId=${takeId}`);
    if (results.length == 1) return results[0].questionCount;
    return;
}

async function getCalc() {
    const results = await db.query(sql`
      SELECT * FROM user_calc`);
    return results;
}

async function getCalcByTakeId(takeId) {
    const results = await db.query(sql`
      SELECT calc FROM user_calc WHERE takeId=${takeId}`);
    if (results.length == 1) return results[0].calc;
    return;
}

export { setUserCalc, getUserCalcQuestionCount, getCalc, getCalcByTakeId }