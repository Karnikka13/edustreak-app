import React, { useEffect, useState } from 'react';
import styles from '../styles/Quiz.module.css';

export default function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch('/api/generate-quiz');
        const data = await res.json();
        setQuiz(data.quiz);
      } catch (err) {
        console.error('Failed to load quiz:', err);
      }
    };
    fetchQuiz();
  }, []);

  const handleSubmit = () => {
    if (selected === quiz[current].answer) setScore(score + 1);

    const next = current + 1;
    if (next < quiz.length) {
      setCurrent(next);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  if (!Array.isArray(quiz) || quiz.length === 0) {
  return <div className={styles.container}>Loading quiz...</div>;
}


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧠 AI-Powered Quiz</h1>
      <div className={styles.card}>
        {showResult ? (
          <div className={styles.result}>
            <h2>🎉 Your Score: {score} / {quiz.length}</h2>
          </div>
        ) : (
          <>
            <h2 className={styles.question}>{quiz[current].question}</h2>
            <ul className={styles.options}>
              {quiz[current].options.map((opt, idx) => (
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
              {current === quiz.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
