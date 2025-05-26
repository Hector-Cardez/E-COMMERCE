const FilterSelect = ({ options, onChange, defaultValue }) => (
  <select className="filter-selector" onChange={onChange}>
    <option value="">{defaultValue}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default FilterSelect;
