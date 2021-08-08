
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
  }

}
