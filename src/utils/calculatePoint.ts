export function calculatePoint(amount: number) {
  let point = 0;
  if (amount <= 5) point = amount * 0.2;
  else if (amount <= 10) point = amount * 0.25;
  else if (amount > 10) {
    point = amount * 0.3;
  }
  return point;
}
