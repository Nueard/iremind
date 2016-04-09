import {Component, Input, ElementRef} from 'angular2/core';
import {Platform} from 'ionic-angular';

declare var google: any;

@Component({
    selector: '[ir-map]',
    templateUrl: 'build/services/directives/map/map.html'
})
export class MapDirective {

    @Input('ir-map') locations: any;

    constructor(
        platform: Platform,
        el: ElementRef) {
        platform.ready().then(() => {
            console.log(el);
            console.log(this.locations);
            let position = new google.maps.LatLng(0, 0);
            let mapOptions = {
                center: position,
                zoom: 15,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            }
            let map = new google.maps.Map(el.nativeElement, mapOptions);
            let bounds = new google.maps.LatLngBounds();
            this.locations.forEach((location) => {
                let position = new google.maps.LatLng(location.latitude, location.longitude);
                bounds.extend(position);
                this.addMarker(position, map);
            });
            map.fitBounds(bounds);
        });
    }

    addMarker = (position, map) => {
        let marker = new google.maps.Marker({
            map: map,
            title: name,
            animation: google.maps.Animation.DROP,
            position: position
        });
    }
}