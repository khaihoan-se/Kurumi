import { Media } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import DotList from "./DotList";
import PlainCard from "./PlainCard";

interface HorizontalCardProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T extends "anime" ? Media : Media;
  type?: T;
}

const HorizontalCard = <T extends "anime" | "manga">({
  data,
  type,
  className,
  ...props
}: HorizontalCardProps<T>) => {
  const redirectUrl = useMemo(
    () =>
      type === "anime"
        ? `/anime/details/${data.id}`
        : `/manga/details/${data.id}`,
    [data.id, type]
  );

  const { locale } = useRouter();

  return (
    <div
      className={classNames("flex items-center space-x-2 h-24 py-2", className)}
      {...props}
    >
      <div className="shrink-0 w-12">
        <Link href={redirectUrl}>
          <a>
            <PlainCard src={data.coverImage.extraLarge} />
          </a>
        </Link>
      </div>

      <div className="space-y-1 self-start">
        <Link href={redirectUrl}>
          <a>
            <p className="text-white font-semibold line-clamp-1 hover:text-primary-300 transition duration-300">
              {data.title.english}
            </p>
          </a>
        </Link>

        <DotList className="text-sm text-gray-300">
          {data.format && <span>{data.format}</span>}

          {"season" in data && "seasonYear" in data && (
            <span>
              {data.season} {data.seasonYear}
            </span>
          )}

          {data.status && (
            <span>{data.status}</span>
          )}
        </DotList>

        <DotList className="text-sm text-gray-300">
          {data.genres?.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </DotList>
      </div>
    </div>
  );
};

export default React.memo(HorizontalCard);
