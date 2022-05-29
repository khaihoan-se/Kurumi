export interface Media {
    description: string;
    trailer: {
        id: string;
        site: string;
    };
    id: number;
    idMal: number;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
    };
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
    };
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        day: number;
        month: number;
        year: number;
    };
    trending: number;
    popularity: number;
    favourites: number;
    bannerImage: string;
    season: number;
    seasonYear: number;
    format: string;
    status: {
        version: number;
        status: string;
        episodes: number;
        volumes: number;
    };
    chapters: number;
    episodes: number;
    duration: number;
    genres: string[];
    isAdult: boolean;
    countryOfOrigin: string;
    averageScore: number;
    meanScore: number;
    synonyms: string[];
    studios: {
        edges: {
            id: number;
            isMain: boolean;
            node: {
                id: number;
                name: string;
                isAnimationStudio: boolean;
                favourites: number;
            };
        }[];
    };
    characters: {
        edges: {
            id: number;
            name: string;
        }[];
    };
}