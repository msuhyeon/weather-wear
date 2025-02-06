export function adjustTemperature(
  actualTemp: number,
  sensitivity: "high" | "medium" | "low"
): number {
  switch (sensitivity) {
    case "high":
      return actualTemp - 2;
    case "low":
      return actualTemp + 2;
    default:
      return actualTemp;
  }
}
