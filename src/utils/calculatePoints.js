
export function calculatePoints(amount) {
  if (amount <= 0) return 0;
  let points = 0;
  
  if (amount > 100) {
    points += Math.floor(amount - 100) * 2;
   
    points += 50;
  } else if (amount > 50) {
    
    points += Math.floor(amount - 50);
  }

  return points;
}


export function formatMonth(dateStr) {
  const date = new Date(dateStr + "T00:00:00"); 
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}
