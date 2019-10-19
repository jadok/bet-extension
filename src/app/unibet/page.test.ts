/**
 * @jest-environment jsdom
 */

import { JSDOM } from 'jsdom';
const fs = require('fs');
import { UnibetExport } from './page'

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
  const html = fs.readFileSync('./fixtures/sample-unibet.html').toString();
  // set the global window and document objects using JSDOM
  // global is a node.js global object
  document.body.innerHTML = html;
  const u = new UnibetExport(window, document);
  it('Check page', () => {
    expect(u.check()).toBeTruthy();
  })

  it('Get Header data', () => {
    const head = u.bettingHeader(u.data[0]);
    expect(head).toEqual({
      date: '2019-09-13T14:41:00.000Z', // check Timezone
      type: 'Combiné',
      id: '2015/1918'
    });
  })

  it('Get Footer Data', () => {
    const footer = u.bettingFooter(u.data[0]);
    expect(footer).toEqual({
      stake: 2.5,
      earn: 3.11,
      status: 'pending',
    });
  })


  it('Get data Data', () => {
    const footer = u.bettingBets(u.data[0]);
    expect(true).toBeTruthy();
  })

  it('check full', () => {
    const footer = u.exec();
    console.log(footer[0]);
    expect(true).toBeTruthy();
  })
});
