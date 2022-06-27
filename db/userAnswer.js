import { db } from "./db.js";
import { sql } from '@databases/sqlite';

async function setUserAnswer(takeId, questionId, answerId) {
    await db.query(sql`
      INSERT INTO user_answer (takeId, questionId, answerId)
        VALUES (${takeId},${questionId},${answerId})
        ON CONFLICT (takeId, questionId) DO UPDATE
        SET answerId=excluded.answerId;
        `);
}

async function getUserAnswers(takeId) {
    const results = await db.query(sql`
      SELECT * FROM user_answer WHERE takeId=${takeId}`);
    return results;
}

async function deleteUserAnswer(takeId) {
    await db.query(sql`
      DELETE user_answer WHERE takeId=${takeId}`);
}

export { setUserAnswer, getUserAnswers, deleteUserAnswer };