import connect from '@databases/sqlite';
import { sql } from '@databases/sqlite';
import { setAnswer } from './answer.js';
import { setQuestion } from './question.js';

const db = connect();

async function prepare() {
  await db;
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS question (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      value VARCHAR NOT NULL
    );`);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS answer (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      value VARCHAR NOT NULL,
      questionId INTEGER NOT NULL,
      ponder INTEGER NOT NULL,
      FOREIGN KEY (questionId) REFERENCES question(id)
    );`);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS user_answer (
      takeId VARCHAR NOT NULL,
      questionId INTEGER NOT NULL,
      answerId INTEGER NOT NULL,
      PRIMARY KEY(takeId,questionId),
      FOREIGN KEY (questionId) REFERENCES question(id),
      FOREIGN KEY (answerId) REFERENCES answer(id)
    );`);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS user_calc (
      takeId VARCHAR PRIMARY KEY NOT NULL,
      questionCount INTEGER NOT NULL,
      calc DECIMAL
    );`);

  populate(db);
}

async function populate() {
  await setQuestion(1, "You’re really busy at work and a colleague is telling you their life story and personal woes. You:");
  await setAnswer(1, "Don’t dare to interrupt them", 1, 0);
  await setAnswer(2, "Think it’s more important to give them some of your time; work can wait", 1, 1);
  await setAnswer(3, "Listen, but with only with half an ear", 1, 0);
  await setAnswer(4, "Interrupt and explain that you are really busy at the moment", 1, 1);

  await setQuestion(2, "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:");
  await setAnswer(5, "Look at your watch every two minutes", 2, 0);
  await setAnswer(6, "Bubble with inner anger, but keep quiet", 2, 1);
  await setAnswer(7, "Explain to other equally impatient people in the room that the doctor is always running late", 2, 0);
  await setAnswer(8, "Complain in a loud voice, while tapping your foot impatiently", 2, 1);

  await setQuestion(3, "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:");
  await setAnswer(9, "Don’t dare contradict them", 3, 0);
  await setAnswer(10, "Think that they are obviously right", 3, 1);
  await setAnswer(11, "Defend your own point of view, tooth and nail", 3, 0);
  await setAnswer(12, "Continuously interrupt your colleague", 3, 1);
}

const prepared = prepare();


// async function setUserCalc(takeId, questionCount, calc) {
//   await prepared;
//   await db.query(sql`
//     INSERT INTO user_calc (takeId, questionCount, calc)
//       VALUES (${takeId},${questionCount},${calc})
//     ON CONFLICT (takeId) DO UPDATE
//       SET calc=excluded.calc;`);
// }

// async function getUserCalcQuestionCount(takeId) {
//   await prepared;
//   const results = await db.query(sql`
//     SELECT questionCount FROM user_calc WHERE takeId=${takeId}`);
//   if (results.length == 1) return results[0].questionCount;
//   return;
// }

// async function getCalc() {
//   await prepared;
//   const results = await db.query(sql`
//     SELECT * FROM user_calc`);
//   return results;
// }

// async function getCalcByTakeId(takeId) {
//   await prepared;
//   const results = await db.query(sql`
//     SELECT calc FROM user_calc WHERE takeId=${takeId}`);
//   if (results.length == 1) return results[0].calc;
//   return;
// }

// export { db, setUserCalc, getUserCalcQuestionCount, getCalc, getCalcByTakeId }
export { db }