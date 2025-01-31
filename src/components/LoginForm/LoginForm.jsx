"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import Title from "../Title/Title";
import Link from "next/link";

const validationSchema = Yup.object().shape({
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
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
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

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/profile");
    } else {
      alert(resultAction.payload);
    }
  };

  return (
    <div className={styles.container}>
      <Title text="Log in" />
      <p className={styles.text}>
        Welcome! Please enter your credentials to login to the platform:
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            placeholder="Email"
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
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
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
          </div>
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

        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === "loading"}
        >
          Log In
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.textAccount}>
        Don't have an account? <Link href="/register"> Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
