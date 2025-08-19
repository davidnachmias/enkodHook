import React from "react";
import logo from "../assets/photos/logo.svg";
// אייקונים מהתיקייה שלך
import homeIcon from "../assets/icons/home.svg";
import aiIcon from "../assets/icons/aiicon.svg";
import bookIcon from "../assets/icons/book.svg";
import folderIcon from "../assets/icons/folder.svg";
import gridIcon from "../assets/icons/grid.svg";
import helpIcon from "../assets/icons/help.svg";

const SECTION_ICONS = {
  Home: homeIcon,
  Generator: aiIcon,
  Library: bookIcon,
  Projects: folderIcon,
  Docs: gridIcon,
};

const NavItem = ({ icon, name, isActive, onClick, isBottomButton = false }) => (
  <button
    onClick={onClick}
    className={`sidebar-nav-item ${isActive ? "active" : ""} ${
      isBottomButton ? "bottom-button" : ""
    }`}
    title={name}
  >
    <img src={icon} alt={name} className="sidebar-icon" />
  </button>
);

export default function Sidebar({
  activeSection,
  onSectionChange,
  sections = [],
}) {
  return (
    <aside className="sidebar">
      {/* Logo area */}
      <div className="sidebar-logo">
        <img className="sidebar-logo-image" src={logo} alt="logo" />
      </div>

      {/* Main navigation items */}
      <div className="sidebar-nav">
        {sections.map((section) => {
          const icon = SECTION_ICONS[section];
          if (!icon) return null;

          return (
            <NavItem
              key={section}
              icon={icon}
              name={section}
              isActive={activeSection === section}
              onClick={() => onSectionChange(section)}
            />
          );
        })}
      </div>

      {/* Bottom navigation items */}
      <div className="sidebar-bottom-nav">
        <NavItem
          icon={helpIcon}
          name="Help"
          isActive={false}
          onClick={() => {}}
          isBottomButton={true}
        />
      </div>
    </aside>
  );
}
