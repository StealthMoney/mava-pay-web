export function nairaUnitConversion(value: number, type: "naira" | "kobo") {
  if (type === "kobo") {
    return value * 100;
  } else {
    return value / 100;
  }
}
