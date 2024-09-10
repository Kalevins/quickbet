import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { LikeButton, RadialProgress } from "@/components";
import styles from "./styles.module.css";

interface CardMovieProps {
  id: number;
  title: string;
  date: string;
  image: string;
  isFavorite: boolean;
  rating: number;
}

export const CardMovie: FC<CardMovieProps> = ({
  id,
  title,
  date,
  image,
  isFavorite,
  rating,
}): JSX.Element => {
  return (
    <Link href={`/movie/${id}`}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={`https://image.tmdb.org/t/p/original${image}`}
            alt="Popular Banner Image"
            width={600}
            height={800}
          />
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>{title}</h4>
          <small className={styles.date}>{date}</small>
          <div className={styles.indicators}>
            <div className={styles.rating}>
              <small>Rating</small>
              <RadialProgress
                rating={rating}
                radius={20}
                stroke={3}
                fontSize={12}
              />
            </div>
            <div className={styles.favorite}>
              <small>Favorites</small>
              <LikeButton idMovie={id} isFavorite={isFavorite} fontSize={42} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
