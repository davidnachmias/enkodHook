import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import avatar from "../assets/avatar.png"; // Assuming you have an avatar image

// Mock User for demo; replace with real auth/user logic
export const User = {
  me: () =>
    Promise.resolve({ full_name: "Jenny Wilson", email: "jenny@example.com" }),
};

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    User.me()
      .then(setUser)
      .catch(() => setUser({ full_name: "Jenny Wilson", email: "" }));
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">Text to Game UI</h1>
      </div>
      <div className="header-right">
        <div className="header-user-menu">
          <img alt="User Avatar" src={avatar} className="header-avatar" />
          <span className="header-username">{user?.full_name}</span>
          <ChevronDown className="header-dropdown-icon" />
        </div>
      </div>
    </header>
  );
}
