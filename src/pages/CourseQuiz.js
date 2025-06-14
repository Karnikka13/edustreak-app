import React, { useEffect, useState } from 'react';
import styles from '../styles/Quiz.module.css';
import { auth, db } from '../util/firebase'; // adjust path if needed
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function CourseQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const response = await fetch('/allCoursesQuiz.json'); // Path from public/
        const data = await response.json();

        const combined = [
          ...data.JavaScript,
          ...data["Data Structures"],
          ...data.DBMS,
        ];

        const shuffled = combined.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuiz(shuffled); // ✅ Fixed this line
      } catch (error) {
        console.error('Error loading quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  const handleSubmit = async () => {
  if (selected === quiz[current].answer) {
    setScore(prev => prev + 1);
  }

  const next = current + 1;
  if (next < quiz.length) {
    setCurrent(next);
    setSelected(null);
  } else {
    setShowResult(true);

    // Save score in Firestore
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, {
          quizScores: arrayUnion({
            score: score + (selected === quiz[current].answer ? 1 : 0),
            total: quiz.length,
            date: new Date().toISOString(),
          }),
        });
        console.log('Score saved!');
      } catch (err) {
        console.error('Failed to save score:', err);
      }
    }
  }
};

  if (loading || quiz.length === 0) {
    return <div className={styles.container}>Loading quiz...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧠 Quiz: Mixed from Selected Courses</h1>
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
