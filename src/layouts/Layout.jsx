import React from "react";
import Header from "./Header";
import Sidebar from "../components/Sidebar";

export default function Layout({
  children,
  activeSection,
  onSectionChange,
  sections,
}) {
  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        sections={sections}
      />
      <div className="app-right">
        <Header />
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}
