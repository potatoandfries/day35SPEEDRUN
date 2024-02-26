import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../weather.service';
import { Weather } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private svc: WeatherService){}

  Weather$! : Observable<Weather>;

  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe(params=> {
    const city = params.get("city");
    if (city){
      this.svc.getWeather(city);
      this.Weather$ = this.svc.WeatherSubject.asObservable();
    }
   })
  }
}
