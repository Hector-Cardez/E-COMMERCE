import { useState, useEffect } from "react";

const useFetchCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/companies")
      .then((response) => response.json())
      .then((data) => setCompanies(data.companies))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  return companies;
};

export default useFetchCompanies;
