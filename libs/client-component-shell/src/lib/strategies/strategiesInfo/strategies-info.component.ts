import { Component, OnInit } from '@angular/core';
import { MmmStrategyService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-strategies-info',
  templateUrl: './strategies-info.component.html',
  styleUrls: ['./strategies-info.component.css'],
})
export class StrategiesInfoComponent implements OnInit {

  displayedColumns: string[] = ['strategy', 'description'];
  dataSource: any;

  constructor(private mmmstrategyService: MmmStrategyService) {

  }

  ngOnInit() {
    this.getStratergyInfo()
  }


  getStratergyInfo()
  {
    this.mmmstrategyService.getStratergyList().subscribe((data) => {
      this.dataSource = data
    })
  }

  
}
