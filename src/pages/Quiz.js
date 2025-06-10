// pages/QuizPage.js

import React, { useState, useEffect } from 'react';
import styles from '../styles/Quiz.module.css';

const quizData = [
  {
    question: 'What is the full form of DBMS?',
    options: ['Database Management System', 'Data Backup Manager System', 'Disk Based Mapping Software', 'None of the above'],
    answer: 'Database Management System',
  },
  {
    question: 'Which language is used to create web pages?',
    options: ['Python', 'HTML', 'C++', 'Java'],
    answer: 'HTML',
  },
  {
    question: 'React is mainly used for?',
    options: ['Styling', 'Server-side logic', 'Building UIs', 'Database design'],
    answer: 'Building UIs',
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSelected(null);
  }, [current]);

  const handleSubmit = () => {
    if (selected === quizData[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < quizData.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧠 Quiz Time!</h1>
      <div className={styles.card}>
        {showResult ? (
          <div className={styles.result}>
            <h2>🎉 Your Score: {score} / {quizData.length}</h2>
          </div>
        ) : (
          <>
            <h2 className={styles.question}>{quizData[current].question}</h2>
            <ul className={styles.options}>
              {quizData[current].options.map((opt, idx) => (
                <li key={idx} className={styles.optionItem}>
                  <label>
                    <input
                      type="radio"
                      name="option"
                      value={opt}
                      checked={selected === opt}
                      onChange={() => setSelected(opt)}
                      className={styles.radio}
                    />
                    <span>{opt}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className={selected ? styles.button : styles.buttonDisabled}
            >
              {current === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
