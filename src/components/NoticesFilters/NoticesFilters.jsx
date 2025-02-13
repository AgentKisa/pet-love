import React, { useEffect, useState } from "react";
import Select from "react-select";
import SearchField from "../SearchField/SearchField2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchSexes,
  fetchSpecies,
  fetchCities,
  setFilters,
} from "@/redux/noticesSlice";
import styles from "./NoticesFilters.module.css";

const NoticesFilters = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  // Данные для заполнения дропдаунов (запрашиваются с бекенда)
  const { categories, sexes, species, cities } = useSelector(
    (state) => state.notices
  );

  // Локальное состояние для фильтров
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSex, setSelectedSex] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  /**
   * Состояние сортировки:
   * sortOption может быть:
   *  "" – ничего не выбрано (будет применяться сортировка по дате, byDate: true)
   *  "byPopularity" – сортировка по популярности (от самых популярных, byPopularity: true)
   *  "byNotPopularity" – сортировка по популярности в обратном порядке (byPopularity: false)
   *  "byPrice" – сортировка по цене от низкой к высокой (byPrice: true)
   *  "byHighPrice" – сортировка по цене от высокой к низкой (byPrice: false)
   */
  const [sortOption, setSortOption] = useState("");

  // При монтировании запрашиваем данные для дропдаунов
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSexes());
    dispatch(fetchSpecies());
  }, [dispatch]);

  // При вводе названия города (min длина 3) запрашиваем список городов
  const handleCityInputChange = (inputValue) => {
    if (inputValue && inputValue.length >= 3) {
      dispatch(fetchCities(inputValue));
    }
  };

  // Формирование объекта фильтров для запроса /notices
  useEffect(() => {
    const filters = {
      keyword,
      category: selectedCategory ? selectedCategory.value : "",
      sex: selectedSex ? selectedSex.value : "",
      species: selectedSpecies ? selectedSpecies.value : "",
      locationId: selectedLocation ? selectedLocation.value : "",
      page: 1, // сбрасываем на 1 страницу при изменении фильтров
      limit: 6,
    };

    if (sortOption === "byPopularity") {
      filters.byPopularity = false; // Меняем на false
    } else if (sortOption === "byNotPopularity") {
      filters.byPopularity = true; // Меняем на true
    } else if (sortOption === "byPrice") {
      filters.byPrice = true;
    } else if (sortOption === "byHighPrice") {
      filters.byPrice = false;
    } else {
      filters.byDate = true;
    }

    onFilterChange(filters);
    dispatch(setFilters(filters));
  }, [
    keyword,
    selectedCategory,
    selectedSex,
    selectedSpecies,
    selectedLocation,
    sortOption,
    dispatch,
    onFilterChange,
  ]);

  const resetFilters = () => {
    setKeyword("");
    setSelectedCategory(null);
    setSelectedSex(null);
    setSelectedSpecies(null);
    setSelectedLocation(null);
    setSortOption("");
  };

  // Универсальная функция для смены сортировки
  const toggleSortOption = (option) => {
    if (sortOption === option) {
      setSortOption("");
    } else {
      setSortOption(option);
    }
  };

  // Опции для селектов, получаемые из Redux (преобразуем их в формат react-select)

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      height: "48px",
      padding: "0 14px",
      borderRadius: "30px",
      border: "1px solid rgba(245, 146, 86, 0.5)",
      background: "#fff",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "-0.48px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#262626",
    }),
    input: (provided) => ({
      ...provided,
      color: "#262626",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "32px",
      padding: "10px 0",
      backgroundColor: "#FFF",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxHeight: "216px",
      overflowY: "auto",
      fontSize: "16px",
      fontWeight: 500,
      /* Убираем двойной ползунок */
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "16px",
      fontWeight: "500",
      color: state.isFocused || state.isSelected ? "#F6B83D" : "#333",
      backgroundColor: state.isFocused
        ? "#f0f0f0"
        : state.isSelected
        ? "#f0f0f0"
        : "transparent",
      padding: "12px 20px",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "none",
        color: "#F6B83D",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      width: "0px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#262626",
    }),
  };

  const speciesSelectStyles = {
    ...customSelectStyles,
    menu: (provided) => ({
      ...provided,
      borderRadius: "32px",
      padding: "10px 0",
      backgroundColor: "#FFF",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxHeight: "216px",
      overflowY: "auto",
      color: "rgba(38, 38, 38, 0.60)",
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
  };

  const locationSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "227px",
      height: "48px",
      padding: "0 14px",
      borderRadius: "30px",
      border: "1px solid rgba(245, 146, 86, 0.5)",
      background: "#fff",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "-0.48px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#262626",
    }),
    input: (provided) => ({
      ...provided,
      color: "#262626",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "32px",
      padding: "10px 0",
      backgroundColor: "#FFF",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxHeight: "216px",
      overflowY: "auto",
      fontSize: "16px",
      fontWeight: 500,
      /* Убираем двойной ползунок */
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "16px",
      fontWeight: "500",
      color: state.isFocused || state.isSelected ? "#F6B83D" : "#333",
      backgroundColor: state.isFocused
        ? "#f0f0f0"
        : state.isSelected
        ? "#f0f0f0"
        : "transparent",
      padding: "12px 20px",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "none",
        color: "#F6B83D",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      width: "0px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#262626",
    }),
  };

  // Функция для капитализации строки
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Преобразование данных для react-select с добавлением "Show all"
  const categoryOptions = [
    { value: "", label: "Show all" },
    ...categories.map((cat) => ({
      value: cat,
      label: capitalize(cat),
    })),
  ];
  const sexOptions = [
    { value: "", label: "Show all" },
    ...sexes.map((s) => ({
      value: s,
      label: capitalize(s),
    })),
  ];
  const speciesOptions = [
    { value: "", label: "Show all" },
    ...species.map((sp) => ({
      value: sp,
      label: capitalize(sp),
    })),
  ];
  const locationOptions = cities.map((city) => ({
    value: city._id,
    label: `${city.cityEn}, ${city.stateEn}`,
  }));

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterRowContainer2}>
        <div className={styles.filterRow}>
          <SearchField
            value={keyword}
            onChange={setKeyword}
            placeholder="Search"
            className={styles.searchField}
          />
        </div>

        <div className={styles.filterRow}>
          <Select
            instanceId="category-select"
            styles={customSelectStyles}
            options={categoryOptions}
            placeholder="Categories"
            onChange={setSelectedCategory}
            value={selectedCategory}
            isClearable
          />
          <Select
            instanceId="sex-select"
            styles={customSelectStyles}
            options={sexOptions}
            placeholder="By gender"
            onChange={setSelectedSex}
            value={selectedSex}
            isClearable
          />
          <Select
            instanceId="species-select"
            styles={customSelectStyles}
            options={speciesOptions}
            placeholder="By type"
            onChange={speciesSelectStyles}
            value={selectedSpecies}
            isClearable
          />
        </div>

        <Select
          instanceId="location-select"
          styles={locationSelectStyles}
          placeholder="Location"
          onInputChange={handleCityInputChange}
          options={locationOptions}
          onChange={setSelectedLocation}
          value={selectedLocation}
          components={{
            DropdownIndicator: () => (
              <svg className={styles.searchIcon}>
                <use href="/sprite.svg#icon-search-1"></use>
              </svg>
            ),
          }}
          isClearable={false}
        />
      </div>
      <div className={styles.filterRowContainer}>
        <div className={styles.filterRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={sortOption === "byPopularity"}
              onChange={() => toggleSortOption("byPopularity")}
              className={styles.customCheckbox}
            />
            <span>
              Popularity
              {sortOption === "byPopularity" && (
                <svg className={styles.searchIcon}>
                  <use href="/sprite.svg#icon-x-2"></use>
                </svg>
              )}
            </span>
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={sortOption === "byNotPopularity"}
              onChange={() => toggleSortOption("byNotPopularity")}
              className={styles.customCheckbox}
            />
            <span>
              Unpopular
              {sortOption === "byNotPopularity" && (
                <svg className={styles.searchIcon}>
                  <use href="/sprite.svg#icon-x-2"></use>
                </svg>
              )}
            </span>
          </label>
        </div>

        <div className={styles.filterRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={sortOption === "byPrice"}
              onChange={() => toggleSortOption("byPrice")}
              className={styles.customCheckbox}
            />
            <span>
              Cheap
              {sortOption === "byPrice" && (
                <svg className={styles.searchIcon}>
                  <use href="/sprite.svg#icon-x-2"></use>
                </svg>
              )}
            </span>
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={sortOption === "byHighPrice"}
              onChange={() => toggleSortOption("byHighPrice")}
              className={styles.customCheckbox}
            />
            <span>
              Expensive
              {sortOption === "byHighPrice" && (
                <svg className={styles.searchIcon}>
                  <use href="/sprite.svg#icon-x-2"></use>
                </svg>
              )}
            </span>
          </label>
        </div>
        <div className={styles.filterRow}>
          <button
            type="button"
            onClick={resetFilters}
            className={styles.resetButton}
          >
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticesFilters;
