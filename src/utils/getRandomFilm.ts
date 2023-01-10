
const MAX_FILM_ID = 400;
export const getRandomFilm: (notThisone?:number) => number  = (notThisone?: number) => {
    const filmNumber = Math.floor(Math.random() * (MAX_FILM_ID - 1))

    if(filmNumber !== notThisone) return filmNumber;
    return getRandomFilm(notThisone)
};

export const getOptionsForVote = () => {
    const fisrtId:number = getRandomFilm();
    const secondId:number = getRandomFilm(fisrtId);
    return [fisrtId  as number, secondId as number];
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any



