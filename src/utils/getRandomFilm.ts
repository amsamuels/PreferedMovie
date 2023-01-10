
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
  T extends (...args: any) => Promise<infer R> ? R : any;

export async function getData(id:any) {
    // Set the URL of the API endpoint
    const url =  `http://localhost:8080/film/${id}`;
  
    // Set the request options
    const options: RequestInit = {
      method: 'GET',
    };
  
    // Make the request
    const response = await fetch(url, options);
  
    // Check the status of the response
    if (response.ok) {
      // If the response is successful, parse the JSON data
      const data = await response.json();
      // Do something with the data
      return data
    } else {
      // If the response is not successful, throw an error
      throw new Error(response.statusText);
    }
  }

  export async function getAllData() {
    // Set the URL of the API endpoint
    const url =  'http://localhost:8080/film';
  
    // Set the request options
    const options: RequestInit = {
      method: 'GET',
    };
  
    // Make the request
    const response = await fetch(url, options);
  
    // Check the status of the response
    if (response.ok) {
      // If the response is successful, parse the JSON data
      const data = await response.json();
      // Do something with the data
      return data
    } else {
      // If the response is not successful, throw an error
      throw new Error(response.statusText);
    }
  }