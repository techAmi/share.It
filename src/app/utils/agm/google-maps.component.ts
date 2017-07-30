import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';


declare var google;

@Component({
    moduleId: module.id,
    selector: 'google-maps',
    templateUrl: 'google-maps.component.html',
    styleUrls: ['google-maps.component.html']
})



export class GoogleMapsComponent implements OnInit {
    public latitute: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild('search')
    public searchElementref: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        // set google maps defaults
        this.zoom = 2;
        this.latitute = 35.748428;
        this.longitude = 139.702587;

        // create search FormControl
        this.searchControl = new FormControl();

        // set current location
        this.setCurrentPosition();

        // load Places autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementref.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // // get the place result
                    // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    // console.log('place ', place);

                    // // verify result
                    // if (place.geometry === undefined || place.geometry === null) {
                    //     return;
                    // }
                    // console.log('place geometry', place.geometry.location.lat());
                    // // set latitude, longitude and zoom
                    // this.latitute = place.geometry.location.lat();
                    // this.longitude = place.geometry.location.lng();
                    // console.log('the latitude', this.latitute);
                    // this.zoom = 3;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitute = position.coords.longitude;
                this.longitude = position.coords.longitude;
                this.zoom = 3;
            })
        }
    }
}
