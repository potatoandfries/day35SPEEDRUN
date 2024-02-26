import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';
import { Search, Weather } from './models';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // Recall you need APIKEY and URL
  private APIKEY !: string;
  private URL !: string;

  constructor(private httpclient: HttpClient) { 
    this.APIKEY= environment.APIKEY;
    this.URL=environment.URL;
  }

  // make a subject of weather cause thats what you want 
  public WeatherSubject  = new Subject<Weather>;

  //get request
  // since u only want 1 value and no need for any tempering(filter/map/reduce)-> use promise
  // simple then catch for this.
  public getWeather(city: string){
    const params = new HttpParams()
    .set("q",city)
    .set("appid",this.APIKEY);

    return lastValueFrom(this.httpclient.get<Weather>(this.URL,{params}))
      .then (result => {this.WeatherSubject.next(result)})
      .catch(error=>{console.error("error fetching weather data",error)});
    }
  

  //here we are introduced to the singleton'ness of services. thats why i need this
  public SearchSubject = new Subject<any>();

  public addcity(city :string){
    this.SearchSubject.next(city);
  }
}
