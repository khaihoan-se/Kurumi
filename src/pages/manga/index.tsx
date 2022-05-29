import AnilistApi from "@/api/AnilistApi";
import ClientOnly from "@/components/shared/ClientOnly";
import ColumnSection from "@/components/shared/ColumnSection";
import HomeBanner from "@/components/shared/HomeBanner";
import Section from "@/components/shared/Section";
import { Media } from "@/types";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import Rantings from "@/components/shared/Rantings";

interface MangaPageProps {
    trendingManga: Media[];
    popularAllTimeManga: Media[];
    favouriteAllTimeManga: Media[];
    ratingManga: Media[];
}

const MangaPage: NextPage<MangaPageProps> = ({
    trendingManga,
    popularAllTimeManga,
    favouriteAllTimeManga,
    ratingManga
}) => {
    console.log(trendingManga);
    
    return (
        <React.Fragment>
            <Head>
                <title>Kurumi - Manga</title>
            </Head>

            <ClientOnly>
                <HomeBanner type="manga" data={trendingManga} />
                <Section className="flex flex-col md:flex-row items-center md:space-between space-y-4 space-x-0 md:space-y-0 md:space-x-4">
                    <ColumnSection
                        title='ALL TIME POPULAR'
                        type='manga'
                        data={popularAllTimeManga}
                        viewMoreHref='/browse?sort=popularity&type=manga'
                    />
                    <ColumnSection
                        title='All TIME FAVORITE'
                        type='manga'
                        data={favouriteAllTimeManga}
                        viewMoreHref='browse?sort=favourites&type=manga'
                    />
                </Section>
                <Rantings 
                  title='Top 20 Manga'
                  type='manga'
                  data={ratingManga}
               />
            </ClientOnly>
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data: trendingManga } = await AnilistApi.getAnime({
        type: 'MANGA',
        sort: 'TRENDING_DESC',
        perPage: 15
    })
    const { data: popularAllTimeManga } = await AnilistApi.getAnime({
        type: 'MANGA',
        perPage: 5,
        sort: 'POPULARITY_DESC'
     })
     const { data: favouriteAllTimeManga } = await AnilistApi.getAnime({
        type: 'MANGA',
        perPage: 5,
        sort: 'FAVOURITES_DESC'
     })
     const { data: ratingManga } = await AnilistApi.getAnime({
        type: 'MANGA',
        perPage: 20,
        sort: 'SCORE_DESC',
     })
    return {
        props: {
            trendingManga: trendingManga.Page.media,
            popularAllTimeManga: popularAllTimeManga.Page.media,
            favouriteAllTimeManga: favouriteAllTimeManga.Page.media,
            ratingManga: ratingManga.Page.media
        }
    }
}

export default MangaPage;