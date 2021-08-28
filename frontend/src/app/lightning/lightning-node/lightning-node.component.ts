
import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { IBackendInfo } from '../../interfaces/websocket.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lightning',
  templateUrl: './lightning-node.component.html',
  styleUrls: ['./lightning-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightningNodeComponent implements OnInit {

  channelGraphOptions: any;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private router: ActivatedRoute,
  ) { }

  
  pub_key=this.router.snapshot.params.pub_key;
  nodeInfo$: any;
   ngOnInit() {
    console.log(this.router.snapshot.params.pub_key)
    this.apiService.getNodeInfo$(this.pub_key).subscribe(
      data=>{
        this.nodeInfo$=data
        console.log(this.nodeInfo$)
      }
    );
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
  }

}
