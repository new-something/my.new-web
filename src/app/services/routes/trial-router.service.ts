import { Injectable } from '@angular/core';
import {Routes} from '@angular/router';
import {RedirectGuardService} from './redirect-guard.service';

@Injectable({
  providedIn: 'root'
})
export class TrialRouterService {

  private ROUTES: Routes = [
    {
      path: 'task',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://www.taskade.com/new',
        trial: true
      }
    },
    {
      path: 'mindmap',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://www.taskade.com/new/brainstorming?as=mindmap',
        trial: true
      }
    },
    {
      path: 'chart',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://live.amcharts.com/new',
        trial: true
      }
    },
    {
      path: 'note',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://quicknote.io/',
        trial: true
      }
    },
    {
      path: 'videocall',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://gotalk.to/' + TrialRouterService.uuid(),
        trial: true
      }
    },
    {
      path: 'videocall/:chatRoomId',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://gotalk.to/',
        trial: true
      }
    },
    {
      path: 'meeting',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://doodle.com/create',
        trial: true
      }
    },
    {
      path: 'poll',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://fast-poll.com/new',
        trial: true
      }
    },
    {
      path: 'banner',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://canva.new',
        trial: true
      }
    },
    {
      path: 'whiteboard',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://board.new',
        trial: true
      }
    },
    {
      path: 'html',
      canActivate: [RedirectGuardService],
      component: RedirectGuardService,
      data: {
        externalUrl: 'https://codesandbox.io/s/',
        trial: true
      }
    }
  ];

  constructor() { }

  get trialRoutes(): Routes {
    return this.ROUTES;
  }

  private static uuid(): string {
    return Math.random().toString(36).substring(2);
  }
}
