"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addPet } from "@/redux/petSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import styles from "./AddPetForm.module.css";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

// Валидационная схема
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  imgURL: Yup.string().nullable().required("Image URL is required"),
  species: Yup.string().required("Species is required"),
  birthday: Yup.date().required("Birthday is required"),
  sex: Yup.string().required("Sex is required"),
});

const speciesOptions = [
  "dog",
  "cat",
  "monkey",
  "bird",
  "snake",
  "turtle",
  "lizard",
  "frog",
  "fish",
  "ants",
  "bees",
  "butterfly",
  "spider",
  "scorpion",
];

const AddPetForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      name: "",
      imgURL: "",
      species: "",
      birthday: null,
      sex: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSex, setSelectedSex] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file format. Allowed: PNG, JPG, JPEG");
        return;
      }
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        alert("File size exceeds 5 MB");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setValue("imgURL", file.name);
      console.log("File selected successfully");
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const CLOUD_NAME = "drdr3yy7o";
    const UPLOAD_PRESET = "ml_default";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      // Если выбран файл, сначала загрузить изображение
      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary(selectedFile);
        data.imgURL = uploadedUrl;
      }

      // Принудительно форматируем дату перед отправкой
      data.birthday = format(new Date(data.birthday), "yyyy-MM-dd");

      console.log("Submitted birthday:", data.birthday); // теперь должно быть "YYYY-MM-DD"

      await dispatch(addPet(data)).unwrap();
      toast.success("Pet added successfully!");
      router.push("/profile");
    } catch (error) {
      toast.error(error.message || "Failed to add pet");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd"); // гарантированный формат
    setValue("birthday", formattedDate, { shouldValidate: true });
  };

  const handleSexChange = (sex) => {
    setSelectedSex(sex);
    setValue("sex", sex);
  };

  const sexOptions = [
    {
      value: "male",
      defaultIcon: "/sprite.svg#icon-male",
      selectedIcon: "/sprite.svg#icon-male1",
    },
    {
      value: "female",
      defaultIcon: "/sprite.svg#icon-female",
      selectedIcon: "/sprite.svg#icon-female1",
    },
    {
      value: "multiple",
      defaultIcon: "/sprite.svg#icon-healthicons_sexual-reproductive-health",
      selectedIcon: "/sprite.svg#icon-healthicons_sexual-reproductive-health-1",
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "60px",
      padding: "14px 24px",
      borderColor: state.isFocused ? "#000" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 0, 0.2)" : "none",
      fontSize: "16px",
      fontWeight: "500",
      backgroundColor: "#FFF",
      "&:hover": {
        borderColor: "#000",
      },
      width: "210px",
      height: "52px",
      alignItems: "center",
      alignContent: "center",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "32px",
      padding: "10px 0",
      backgroundColor: "#FFF",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxHeight: "200px",
      overflowY: "auto",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "16px",
      fontWeight: "500",
      color: state.isSelected ? "#000" : "#333",
      backgroundColor: state.isSelected ? "#f0f0f0" : "transparent",
      padding: "12px 20px",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      width: "0px",
    }),
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        Add my pet / <span className={styles.span}>Personal details</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Выбор пола питомца */}
        <Controller
          name="sex"
          control={control}
          render={({ field }) => {
            const handleSexChange = (value) => {
              field.onChange(value); // Обновляем значение в react-hook-form
              setSelectedSex(value); // Обновляем локальный стейт (для визуальной подсветки)
            };

            return (
              <div className={styles.fieldSex}>
                <div className={styles.radioGroup}>
                  {sexOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`${styles.radioLabel} ${
                        styles[option.value]
                      } ${selectedSex === option.value ? styles.selected : ""}`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={selectedSex === option.value}
                        onChange={() => handleSexChange(option.value)}
                        className={styles.hiddenRadio}
                      />
                      <svg className={styles.sexIcon}>
                        <use
                          href={
                            selectedSex === option.value
                              ? option.selectedIcon
                              : option.defaultIcon
                          }
                        ></use>
                      </svg>
                      {option.label}
                    </label>
                  ))}
                </div>
                {errors.sex && (
                  <p className={styles.error}>{errors.sex.message}</p>
                )}
              </div>
            );
          }}
        />

        {/* Превью выбранного изображения */}
        <div className={styles.avatarPreview}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar Preview"
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.userIcon}>
              <svg className={styles.icon2}>
                <use href="/sprite.svg#icon-icons8_cat-footprint"></use>
              </svg>
            </div>
          )}
        </div>

        {/* Загрузка изображения */}
        <Controller
          name="imgURL"
          control={control}
          render={({ field }) => (
            <div className={styles.avatarUpload}>
              <input
                type="text"
                placeholder="Enter URL"
                value={field.value}
                readOnly
                className={styles.avatarInput}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // Вызываем вашу функцию для обработки файла
                  handleFileChange(e);
                  // Если нужен файл, можно сохранить имя файла в форме:
                  const file = e.target.files[0];
                  if (file) {
                    field.onChange(file.name);
                  }
                }}
                className={styles.fileInput}
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className={styles.uploadBtn}>
                <svg className={styles.uploadIcon} width={18} height={18}>
                  <use href="/sprite.svg#icon-upload-cloud"></use>
                </svg>
                Upload photo
              </label>
              {errors.imgURL && (
                <p className={styles.error}>{errors.imgURL.message}</p>
              )}
            </div>
          )}
        />

        {/* Поля ввода остальных данных */}
        <div className={styles.field}>
          <label htmlFor="title"></label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="name"></label>
          <input
            id="name"
            type="text"
            placeholder="Pet’s Name"
            {...register("name")}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.fieldContainer}>
          <div className={styles.field2}>
            <label htmlFor="birthday"></label>
            <div className={styles.datePickerContainer}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="00.00.0000"
                className={styles.datePicker}
              />
              <svg className={styles.calendarIcon}>
                <use href="/sprite.svg#icon-calendar"></use>
              </svg>
            </div>
            {errors.birthday && (
              <p className={styles.error}>{errors.birthday.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="species"></label>
            <Controller
              name="species"
              control={control}
              rules={{ required: "Species is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={speciesOptions.map((species) => ({
                    value: species,
                    label: species,
                  }))}
                  styles={customStyles}
                  placeholder="Type of pet"
                  onChange={(selectedOption) => {
                    setValue(
                      "species",
                      selectedOption ? selectedOption.value : "",
                      { shouldValidate: true }
                    );
                  }}
                  value={
                    speciesOptions.find((option) => option === field.value)
                      ? { value: field.value, label: field.value }
                      : null
                  }
                />
              )}
            />

            {errors.species && (
              <p className={styles.error}>{errors.species.message}</p>
            )}
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className={styles.backButton}
          >
            Back
          </button>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
