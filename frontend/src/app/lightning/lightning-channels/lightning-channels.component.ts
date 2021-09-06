
import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { filter, map, scan, share, switchMap, tap } from 'rxjs/operators';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { IBackendInfo } from '../../interfaces/websocket.interface';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-lightning',
  templateUrl: './lightning-channels.component.html',
  styleUrls: ['./lightning-channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightningChannelsComponent implements OnInit {

  
  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  page = this.activatedRoute.snapshot.queryParams.page;
  data$: any;
  latestNodes$: any;
  latestChannels$: any;
   ngOnInit() {
    this.apiService.getGraphInfo$().subscribe(
      data=>{
        this.data$=data
      }
    );
    this.apiService.getLatestNodes$().subscribe(
      data=>{
        this.latestNodes$=data;
      }
    );
    this.apiService.getChannels$(this.page).subscribe(
      data=>{
        this.latestChannels$=data;
      }
    )
  }
  pageChange(page: number) {
    this.apiService.getChannels$(this.page).subscribe(
      data=>{
        this.latestChannels$=data;
      }
    )
      this.router.navigate([], {
        queryParams: { page: page },
        queryParamsHandling: 'merge',
      })
  }
  timestamp(UNIX_timestamp: number){
    var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
  }
}
