export interface Weather{

    weather: {description: string}[],

    main: {
        temp: string;
        feels_like: string;
        humidity:string;
    }
}

export interface Search {

    city: string;
}