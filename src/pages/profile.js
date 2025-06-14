import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../util/firebase';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        }
      }
    };

    fetchProfile();
  }, []);

  return profile ? (
    <div style={{ padding: '2rem' }}>
      <h2>👋 Welcome, {profile.fullName || 'User'}</h2>
      <p>📧 Email: {profile.email}</p>
      <p>🕓 Joined On: {new Date(profile.createdAt.seconds * 1000).toLocaleDateString()}</p>
      <p>🕓 Last Login: {profile.lastLogin ? new Date(profile.lastLogin.seconds * 1000).toLocaleString() : 'Not recorded'}</p>
    </div>
  ) : (
    <p>Loading profile...</p>
  );
};

export default Profile;
