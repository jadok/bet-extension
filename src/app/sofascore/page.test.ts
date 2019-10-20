/**
 * @jest-environment jsdom
 */

const fs = require('fs');
import { SofascoreShow } from './page'
import { TennisTournamentManager } from './tournament-event/TennisTournamentmanager';

declare const window: any;
declare const document: any;

describe('sofascore - tennis', function () {
  const html = fs.readFileSync('./fixtures/sample-sofascore-tennis.html').toString();
  document.body.innerHTML = html;

  const bets = [
    {
      id: '2015/1918',
      date: '2019-09-13T14:41:00.000Z',
      type: 'Combiné',
      bets:
      [
        { status: 'pending',
          odd: 1.01,
          peoples: 'Niklas-Salminen P.-Thiem D.',
          sport: 'tennis',
          date: '2019-09-13T00:00:00.000Z'
        },
        {
          status: 'pending',
          odd: 1.23,
          peoples: 'Klizan, M - Ehrat, S',
          sport: 'tennis',
          date: '2019-09-13T00:00:00.000Z'
        },
        {
          status: 'pending',
          odd: 1.3,
          peoples: 'Fognini F. - Khachanov K.',
          sport: 'tennis',
          date: '2019-09-14T00:00:00.000Z'
        }
      ],
      sumOdds: 1.2423,
      nbr_bets: 2,
      stake: 2.5,
      earn: 3.11,
      status: 'pending'
    }
  ];
  const u = new SofascoreShow(window, document);

  it('Check page', () => {
    expect(u.check()).toBeTruthy();
  })

  it('Check header', () => {
    const elem = u.data[0];
    const header = u.getTournamentHeader(elem);
    expect(header.category).toEqual('ATP');
    expect(header.name).toEqual('Shanghai, China');
  })

  it('Check execManager', () => {
    const elem = u.data[0];
    const header = u.getTournamentHeader(elem);
    const manager = new TennisTournamentManager();
    const gamesWatched = [];
    const didAdd = u.execManager(manager, header, u.data[0], bets, gamesWatched)
    expect(didAdd).toBeTruthy();
  })

  it('check exec', () => {
    u.bets = bets;
    const res = u.exec();
    expect(res.length).toEqual(1);
  })
});

