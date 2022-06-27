import { db } from "./db.js";
import { sql } from '@databases/sqlite';

async function setQuestion(id, question) {
    await db.query(sql`
      INSERT INTO question (id,value)
        VALUES (${id},${question})
      ON CONFLICT (id) DO UPDATE
        SET value=excluded.value;`);
}

async function getQuestions() {
    const results = await db.query(sql`
      SELECT * FROM question`);
    return results;
}

async function getQuestion(id) {
    const results = await db.query(sql`
      SELECT * FROM question WHERE id=${id}`);
    if (results.length == 1) return results[0];
    return;
}

async function countQuestions() {
    const results = await db.query(sql`
    SELECT COUNT(*) AS count FROM question`);
    if (results.length == 1) return results[0].count;
    return;
}

async function updateQuestion(id, question) {
    await db.query(sql`
      UPDATE question SET value=${question}WHERE id=${id}`);
}

async function deleteQuestion(id) {
    await db.query(sql`
      DELETE question WHERE id=${id}`);
}

export { setQuestion, getQuestions, getQuestion, countQuestions, updateQuestion, deleteQuestion };