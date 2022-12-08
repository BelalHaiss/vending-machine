export const allowedValues = [5, 10, 20, 50, 100];
export function isAllowedCoins(coins: number): boolean {
  return allowedValues.includes(coins);
}
