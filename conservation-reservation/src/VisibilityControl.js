import React from "react";

function VisibilityControl({ description, isChecked, callback }) {
  return (
    <div className="form-check text-center">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => callback(e.target.checked)}
        id="visibilityControlCheckbox"
      />
      <label
        className="form-check-label"
        htmlFor="visibilityControlCheckbox"
      >
        Show {description}
      </label>
    </div>
  );
}

export default VisibilityControl;
