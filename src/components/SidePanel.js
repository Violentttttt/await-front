import React from "react";
import "../SidePanel.css";

const SidePanel = ({ switchLanguage, setMarkerType, handleSendData }) => {
  return (
    <div className="side-panel">
      {/* <select
        className="dropdown"
        onChange={(e) => switchLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select> */}
      <div className="button--container">
        <button
          // type="button"
          className="button"
          onClick={() => setMarkerType("red")}
        >
          📍 Set the Red mark
        </button>
        <button
          // type="button"
          className="button"
          onClick={() => setMarkerType("blue")}
        >
          🫐 Set the Blue mark
        </button>
        <button type="button" className="button" onClick={handleSendData}>
          🚀 Send data
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
