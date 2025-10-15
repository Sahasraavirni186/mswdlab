import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profiledata.css";

const profiledata = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/octocat") // Example GitHub API
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="card">
        <img src={profile.avatar_url} alt={profile.login} />
        <h3>{profile.name}</h3>
        <p>Username: {profile.login}</p>
        <p>Bio: {profile.bio}</p>
        <p>Followers: {profile.followers}</p>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default profiledata;
