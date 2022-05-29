import AnilistApi from "@/api/AnilistApi";
import { Media } from "@/types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface AnimeDetailPage {
    animeDetailPage: Media[];
}

const AnimeDetailPage: NextPage<AnimeDetailPage> = ({
    animeDetailPage
}) => {
    console.log(animeDetailPage);
    
    return (
        <div>AnimeDetailPage</div>
    )
}

export const getStaticProps: GetStaticProps = async ({
    params: { params }
}) => {
    console.log(params[0]);
    
    const { data: animeDetailPage } = await AnilistApi.getAnime({
        type: 'ANIME',
        sort: 'TRENDING_DESC',
        id: Number(params[0])
    })

    return {
        props: {
            animeDetailPage: animeDetailPage.Page.media
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await AnilistApi.getAnime({
        type: 'ANIME',
        sort: 'TRENDING_DESC',
        perPage: 5,
    })

    const paths = data.Page.media.map((anime: Media) => ({
        params: { params: [anime.id.toString()] },
    }));
    
    return { paths, fallback: "blocking" };
}
export default AnimeDetailPage;