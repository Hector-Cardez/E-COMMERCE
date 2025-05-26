import React, { useState, useEffect } from "react";
import useFetchItems from "../hooks/useFetchItems";
import useFetchCompanies from "../hooks/useFetchCompanies";
import filterItems from "../helpers/filterItems";
import FilterSelect from "./FilterSelect";
import CartButton from "../handlers/CartButton";
import "../styles/itemsStyles.css";

const ITEMS_PER_PAGE = 30;

const Items = () => {
  const { items, categories, bodyLocations } = useFetchItems();
  const companies = useFetchCompanies();
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bodyLocation, setBodyLocation] = useState("");
  const [category, setCategory] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartStatus, setCartStatus] = useState({}); // Track cart status for each item

  useEffect(() => {
    if (items) {
      setLoading(false); // Data has finished loading
      const filtered = filterItems(
        items,
        bodyLocation,
        category,
        companyId,
        priceRange
      );
      setFilteredItems(filtered);
    }
  }, [bodyLocation, category, companyId, priceRange, items]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCartAction = (itemId, action) => {
    setCartStatus((prevStatus) => ({
      ...prevStatus,
      [itemId]: action,
    }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="filter-wrapper">
          <FilterSelect
            options={bodyLocations.map((location) => ({
              value: location,
              label: location,
            }))}
            onChange={(e) => setBodyLocation(e.target.value)}
            defaultValue="Body Locations"
          />
        </div>

        <div className="filter-wrapper">
          <FilterSelect
            className="fiter-list filter-option"
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="Categories"
          />
        </div>

        <div className="filter-wrapper">
          <FilterSelect
            options={companies.map((company) => ({
              value: company._id,
              label: company.name,
            }))}
            onChange={(e) => setCompanyId(e.target.value)}
            defaultValue="Companies"
          />
        </div>

        <div className="filter-wrapper">
          <FilterSelect
            options={[
              { value: "range1", label: "$0-$29" },
              { value: "range2", label: "$30-$59" },
              { value: "range3", label: "$60-$89" },
              { value: "range4", label: "$90-$109" },
              { value: "range5", label: "$110-$139" },
              { value: "range6", label: "$140 and up" },
            ]}
            onChange={(e) => setPriceRange(e.target.value)}
            defaultValue="Price"
          />
        </div>
      </div>

      {!loading && filteredItems.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            View Previous
          </button>
          <button
            id="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            View Next
          </button>
        </div>
      )}

      <div className="item-box">
        <ul className="list-of-items">
          {loading ? (
            <p>Loading...</p>
          ) : paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <li
                className={`item ${item.numInStock <= 0 ? "out-of-stock" : ""}`}
                key={item._id}
              >
                <img src={item.imageSrc} alt={item.name} />
                <p className="item-name">{item.name}</p>
                <p className="item-price">{item.price}</p>
                <div className="cart-button">
                  <CartButton
                    itemId={item._id}
                    quantity={1}
                    action="add"
                    onCartAction={() => handleCartAction(item._id, "add")}
                  />
                  {cartStatus[item._id] === "add"}
                  <CartButton
                    itemId={item._id}
                    quantity={1}
                    action="remove"
                    onCartAction={() => handleCartAction(item._id, "remove")}
                  />
                  {cartStatus[item._id] === "remove"}
                </div>
                <br />
              </li>
            ))
          ) : filteredItems.length === 0 ? (
            <p>Sorry, we couldn't find any items that match your search</p>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Items;
