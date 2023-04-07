import React from "react";

const EventCard = ({ eventName, day, time }) => {
  return (
    <div className="event">
      <p className="event__name">{eventName}</p>
      <p className="event__day text-faint">{day}</p>
      <p className="event__time">{time}</p>
    </div>
  );
};

export default EventCard;
