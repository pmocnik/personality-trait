import { db } from "./db.js";
import { sql } from '@databases/sqlite';

async function setAnswer(id, answer, questionId, ponder) {
  await db.query(sql`
    INSERT INTO answer (id,value, questionId, ponder)
      VALUES (${id},${answer},${questionId},${ponder})`);
}

async function getAnswers(questionId) {
  const results = await db.query(sql`
    SELECT * FROM answer WHERE questionId=${questionId};`);
  return results;
}

async function getAnswer(id) {
  const results = await db.query(sql`
    SELECT * FROM answer WHERE id=${id};`);
  if (results.length == 1) return results[0];
  return;
}

async function updateAnswer(id, answer, questionId, ponder) {
  await db.query(sql`
    UPDATE answer SET value=${answer}, questionId=${questionId}, ponder=${ponder} WHERE id=${id}`);
}

async function deleteAnswer(id) {
  await db.query(sql`
    DELETE answer WHERE id=${id}`);
}

export { setAnswer, getAnswers, getAnswer, updateAnswer, deleteAnswer };