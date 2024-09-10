import type { FC } from "react";
import Image from "next/image";

import { RadialProgress, LikeButton } from "@/components";
import styles from "./styles.module.css";

interface PopularBannerProps {
  id: number;
  title: string;
  description: string;
  image: string;
  isFavorite: boolean;
  rating: number;
}

export const PopularBanner: FC<PopularBannerProps> = ({
  id,
  title,
  description,
  image,
  isFavorite,
  rating,
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={`https://image.tmdb.org/t/p/original${image}`}
        alt="Popular Banner Image"
        width={1920}
        height={1080}
      />
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.indicators}>
          <LikeButton
            key={isFavorite ? "like" : "unlike"}
            idMovie={id}
            isFavorite={isFavorite}
            fontSize={32}
            isClickable={true}
          />
          <div className={styles.rating}>
            <RadialProgress rating={rating} />
          </div>
        </div>
      </div>
    </div>
  );
};
