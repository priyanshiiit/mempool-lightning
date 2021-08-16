
import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { filter, map, scan, share, switchMap, tap } from 'rxjs/operators';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { IBackendInfo } from '../../interfaces/websocket.interface';
import { Router } from '@angular/router';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-lightning',
  templateUrl: './lightning.component.html',
  styleUrls: ['./lightning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightningComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private router: Router
  ) { }

  // searchVal="";

  // getVal(val){
  //   console.log(val);
  //   this.searchVal = val;
  //   if(this.searchVal.length === 19)
  //   {
  //     this.router.navigateByUrl('/lightning/channel/'+val);
  //   }
  //   if(this.searchVal.length === 66)
  //   {
  //     this.router.navigateByUrl('/lightning/node/'+val);
  //   }
  // }

  data$: any;
  latestNodes$: any;
  latestChannels$: any;
   ngOnInit() {
    this.apiService.getGraphInfo$().subscribe(
      data=>{
        this.data$=data
        console.log(this.data$)
      }
    );
    this.apiService.getLatestNodes$().subscribe(
      data=>{
        this.latestNodes$=data;
        console.log(this.latestNodes$);
      }
    );
    this.apiService.getLatestChannels$().subscribe(
      data=>{
        this.latestChannels$=data;
        console.log(this.latestChannels$);
      }
    )
  }
}
