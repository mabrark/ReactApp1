import React, { useState, useEffect } from "react";
import "./App.css";
import ReservationBanner from "./ReservationBanner";
import ReservationCreator from "./ReservationCreator";
import ReservationRow from "./ReservationRow";
import VisibilityControl from "./VisibilityControl";

function App() {
  const [userName] = useState("Abrar");

  const [reservationItems, setReservationItems] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved
      ? JSON.parse(saved)
      : [
          { action: "Select Conservation Area", done: false },
          { action: "Select Timeslot", done: false },
          { action: "Select date", done: true },
        ];
  });

  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservationItems));
  }, [reservationItems]);

  const createNewReservation = (task) => {
    if (!reservationItems.find((item) => item.action === task)) {
      setReservationItems([...reservationItems, { action: task, done: false }]);
    }
  };

  const toggleReservation = (reservation) => {
    setReservationItems(
      reservationItems.map((item) =>
        item.action === reservation.action ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteReservation = (reservation) => {
    setReservationItems(reservationItems.filter((item) => item.action !== reservation.action));
  };

  const editReservation = (reservation, newAction) => {
    setReservationItems(
      reservationItems.map((item) =>
        item.action === reservation.action ? { ...item, action: newAction } : item
      )
    );
  };

  const clearCompleted = () => {
    setReservationItems(reservationItems.filter((item) => !item.done));
  };

  const reservationTableRows = (doneValue) =>
    reservationItems
      .filter((item) => item.done === doneValue)
      .map((item, index) => (
        <ReservationRow
          key={index}
          item={item}
          toggle={toggleReservation}
          deleteCallback={deleteReservation}
          editCallback={editReservation}
        />
      ));

  return (
    <div className="container mt-3">
      <ReservationBanner userName={userName} reservationItems={reservationItems} />

      <div className="m-3">
        <ReservationCreator callback={createNewReservation} />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Description</th>
            <th>Done</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{reservationTableRows(false)}</tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>

      {showCompleted && (
        <table className="table table-striped table-bordered mt-2">
          <thead className="table-dark">
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{reservationTableRows(true)}</tbody>
        </table>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-danger" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;