"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/registerSlice";
import { useRouter } from "next/navigation";
import styles from "./RegistrationForm.module.css";
import Link from "next/link";
import Title from "../Title/Title";
import { useEffect, useState } from "react";
import { loginUser } from "@/redux/authSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    ),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.register);
  const authStatus = useSelector((state) => state.auth.status);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (authStatus === "succeeded") {
      router.push("/profile"); // Переадресация на страницу профиля после успешной авторизации
    }
  }, [authStatus, router]);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(resultAction)) {
      // После успешной регистрации автоматически авторизуем пользователя
      dispatch(loginUser({ email: data.email, password: data.password }));
    } else {
      alert(resultAction.payload); // Показ уведомления об ошибке
    }
  };

  return (
    <div className={styles.container}>
      <Title text="Registration" />
      <p className={styles.text}>
        Thank you for your interest in our platform.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Name"
            id="name"
            {...register("name")}
            className={`${styles.input} ${
              errors.name
                ? styles.errorInput
                : getValues("name") && !errors.name
                ? styles.validInput
                : ""
            }`}
          />
          <span className={styles.iconWrapper}>
            {errors.name ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-cross"></use>
              </svg>
            ) : getValues("name") ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-check"></use>
              </svg>
            ) : null}
          </span>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            {...register("email")}
            className={`${styles.input} ${
              errors.email
                ? styles.errorInput
                : getValues("email") && !errors.email
                ? styles.validInput
                : ""
            }`}
          />
          <span className={styles.iconWrapper}>
            {errors.email ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-cross"></use>
              </svg>
            ) : getValues("email") ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-check"></use>
              </svg>
            ) : null}
          </span>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password")}
            className={`${styles.input} ${
              errors.password
                ? styles.errorInput
                : getValues("password") && !errors.password
                ? styles.validInput
                : ""
            }`}
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg className={styles.icon2}>
              <use
                href={`/sprite.svg#icon-${showPassword ? "eye" : "eye-off"}`}
              ></use>
            </svg>
          </span>
          <span className={styles.iconWrapper}>
            {errors.password ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-cross"></use>
              </svg>
            ) : getValues("password") ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-check"></use>
              </svg>
            ) : null}
          </span>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`${styles.input} ${
              errors.confirmPassword
                ? styles.errorInput
                : getValues("password") && !errors.password
                ? styles.validInput
                : ""
            }`}
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg className={styles.icon2}>
              <use
                href={`/sprite.svg#icon-${showPassword ? "eye" : "eye-off"}`}
              ></use>
            </svg>
          </span>
          <span className={styles.iconWrapper}>
            {errors.confirmPassword ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-cross"></use>
              </svg>
            ) : getValues("confirmPassword") ? (
              <svg className={styles.icon}>
                <use href="/sprite.svg#icon-check"></use>
              </svg>
            ) : null}
          </span>
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === "loading"}
        >
          Registration
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.textAccount}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
