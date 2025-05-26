const priceInRange = (price, priceRange) => {
  switch (priceRange) {
    case "range1":
      return price >= 0 && price <= 29;
    case "range2":
      return price >= 30 && price <= 59;
    case "range3":
      return price >= 60 && price <= 89;
    case "range4":
      return price >= 90 && price <= 109;
    case "range5":
      return price >= 110 && price <= 139;
    case "range6":
      return price >= 140;
    default:
      return true;
  }
};

export default priceInRange;
