import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()
  
  @ViewChild('filterElement') filterElementRef: ElementRef

  private _listFilter: string = "cart";
  get listFilter(): string{
    return this._listFilter
  }
  set listFilter(value:string) {
    this._listFilter = value
    this.valueChange.emit(value)
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes['hitCount'] && !changes['hitCount'].currentValue) this.hitMessage = 'No matches found';
    else this.hitMessage = 'Hits: ' + this.hitCount;
  }

  ngAfterViewInit():void{
    if (this.filterElementRef){
      this.filterElementRef.nativeElement.focus()
    }  
  }

  ngOnInit() {
  }

}
