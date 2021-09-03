
import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { filter, map, scan, share, switchMap, tap } from 'rxjs/operators';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { IBackendInfo } from '../../interfaces/websocket.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-lightning',
  templateUrl: './lightning-nodes.component.html',
  styleUrls: ['./lightning-nodes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightningNodesComponent implements OnInit {

  channelGraphOptions: any;
  nodeGraphOptions: any;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private router: ActivatedRoute
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
  page = this.router.snapshot.queryParams.page;
  data$: any;
  latestNodes$: any;
  latestChannels$: any;
   ngOnInit() {
    this.apiService.getGraphInfo$().subscribe(
      data=>{
        this.data$=data
      }
    );
    this.apiService.getNodes$(this.page).subscribe(
      data=>{
        this.latestNodes$=data;
      }
    );
    this.apiService.getLatestChannels$().subscribe(
      data=>{
        this.latestChannels$=data;
      }
    )
    //Channel Graph Data
    const channelGraphXAxisData = [];
    const channelGraphData1 = [];
    const channelGraphData2 = [];

    for (let i = 0; i < 100; i++) {
      channelGraphXAxisData.push(i);
      channelGraphData1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      channelGraphData2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.channelGraphOptions = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: channelGraphXAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: channelGraphData1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: channelGraphData2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
    //Channel Graph Data Ends
    //Node Graph Data
    const nodeGraphXAxisData = [];
    const nodeGraphData1 = [];
    const nodeGraphData2 = [];

    for (let i = 0; i < 100; i++) {
      nodeGraphXAxisData.push(i);
      nodeGraphData1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      nodeGraphData2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.nodeGraphOptions = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: nodeGraphXAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: nodeGraphData1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: nodeGraphData2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}
