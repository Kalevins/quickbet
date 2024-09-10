"use client";

import { useState, type FC } from "react";

import { IconLikeFilled, IconLikeOutlined } from "@/assets";
import styles from "./styles.module.css";
import { addFavorite } from "@/api";
import { useAuth, useModalLogin } from "@/contexts";

interface LikeButtonProps {
  idMovie: number;
  isFavorite: boolean;
  fontSize?: number;
  isClickable?: boolean;
}

export const LikeButton: FC<LikeButtonProps> = ({
  idMovie,
  isFavorite,
  fontSize = 24,
  isClickable = false,
}): JSX.Element => {
  const { isAuth } = useAuth();
  const { handleOpenModal } = useModalLogin();
  const [favorite, setFavorite] = useState<boolean>(isFavorite);
  const handleFavorite = (): void => {
    if (!isClickable) return;

    if (!isAuth) {
      handleOpenModal(true);
      return;
    }

    addFavorite({
      movieId: idMovie,
    }).then(() => {
      setFavorite(!favorite);
    });
  };

  return (
    <button
      className={styles.favorite}
      id={isClickable ? styles.clickable : ""}
      style={{ fontSize: `${fontSize}px` }}
      onClick={handleFavorite}
    >
      {favorite ? <IconLikeFilled /> : <IconLikeOutlined />}
    </button>
  );
};
