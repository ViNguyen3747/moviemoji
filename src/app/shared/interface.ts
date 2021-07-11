export interface IEmoji {
    categories: string;
    value: string;
    meaning: string;
    id: string;
}

export interface IMovie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: string;
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface IResponse {
    page: number;
    results: IMovie[];
    total_results: number;
    total_pages: number;
}

export interface IProdCo {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ICast {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number    
}

export interface ITrailer {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    key: string,
    name: string,
    site: string,
    size: number
    type: string;
}

export interface ISort{
    value:string;
    display:string;
}

export interface IProviderDetails {
    display_priority: number,
    logo_path: string,
    provider_id: number,
    provider_name: string
}
export interface IProviders{
    link: string;    
    rent: IProviderDetails[],    
    buy: IProviderDetails[]
    flatrate: IProviderDetails[],
    
}