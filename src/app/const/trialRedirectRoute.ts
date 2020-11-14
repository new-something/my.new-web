import {Routes} from '@angular/router';
import {RedirectLoadingComponent} from '../components/redirect-loading/redirect-loading.component';
import {TrialRedirectGuardService} from '../services/routes/trial-redirect-guard.service';

export class TrialRedirectRoute {

  private static instance: TrialRedirectRoute;

  private ROUTES: Routes = [
    {
      path: 'task',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://www.taskade.com/new',
        trial: true
      }
    },
    {
      path: 'mindmap',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://www.taskade.com/new/brainstorming?as=mindmap',
        trial: true
      }
    },
    {
      path: 'chart',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://live.amcharts.com/new',
        trial: true
      }
    },
    {
      path: 'note',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://quicknote.io/',
        trial: true
      }
    },
    {
      path: 'videocall',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://gotalk.to/' + TrialRedirectRoute.uuid(),
        trial: true
      }
    },
    {
      path: 'videocall/:chatRoomId',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://gotalk.to/',
        trial: true
      }
    },
    {
      path: 'meeting',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://doodle.com/create',
        trial: true
      }
    },
    {
      path: 'poll',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://fast-poll.com/new',
        trial: true
      }
    },
    {
      path: 'banner',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://canva.new',
        trial: true
      }
    },
    {
      path: 'whiteboard',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://board.new',
        trial: true
      }
    },
    {
      path: 'html',
      canActivate: [TrialRedirectGuardService],
      component: RedirectLoadingComponent,
      data: {
        externalUrl: 'https://codesandbox.io/s/',
        trial: true
      }
    }
  ];

  private constructor() { }

  public static get getInstance(): TrialRedirectRoute {
    if (!TrialRedirectRoute.instance) {
      TrialRedirectRoute.instance = new TrialRedirectRoute();
    }
    return this.instance;
  }

  get trialRoutes(): Routes {
    return this.ROUTES;
  }

  private static uuid(): string {
    return Math.random().toString(36).substring(2);
  }
}
