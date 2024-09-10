import type { FC } from "react";
import Image from "next/image";

import { RadialProgress, LikeButton } from "@/components";
import type { Keyword } from "@/types";
import styles from "./styles.module.css";

interface PopularBannerProps {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  image: string;
  imagePoster: string;
  isFavorite: boolean;
  rating: number;
  keywords: Keyword[];
  homepage: string;
}

export const DescriptionBanner: FC<PopularBannerProps> = ({
  id,
  title,
  description,
  date,
  duration,
  image,
  imagePoster,
  isFavorite,
  rating,
  keywords,
  homepage,
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={`https://image.tmdb.org/t/p/original${image}`}
        alt="Image Banner Background"
        width={1920}
        height={1080}
      />
      <div className={styles.content}>
        <div className={styles.poster}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.posterImage}
              src={`https://image.tmdb.org/t/p/w500${imagePoster}`}
              alt="Popular Banner Poster"
              width={500}
              height={750}
            />
          </div>
          <button
            className={styles.playButton}
            onClick={() => window.open(homepage, "_blank")}
          >
            Official Trailer
          </button>
        </div>
        <div className={styles.posterContainer}>
          <div className={styles.text}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{title}</h1>
              <div className={styles.details}>
                <small>{date}</small>
                <small>{duration} min</small>
              </div>
            </div>
            <h3>Overview:</h3>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.indicators}>
            <div className={styles.rating}>
              <RadialProgress rating={rating} />
              <span className={styles.ratingDetails}>
                <p>Users</p>
                <p>Score</p>
              </span>
            </div>
            <LikeButton
              key={isFavorite ? "like" : "unlike"}
              idMovie={id}
              isFavorite={isFavorite}
              fontSize={48}
              isClickable={true}
            />
          </div>
          <div className={styles.keywords}>
            {keywords.map((keyword) => (
              <small key={keyword.id} className={styles.keyword}>
                {keyword.name}
              </small>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
