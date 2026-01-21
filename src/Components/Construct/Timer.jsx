import React, { useState, useEffect } from "react";

export const Timer = ({ targetDay, targetMonth, targetYear }) => {
  const [date, setDate] = useState(new Date());
  setInterval(() => {
    setDate(new Date())
  }, 1000);

  const calculateTimeLeft = () => {    
    const targetDate = new Date(targetYear, targetMonth, targetDay, 0, 0, 0);    
    const difference = targetDate.getTime() - date.getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeToGo = calculateTimeLeft();
      if(timeToGo.seconds <= 0) location.reload();
      else setTimeLeft(timeToGo);
    });
    return () => clearTimeout(timer);
  }, [date]);

  return (
    <div className="md:flex gap-6  uppercase text-gray-50 grid grid-cols-2 w-full  items-center justify-center ">
      <div className="flex flex-col items-center border-construct border-2  p-4 rounded-lg w-full md:max-w-[120px]">
        <span className="font-black text-4xl " id="days">
          {timeLeft.days}
        </span>
        <div className="text-construct font-bold">dias</div>
      </div>
      <div className="flex flex-col items-center border-construct border-2  p-4 rounded-lg w-full md:max-w-[120px]">
        <span className="font-black text-4xl " id="hours">
          {timeLeft.hours}
        </span>
        <div className="text-construct font-bold">horas</div>
      </div>
      <div className="flex flex-col items-center border-construct border-2  p-4 rounded-lg w-full  md:max-w-[120px] ">
        <span className="font-black text-4xl " id="minutes">
          {timeLeft.minutes}
        </span>
        <div className="text-construct font-bold">minutos</div>
      </div>
      <div className="flex flex-col items-center border-construct border-2  p-4 rounded-lg w-full md:max-w-[120px] ">
        <span className="font-black text-4xl " id="minutes">
          {timeLeft.seconds}
        </span>
        <div className="text-construct font-bold">segundos</div>
      </div>
    </div>
  );
};
