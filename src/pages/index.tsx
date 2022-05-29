import AnilistApi from "@/api/AnilistApi";
import ClientOnly from "@/components/shared/ClientOnly";
import HomeBanner from "@/components/shared/HomeBanner";
import Section from "@/components/shared/Section";
import { Media } from "@/types";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { getSeason, getNextSeason } from "@/utils";
import ColumnSection from "@/components/shared/ColumnSection";
import Rantings from "@/components/shared/Rantings";

interface AnimePageProps {
   trendingAnime: Media[];
   popularSeason: Media[];
   popularAllTime: Media[];
   favouriteAllTime: Media[];
   animeNextSeason: Media[];
   ratingAnime: Media[];
}

const AnimePage: NextPage<AnimePageProps> = ({
   trendingAnime,
   popularSeason,
   popularAllTime,
   favouriteAllTime,
   animeNextSeason,
   ratingAnime
}) => {
   const currentSeason = getSeason();
   const nextSeason = getNextSeason();

   return (
      <React.Fragment>
         <Head>
            <title>Kurumi - Anime</title>
         </Head>
         <ClientOnly>
            <HomeBanner type="anime" data={trendingAnime} />

            <Section className="flex flex-col md:flex-row items-center md:space-between space-y-4 space-x-0 md:space-y-0 md:space-x-4">
               <ColumnSection 
                  title="POPULAR THIS SEASON"
                  type="anime"
                  data={popularSeason}
                  viewMoreHref={`/browse?sort=popularity&type=anime&season=${currentSeason.season}&seasonYear=${currentSeason.year}`}
               />
               <ColumnSection 
                  title="ALL TIME POPULAR"
                  type="anime"
                  data={popularAllTime}
                  viewMoreHref="/browse?sort=popularity&type=anime"
               />
               <ColumnSection
                  title="All TIME FAVORITE"
                  type="anime"
                  data={favouriteAllTime}
                  viewMoreHref="/browse?sort=favourites&type=anime"
               />
               <ColumnSection
                  title="ANIME NEXT SEASON"
                  type="anime"
                  data={animeNextSeason}
                  viewMoreHref={`browse?type=anime&season=${nextSeason.season}&seasonYear=${nextSeason.year}&sort=popularity`}
               />

            </Section>
            <Rantings 
               title='Top 20 Anime'
               type='anime'
               data={ratingAnime}
            />
         </ClientOnly>
      </React.Fragment>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const currentSeason = getSeason();
   const nextSeason = getNextSeason();

   const { data: trendingAnime } = await AnilistApi.getAnime({
      type: 'ANIME',
      sort: 'TRENDING_DESC',
      perPage: 15
   })
   const { data: popularSeason } = await AnilistApi.getAnime({
      type: 'ANIME',
      seasonYear: currentSeason.year,
      sort: 'POPULARITY_DESC',
      season: currentSeason.season,
      perPage: 5,
   })
   const { data: popularAllTime } = await AnilistApi.getAnime({
      type: 'ANIME',
      sort: 'POPULARITY_DESC',
      perPage: 5,
   })
   const { data: favouriteAllTime } = await AnilistApi.getAnime({
      type: 'ANIME',
      sort: 'FAVOURITES_DESC',
      perPage: 5,
   })
   const { data: animeNextSeason } = await AnilistApi.getAnime({
      type: 'ANIME',
      sort: 'POPULARITY_DESC',
      season: nextSeason.season,
      seasonYear: 2022,
      perPage: 5,
   })
   const { data: ratingAnime } = await AnilistApi.getAnime({
      type: 'ANIME',
      perPage: 20,
      sort: 'SCORE_DESC',
   })
   return {
      props: {
         trendingAnime: trendingAnime.Page.media,
         popularSeason: popularSeason.Page.media,
         popularAllTime: popularAllTime.Page.media,
         favouriteAllTime: favouriteAllTime.Page.media,
         animeNextSeason: animeNextSeason.Page.media,
         ratingAnime: ratingAnime.Page.media
      }
   }
}

export default AnimePage;