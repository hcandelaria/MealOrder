/**
 * Calculate the differences between two Dates
 *
 * @param {Date} a
 * @param {Date} b
 * @return {number}
 */
const calculateDiffinDays = (a: Date, b: Date) => {
  const diffInMilliseconds = Math.abs(a.getTime() - b.getTime());
  const diffInDays: number = Math.ceil(
    diffInMilliseconds / (1000 * 60 * 60 * 24)
  );
  return diffInDays;
};

/**
 * Calculate the recurrence rate
 *
 * @param {string} sDate
 * @param {string} recurrence
 * @param {string} [eDate]
 * @return {Dates[]}
 */
export const calculateRecurrence = (
  sDate: string,
  recurrence: string,
  eDate?: string
) => {
  // Init the todays date
  const TODAY = new Date();
  // Init startDate
  let startDate = new Date(sDate);
  const diffInDays = calculateDiffinDays(TODAY, startDate);

  startDate.setDate(startDate.getDate() + (diffInDays - (diffInDays % 7)));

  // Init the end date
  let endDate = new Date(TODAY);
  if (eDate) {
    endDate = new Date(eDate);
  } else {
    endDate.setDate(TODAY.getDate() + 30);
  }

  // Init an array to store the recurring dates
  const recurringDates = new Set();

  // Calculate the recurring dates
  let currentDate = startDate;
  let recurrenceRate;

  switch (recurrence) {
    case 'daily':
      recurrenceRate = 1;
      break;
    case 'weekly':
      recurrenceRate = 7;
      break;
    case 'biweekly':
      recurrenceRate = 14;
      break;
    // defaults to monthly
    default:
      recurrenceRate = 28;
  }

  while (!endDate || currentDate <= endDate) {
    if (currentDate >= TODAY) {
      const displayDate = new Date(currentDate).toLocaleDateString('en-US', {
        timeZone: 'UTC',
      });
      recurringDates.add(displayDate);
      // recurringDates.add(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + recurrenceRate);
  }
  // Output the recurring dates to the console
  return recurringDates;
};
