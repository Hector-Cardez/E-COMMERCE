import priceInRange from "../handlers/priceRangeHandler";

const filterItems = (items, bodyLocation, category, companyId, priceRange) => {
  return items.filter((item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return (
      (bodyLocation ? item.body_location === bodyLocation : true) &&
      (category ? item.category === category : true) &&
      (companyId ? item.companyId === parseInt(companyId) : true) &&
      priceInRange(price, priceRange)
    );
  });
};

export default filterItems;
