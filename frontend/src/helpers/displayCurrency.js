const displayBDCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  });

  let formatted = formatter.format(num);
  formatted = formatted.replaceAll("BDT", "৳");

  return formatted;
};

export default displayBDCurrency;
