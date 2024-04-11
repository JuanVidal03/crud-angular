import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchModalService {

  constructor() { }

  // creando el bservable para poder utilizarlo desde cualquier lado
  $modal = new EventEmitter<boolean>();

}
