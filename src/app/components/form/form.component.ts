import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../weather.service';
import { Search } from '../../models';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  //use either this 1.this or lowercase inject or use constructor(private fb:formbuilder){}
  //this is where you inject the svc.
  constructor(private fb: FormBuilder, private svc: WeatherService){}

  searchForm !: FormGroup;


    ngOnInit(): void {
      //this.formgrop = this.creationmethod(this.input);
      this.searchForm = this.createForm();
    }

  private createForm(): FormGroup<any> {
    return this.fb.group({
      city : this.fb.control("",[Validators.required])
    });
  }

  pressed(): void {

    //when click parse value from form into object -> this is very powerful this is where u bind the value from form to model object
    const s : Search = this.searchForm.value;
    // triggered; i will send city name as event
    this.svc.getWeather(s.city);
    // triggered; i will send city name as event to another service
    this.svc.addcity(s.city);
    // make a new form
    this.searchForm = this.createForm();
  }
}
