import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Search } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  constructor(private svc: WeatherService){
  }

  public SearchList: Search[] = [
    { city: "Singapore" },
    { city: "Beijing"},
    { city: "Japan"},
  ];


  ngOnInit(): void {
    // USE of subscribeeee!!! YAYYYY :3 , I can just push the observable as city into Search.
    this.svc.SearchSubject.asObservable().subscribe(c => {
      this.SearchList.push({ city: c });
    });
  }

}
