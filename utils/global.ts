export const generateISBN = (): string => {
  let isbn = "978";
  for (let i = 0; i < 9; i++) {
    isbn += Math.floor(Math.random() * 10); // Random digits from 0 to 9
  }

  // Calculate checksum (13th digit)
  const digits = isbn.split("").map(Number);
  const weightedSum = digits.reduce((sum, digit, index) => {
    return sum + (index % 2 === 0 ? digit : digit * 3);
  }, 0);

  const checksum = (10 - (weightedSum % 10)) % 10;

  return isbn + checksum;
};
