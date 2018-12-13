import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavouriteProvider {
 favorites: Array<any>;
  constructor(public http: HttpClient) {
    console.log('Hello FavouriteProvider Provider');
    this.favorites =[];
  }
  addFavorite(id: any):boolean{
    this.favorites.push(id);
    return true;
  }

  isFavorite(id: any):boolean{
    
    return this.favorites.some(el => el ===id);
  }
}
