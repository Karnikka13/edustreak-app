import { useState } from 'react';
import { auth, db } from '../util/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const allCourses = ['AI', 'DSA', 'DBMS', 'OS', 'CN'];

export default function ChangeCourse() {
  const [selected, setSelected] = useState([]);

  const handleChange = (course) => {
    setSelected((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), {
      selectedCourses: selected,
    });
    alert('Courses updated!');
  };

  return (
    <div>
      <h2>🔄 Change Your Courses</h2>
      {allCourses.map((course) => (
        <div key={course}>
          <input
            type="checkbox"
            checked={selected.includes(course)}
            onChange={() => handleChange(course)}
          />{' '}
          {course}
        </div>
      ))}
      <button onClick={handleSubmit}>Update Courses</button>
    </div>
  );
}