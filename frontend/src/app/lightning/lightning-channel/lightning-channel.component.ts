
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
  templateUrl: './lightning-channel.component.html',
  styleUrls: ['./lightning-channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LightningChannelComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private router: ActivatedRoute,
  ) { }

  chan_id=this.router.snapshot.params.chan_id;

  chanInfo$: any;
   ngOnInit() {
    this.apiService.getChannelInfo$(this.chan_id).subscribe(
      data=>{
        this.chanInfo$=data
        console.log(this.chanInfo$)
      }
    );
  }

}
