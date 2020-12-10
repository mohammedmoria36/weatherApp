import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {

  constructor(private _api: ApiService) { }
  loader: boolean = false;
  dataPresent: boolean = false;
  data: object = {};
  errMsg: object = {};
  currentDate = {
    day: '',
    time: ''
  };
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  img_url;

  ngOnInit() {
    // this.calcTime('paris', 3600)
  }

  // convertTemp(value) {
  //   return (value - 273.15).toFixed(2);
  // https://openweathermap.org/data/2.5/onecall?lat=48.85&lon=2.35&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02
  // }

  // calcTime(city, offset) {
  //   // create Date object for current location
  //   var d = new Date();

  //   // convert to msec
  //   // subtract local time zone offset
  //   // get UTC time in msec
  //   var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  //   // create new Date object for different city
  //   // using supplied offset
  //   var nd = new Date(utc + (3600000 * offset));
  //   console.log(nd.toLocaleString(), 'nd.toLocaleString()')
  //   // return time as a string
  //   return "The local time for city" + city + " is " + nd.toLocaleString();
  // }


  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      let json = form.value;
      this.loader = true;
      this.dataPresent = false;
      if (isNaN(json.name) == true) {
        this._api.getWeatherDataByName(json).then((res) => {
          console.log(res)
          this.data = res;
          this.loader = false;
          this.dataPresent = true;
          let d = new Date();
          this.currentDate['day'] = this.days[d.getDay()];
          this.img_url = `https://openweathermap.org/img/wn/${res.weather[0]['icon']}@2x.png`;
          console.log(this.currentDate)
        }).catch((err) => {
          console.log(err)
          this.errMsg = err['error'];
          this.loader = false;
          this.dataPresent = false;
        })
      }
      if (isNaN(json.name) == false) {
        this._api.getWeatherDataById(json).then((res) => {
          console.log(res)
          this.data = res;
          this.loader = false;
          this.dataPresent = true;
          let d = new Date();
          this.currentDate['day'] = this.days[d.getDay()];
          this.img_url = `https://openweathermap.org/img/wn/${res.weather[0]['icon']}@2x.png`;
          console.log(this.currentDate)
        }).catch((err) => {
          console.log(err)
          this.errMsg = err['error'];
          this.loader = false;
          this.dataPresent = false;
        })
      }
      // ...our form is valid, we can submit the data
    }
  }

}
