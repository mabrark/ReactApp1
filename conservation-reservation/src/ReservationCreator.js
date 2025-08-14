import React, { useState } from "react";

const areas = ["Bruce Mill", "Rockwood", "Rattray", "Rattlesnake point"];
const timeSlots = [
  "9:00am - 12:00pm",
  "12:00pm - 3:00pm",
  "3:00pm - 6:00pm"
];

function ReservationCreator({ callback }) {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedArea || !selectedTime) {
      alert("Please select both a conservation area and a time slot.");
      return;
    }
    callback(`${selectedArea} - ${selectedTime}`);
    setSelectedArea("");
    setSelectedTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <select
        className="form-select"
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
      >
        <option value="">Select Conservation Area</option>
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

      <button type="submit" className="btn btn-primary">
        Add Reservation
      </button>
    </form>
  );
}

export default ReservationCreator;
