import { useState, useEffect } from 'react';

export default function SmartScheduler() {
  const [time, setTime] = useState('');
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    if (time === '09:00') {
      setConflict(true);
    } else {
      setConflict(false);
    }
  }, [time]);

  return (
    <div>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      {conflict && <p style={{ color: 'red' }}>⚠️ Conflict: 9:00 AM is already taken.</p>}
    </div>
  );
}
