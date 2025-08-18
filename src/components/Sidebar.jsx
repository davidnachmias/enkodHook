import React from "react";
import {
  Home,
  Sparkles,
  LayoutGrid,
  Folder,
  BookOpen,
  HelpCircle,
  Settings,
} from "lucide-react";

// Icon mapping for sections
const SECTION_ICONS = {
  Home: Home,
  Generator: Sparkles,
  Library: LayoutGrid,
  Projects: Folder,
  Docs: BookOpen,
};

const NavItem = ({
  icon: Icon,
  name,
  isActive,
  onClick,
  isBottomButton = false,
}) => (
  <button
    onClick={onClick}
    className={`sidebar-nav-item ${isActive ? "active" : ""} ${
      isBottomButton ? "bottom-button" : ""
    }`}
    title={name}
  >
    <Icon className="sidebar-icon" />
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
        <img className="sidebar-logo-image" src="/logo.png" alt="logo" />
      </div>

      {/* Main navigation items */}
      <div className="sidebar-nav">
        {sections.map((section) => {
          const Icon = SECTION_ICONS[section];
          if (!Icon) return null;

          return (
            <NavItem
              key={section}
              icon={Icon}
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
          icon={HelpCircle}
          name="Help"
          isActive={false}
          onClick={() => {}}
          isBottomButton={true}
        />
        {/* <NavItem
          icon={Settings}
          name="Settings"
          isActive={false}
          onClick={() => {}}
          isBottomButton={true}
        /> */}
      </div>
    </aside>
  );
}
