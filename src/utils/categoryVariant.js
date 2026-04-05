const categoryVariants = {
  Food: "warning",
  Travel: "cyan",
  Bills: "danger",
  Shopping: "purple",
  Health: "teal",
  Education: "blue",
  Salary: "success",
  Freelance: "purple",
  Investment: "cyan",
  EMI: "orange",
  Subscriptions: "pink",
  Savings: "success",
};

export function getCategoryVariant(category) {
  return categoryVariants[category] || "default";
}
