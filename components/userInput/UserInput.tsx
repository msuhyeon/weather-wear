"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserPreferencesForm = () => {
  const [gender, setGender] = useState("");
  const [coldSensitivity, setColdSensitivity] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem(
      "userPreferences",
      JSON.stringify({ gender, coldSensitivity })
    );
    router.push("/recommendation");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Cold Sensitivity:
          <select
            value={coldSensitivity}
            onChange={(e) => setColdSensitivity(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="low">I don't get cold easily</option>
            <option value="medium">I'm average</option>
            <option value="high">I get cold easily</option>
          </select>
        </label>
      </div>
      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default UserPreferencesForm;
