import React from "react";
import "../SidePanel.css";

const GeoComponent = ({ setTracking}) => {
   
  return (
    <div className="side-panel">

      <div className="button--container">
        <button
        //   type="button"
          className="button"
          onClick={()=>setTracking(true)}
        >
          Отслеживать геолокацию
        </button>
        <button
        //   type="button"
          className="button"
          onClick={()=>setTracking(false)}
        >
          Выключить отслеживание геолокации
        </button>
        <button
        className="button"
// onClick={window.location.href = 'account'}
        >
     
            <b>Назад</b>
        </button>
      </div>
    </div>
  );
};

export default GeoComponent;
