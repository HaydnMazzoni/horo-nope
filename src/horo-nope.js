/*jslint indent: 2, vars: true, browser: true */
/*eslint quotes: [2, "single"], no-extend-native:0 */
/*global jQuery, $, document */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
if (!String.prototype.contains) {
  String.prototype.contains = function () {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

this.$ = jQuery.noConflict(true);

var h = document.location.hostname;

var isAbc = h === 'www.abc.net.au' ||
  h === 'www.abccommercial.com' ||
  h === 'www.abcmusic.com.au';

var isFairfax = h === 'www.smh.com.au' ||
  h === 'www.canberratimes.com.au' ||
  h === 'www.theage.com.au' ||
  h === 'www.watoday.com.au' ||
  h === 'www.brisbanetimes.com.au';

var isDailyLife = h.contains('dailylife.com.au');

var isNewsComAu = h === 'www.news.com.au';

var isNewsCorp = isNewsComAu ||
  h === 'www.adelaidenow.com.au' ||
  h === 'www.couriermail.com.au' ||
  h === 'www.dailytelegraph.com.au' ||
  h === 'www.heraldsun.com.au' ||
  h === 'www.perthnow.com.au' ||
  h === 'www.ntnews.com.au' ||
  h === 'www.themercury.com.au' ||
  h === 'www.geelongadvertiser.com.au' ||
  h === 'www.goldcoastbulletin.com.au' ||
  h === 'www.townsvillebulletin.com.au' ||
  h === 'www.cairnspost.com.au' ||
  h === 'www.weeklytimesnow.com.au';

var isNineMsn = h.contains('ninemsn.com.au');

var isYahoo = h.contains('yahoo.com');

function nope() {
  'use strict';
  if (isAbc) {
    $('a[href*="/religion/"]').parent('li').remove();
  } else if (isNewsCorp) {
    $('a[href*="/lifestyle/horoscopes"]').parent('li').remove();
  } else if (isFairfax) {
    $('a[href*="/horoscopes"], a[href="/lifestyle/horoscope"]').parent('li').remove();
    $('[data-ga-action="Horoscopes Click"], .cS-horoscopes').remove();
  } else if (isDailyLife) {
    $('a[href*="/life-and-love/horoscopes"]').parent('li').remove();
  } else if (isNineMsn) {
    $('a[href*="astrosurf.ninemsn.com.au"]').parent('dd, li').remove();
    $('#horomain').closest('div:not(#horomain)').remove();
  } else if (isYahoo) {
    $('a[href="//au.lifestyle.yahoo.com/horoscopes/"]').remove();
    $('a[href*="/horoscopes/"]').parent('li').remove();
    $('.horoscope').remove();
  }
}

nope();

function runOnInsert(condition, selector) {
  'use strict';
  if (condition) {
    $(selector).bind('DOMNodeInserted', function () {
      nope();
    });
  }
}

runOnInsert(isNewsCorp && !isNewsComAu, '#content');
runOnInsert(isNewsComAu, '#content-fixedmenu');
