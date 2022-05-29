import React, { useState, useRef, useEffect, useCallback } from "react";
import { Media } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import { MdTagFaces } from "react-icons/md";
import YouTube, { YouTubeProps } from "react-youtube";
import { SwiperProps } from "@/components/shared/Swiper";
import Image from "next/image";
import classNames from "classnames";
import Description from "@/components/shared/Description";
import DotList from "@/components/shared/DotList";
import TextIcon from "@/components/shared/TextIcon";
import CircleButton from "@/components/shared/CircleButton";
import Link from "next/link";
import BannerSwiper from "@/components/shared/BannerSwiper";

const bannerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const transition = [0.33, 1, 0.68, 1];

interface HomeBannerProps<T> {
    type: T;
    data: T extends "anime" ? Media[] : Media[];
}

const HomeBanner = <T extends "anime" | "manga">({
    type,
    data
}: HomeBannerProps<T>) => {
    console.log("Home Banner", data);
    const [ index, setIndex ] = useState<number>(0);
    const [ showTrailer, setShowTrailer ] = useState<boolean>(false);
    const [player, setPlayer] =
        useState<ReturnType<YouTube["getInternalPlayer"]>>();
    const [isMuted, setIsMuted] = useState(true);
    const isRanOnce = useRef(false);

    const activeData = data[index];

    const handleSlideChange: SwiperProps["onSlideChange"] = useCallback(
        (swiper: any) => {
          setIndex(swiper.realIndex);
        },
        []
    );

    const getRedirectUrl = useCallback(
        (id: number) => {
          return type === "anime" ? `/anime/details/${id}` : `/manga/details/${id}`;
        },
        [type]
    );

    const mute = useCallback(() => {
        if (!player) return;
    
        player.mute();
    
        setIsMuted(true);
    }, [player]);
    
    const unMute = useCallback(() => {
        if (!player) return;
    
        player.unMute();
    
        setIsMuted(false);
    }, [player]);

    useEffect(() => {
        setShowTrailer(false);
    }, [activeData]);

    return (
        <React.Fragment>
            <div className="group relative h-[460px] w-full overflow-hidden">
                <AnimatePresence>
                    {activeData.bannerImage && !showTrailer && (
                        <motion.div
                            variants={bannerVariants}
                            animate="animate"
                            exit="exit"
                            initial="initial"
                            className="w-full h-0"
                            key={activeData.title.english}
                        >
                            <Image src={activeData.bannerImage} layout="fill" alt={activeData.title.english} className="object-cover" />
                        </motion.div>
                    )}
                    {(activeData as Media)?.trailer && (
                        <YouTube
                            videoId={(activeData as Media)?.trailer?.id}
                            onReady={({ target }) => {
                                setPlayer(target);
                            }}
                            onPlay={({ target }) => {
                                setShowTrailer(true);

                                if (!isRanOnce.current) {
                                setIsMuted(true);
                                } else if (!isMuted) {
                                setIsMuted(false);

                                target.unMute();
                                }

                                isRanOnce.current = true;
                            }}
                            onEnd={() => {
                                setShowTrailer(false);
                            }}
                            onError={() => {
                                setShowTrailer(false);
                            }}
                            containerClassName={classNames(
                                "relative w-full overflow-hidden aspect-w-16 aspect-h-9 h-[300%] -top-[100%]",
                                !showTrailer && "hidden"
                            )}
                            className="absolute inset-0 w-full h-full"
                            opts={{
                                playerVars: {
                                autoplay: 1,
                                modestbranding: 1,
                                controls: 0,
                                mute: 1,
                                origin: "https://kaguya.live",
                                },
                            }}
                        />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 flex flex-col justify-center px-4 banner__overlay md:px-12"></div>

                <motion.div
                    variants={bannerVariants}
                    animate="animate"
                    initial="initial"
                    key={activeData.title.english}
                    className="absolute left-12 top-1/2 -translate-y-1/2 w-full md:w-[45%]"
                    transition={{ ease: transition, duration: 1 }}
                >
                    <h1 className="text-2xl font-bold uppercase md:text-4xl line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                        {activeData.title.english}
                    </h1>
                    <div className="flex flex-wrap items-center mt-4 text-lg gap-x-8">
                        {activeData.averageScore && (
                            <TextIcon LeftIcon={MdTagFaces} iconClassName="text-green-300">
                                <p>{activeData.averageScore}%</p>
                            </TextIcon>
                        )}

                        <TextIcon LeftIcon={AiFillHeart} iconClassName="text-red-400">
                            <p>{activeData.favourites}</p>
                        </TextIcon>

                        <DotList>
                            {activeData.genres.map((genre) => (
                                <span key={genre}>{genre}</span>
                            ))}
                        </DotList>
                    </div>

                    <Description
                        description={activeData.description}
                        className="hidden mt-2 text-base md:block text-gray-200 md:line-clamp-5"
                    />
                </motion.div>

                <Link href={getRedirectUrl(activeData.id)}>
                    <a>
                        <CircleButton
                            LeftIcon={AiFillPlayCircle}
                            outline
                            className="absolute hidden -translate-x-1/2 -translate-y-1/2 opacity-0 md:block left-2/3 top-1/2 group-hover:opacity-100"
                            iconClassName="w-16 h-16"
                        />
                    </a>
                </Link>

                {showTrailer && player && (
                    <CircleButton
                        LeftIcon={isMuted ? BsFillVolumeMuteFill : BsFillVolumeUpFill}
                        outline
                        className="absolute bottom-20 right-12"
                        iconClassName="w-6 h-6"
                        onClick={isMuted ? unMute : mute}
                    />
                )}

                <div className="absolute bottom-0 w-full h-16 banner__overlay--down"></div>
            </div>
            <div className="w-full px-4 pb-12 md:px-12">
                <BannerSwiper onSlideChange={handleSlideChange} data={data} />
            </div>
        </React.Fragment>
    )
}

export default HomeBanner;