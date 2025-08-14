import React, { useState } from "react";

const areas = ["Bruce Mill", "Rockwood", "Rattray", "Rattlesnake point"];
const timeSlots = [
  "9:00am - 12:00pm",
  "12:00pm - 3:00pm",
  "3:00pm - 6:00pm"
];

function ReservationRow({ item, toggle, deleteCallback, editCallback }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedArea, setSelectedArea] = useState(item.action.split(" - ")[0] || "");
  const [selectedTime, setSelectedTime] = useState(item.action.split(" - ")[1] || "");

  const handleToggle = () => {
    toggle(item);
  };

  const handleEditSave = () => {
    if (selectedArea && selectedTime && editCallback) {
      editCallback(item, `${selectedArea} - ${selectedTime}`);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deleteCallback) {
      deleteCallback(item);
    }
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option value="">Select Area</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        ) : (
          item.action
        )}
      </td>
      <td>
        <input type="checkbox" checked={item.done} onChange={handleToggle} />
      </td>
      <td>
        {!item.done && (
          <>
            {isEditing ? (
              <button className="btn btn-success btn-sm" onClick={handleEditSave}>
                Save
              </button>
            ) : (
              <button className="btn btn-warning btn-sm" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </>
        )}
      </td>
      <td>
        {deleteCallback && (
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default ReservationRow;
