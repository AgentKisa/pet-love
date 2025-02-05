import styles from "./SearchField2.module.css";

const SearchField = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      className={styles.searchField}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default SearchField;
