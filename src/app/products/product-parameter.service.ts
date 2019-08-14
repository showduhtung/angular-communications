import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class ProductParameterService implements OnDestroy{
  showImage: boolean = true;
  filterBy: string;

  constructor() {
    console.log('Service created')
  }

  ngOnDestroy(): void{
    console.log('Service destroyed')
  }

}
