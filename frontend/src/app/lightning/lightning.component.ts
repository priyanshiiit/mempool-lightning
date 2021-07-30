
import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { StateService } from 'src/app/services/state.service';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IBackendInfo } from 'src/app/interfaces/websocket.interface';
import { Router } from '@angular/router';

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
  ) { }

  

  data$: any;
   ngOnInit() {
    this.data$ = this.apiService.getGraphInfo$();
    console.log(this.data$)
  }

}
