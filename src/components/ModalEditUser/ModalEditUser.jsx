"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUser } from "@/redux/userSlice";
import styles from "./ModalEditUser.module.css";

const validationSchema = Yup.object().shape({
  avatar: Yup.string().nullable(),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+38\d{10}$/, "Invalid phone number format")
    .required("Phone number is required"),
});

const ModalEditUser = ({ isOpen, onRequestClose }) => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.avatar || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      avatar: userData?.avatar || "",
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg"];
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
      // Для текстового поля можно сохранить имя, хотя оно заменится URL после загрузки
      setValue("avatar", file.name);
      console.log("File selected successfully");
    }
  };

  useEffect(() => {
    if (userData) {
      reset({
        avatar: userData.avatar || "",
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
      setPreviewUrl(userData.avatar || "");
    }
  }, [userData, reset]);

  // Функция загрузки изображения на Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const CLOUD_NAME = "drdr3yy7o"; // Замените на ваше значение
    const UPLOAD_PRESET = "ml_default"; // Замените на ваш unsigned upload preset

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
    const changedFields = {};

    if (data.name && data.name !== userData.name) {
      changedFields.name = data.name;
    }
    if (data.email && data.email !== userData.email) {
      changedFields.email = data.email;
    }
    if (data.phone && data.phone !== userData.phone) {
      changedFields.phone = data.phone;
    }

    try {
      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary(selectedFile);
        changedFields.avatar = uploadedUrl;
      }

      if (Object.keys(changedFields).length === 0) {
        alert("Нет изменений для сохранения");
        return;
      }

      await dispatch(updateUser(changedFields)).unwrap();
      dispatch(fetchUserData());
      onRequestClose();
    } catch (error) {
      alert(error.message || "Update failed");
    }
  };

  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.50)", zIndex: 10 },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "30px",
      border: "none",
      padding: "0px",
      maxWidth: "90vw",
      zIndex: 11,
      background: "#FFF",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onRequestClose}>
          <svg className={styles.closeIcon}>
            <use href="/sprite.svg#icon-x-1"></use>
          </svg>
        </button>

        <h2 className={styles.title}>Edit information</h2>

        <div className={styles.avatarPreview}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar Preview"
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.userIcon}>
              {userData?.name ? (
                userData.name.charAt(0)
              ) : (
                <svg className={styles.icon2}>
                  <use href="/sprite.svg#icon-user-yellow"></use>
                </svg>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.avatarUpload}>
              <input
                type="text"
                placeholder="Photo"
                {...register("avatar")}
                className={styles.avatarInput}
                readOnly
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className={styles.uploadBtn}>
                <svg className={styles.uploadIcon}>
                  <use href="/sprite.svg#icon-upload-cloud"></use>
                </svg>
                Upload photo
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <input type="text" placeholder="Name" {...register("name")} />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input type="text" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input type="text" placeholder="Phone" {...register("phone")} />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditUser;
