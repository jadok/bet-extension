/**
 * @jest-environment jsdom
 */

import { JSDOM } from 'jsdom';
const fs = require('fs');
import { SofascoreShow } from './page'

declare const window: any;
declare const document: any;

describe('updateMsg', function () {
  // beforeAll(function () {
  //   // __dirname is a Node.js global object
  //   // https://nodejs.org/api/globals.html

  //   const html = fs.readFileSync('./fixtures/sample-unibet.html').toString();
  //   // set the global window and document objects using JSDOM
  //   // global is a node.js global object
  //   document.body.innerHTML = html;
  // })
  const html = fs.readFileSync('./fixtures/sample-sofascore-tennis.html').toString();
  // set the global window and document objects using JSDOM
  // global is a node.js global object
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
    console.log(u.data[0].querySelector('.cell.js-event-list-tournament-header .cell__section--main').innerHTML);
  })

  it('Check data', () => {
    expect(u.check()).toBeTruthy();
  })

});
