"use client";

import type { FormEvent } from "react";
import { useEffect, useState, type FC } from "react";
import Image from "next/image";

import { useModalLogin } from "@/contexts";
import { login, logout, register } from "@/api";
import ImageSignUp from "@/assets/images/signUp.png";
import ImageSignIn from "@/assets/images/signIn.png";
import styles from "./styles.module.css";
import { useAuth } from "@/contexts/auth";

export const ModalLogin: FC = (): JSX.Element => {
  const activeOptions = {
    signUp: "signUp",
    login: "login",
    logout: "logout",
  };

  const signUpOptions = [
    {
      id: "email",
      placeholder: "Register with your Email",
    },
  ];

  const { isOpen, handleOpenModal } = useModalLogin();
  const { isAuth, handleIsAuth } = useAuth();
  const [error, setError] = useState<string>("");
  const [signUpOption, setSignUpOption] = useState<string>("");
  const [activeOption, setActiveOption] = useState<string>(
    activeOptions.signUp,
  );

  useEffect(() => {
    if (isAuth) {
      setActiveOption(activeOptions.logout);
    } else {
      setActiveOption(activeOptions.signUp);
    }
  }, [isAuth]);

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    login({
      username: email,
      password,
    })
      .then((response) => {
        setError("");
        handleIsAuth(true);
        handleOpenModal(false);
        sessionStorage.setItem("token", response.access_token);
      })
      .catch(() => {
        setError("Invalid credentials. Please try again.");
      });
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    register({
      username: email,
      password,
    })
      .then((response) => {
        setError("");
        handleIsAuth(true);
        handleOpenModal(false);
        sessionStorage.setItem("token", response.access_token);
      })
      .catch(() => {
        setError("Invalid credentials. Please try again.");
      });
  };

  const handleLogout = (): void => {
    logout().finally(() => {
      handleIsAuth(false);
      handleOpenModal(false);
    });
  };

  return (
    <div
      className={styles.containerModal}
      id={isOpen ? "" : styles.inactive}
      onClick={() => handleOpenModal(false)}
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.formContainer}>
          {activeOption !== activeOptions.logout && (
            <div className={styles.buttonsContainer}>
              <button
                className={styles.button}
                id={activeOption === activeOptions.signUp ? styles.active : ""}
                onClick={() => {
                  setError("");
                  setSignUpOption("");
                  setActiveOption(activeOptions.signUp);
                }}
              >
                Sign Up
              </button>
              <button
                className={styles.button}
                id={activeOption === activeOptions.login ? styles.active : ""}
                onClick={() => {
                  setError("");
                  setActiveOption(activeOptions.login);
                }}
              >
                Login
              </button>
            </div>
          )}

          {activeOption === activeOptions.signUp && (
            <div className={styles.form}>
              {signUpOption === "" ? (
                <>
                  {signUpOptions.map((option) => (
                    <button
                      key={option.id}
                      className={styles.buttonForm}
                      onClick={() => setSignUpOption(option.id)}
                    >
                      {option.placeholder}
                    </button>
                  ))}
                </>
              ) : (
                <form className={styles.formClass} onSubmit={handleRegister}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={styles.input}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={styles.input}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={styles.input}
                  />
                  <button className={styles.buttonForm}>Continue</button>
                </form>
              )}
            </div>
          )}

          {activeOption === activeOptions.login && (
            <div className={styles.form}>
              <form className={styles.formClass} onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <button className={styles.buttonForm}>Continue</button>
              </form>
            </div>
          )}

          {activeOption === activeOptions.logout && (
            <div className={styles.form}>
              <button className={styles.buttonForm} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          <div className={styles.messages}>
            <small className={styles.error}>{error}</small>
            <small className={styles.info}>
              For any questions, reach out to support@Quickbetdmovies.com
            </small>
          </div>
        </div>

        {activeOption === activeOptions.signUp && (
          <div className={styles.infoContainer}>
            <h1>Welcome to Quickbet Movies!</h1>
            <p>
              🎬 Ready to unlock a universe of cinematic delights? Sign up now
              and start your journey with us!
            </p>
            <div className={styles.imageContainer}>
              <Image
                className={styles.image}
                src={ImageSignUp}
                alt="Sign Up"
                width={300}
                height={300}
              />
            </div>
          </div>
        )}

        {activeOption === activeOptions.login && (
          <div className={styles.infoContainer}>
            <h1>Welcome back to Quickbet Movies!</h1>
            <p>
              🍿 Ready to dive into the world of unlimited entertainment? Enter
              your credentials and let the cinematic adventure begin!
            </p>
            <div className={styles.imageContainer}>
              <Image
                className={styles.image}
                src={ImageSignIn}
                alt="Login"
                width={300}
                height={300}
              />
            </div>
          </div>
        )}

        {activeOption === activeOptions.logout && (
          <div className={styles.infoContainer}>
            <h1>Goodbye!</h1>
            <p>
              🎥 Thank you for choosing Quickbet Movies! We hope you had a great
              time with us. See you soon!
            </p>
            <div className={styles.imageContainer}>
              <Image
                className={styles.image}
                src={ImageSignIn}
                alt="Login"
                width={300}
                height={300}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
