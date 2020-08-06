 export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(oneDay => oneDay.name === day);
  let appointmentsArray=[];
  let results = [];

 if (filteredDay[0] && filteredDay[0].appointments){
   appointmentsArray = filteredDay[0].appointments
    for (const appointmentNumber of appointmentsArray){
      results.push(state.appointments[appointmentNumber])
    }
 }

return results
}