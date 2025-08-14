import React from "react";

function ReservationBanner({ userName, reservationItems }) {
  const incompleteCount = reservationItems.filter((t) => !t.done).length;

  return (
    <h4 className="bg-primary text-white text-center p-2">
      {userName}’s Reservation List{" "}
      ({incompleteCount} {incompleteCount === 1 ? "reservation" : "reservations"} left)
    </h4>
  );
}

export default ReservationBanner;
