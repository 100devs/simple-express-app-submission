# Guilty Gear -Strive- Frame Data API
A simple API to serve Guilty Gear -Strive- frame data.

The data contains startup, active, and recovery frames, frame advantage and R.I.S.C. level change on block or hit, attack level, counter hit type, as well as any invulnerability frames or additional damage proration for each attack in the game.

Data can be obtained by making a GET request to `/api/:characterName` with the names formatted as follows :
* anji_mito
* axl_low
* baiken
* chipp_zanuff
* faust
* giovanna
* goldlewis_dickinson
* happy_chaos
* i-no
* jack-o
* ky_kiske
* leo_whitefang
* may
* millia_rage
* nagoriyuki
* potemkin
* ramlethal_valentine
* sol_badguy
* testament
* zato-1

**Link to project:** http://ggst-framedata.herokuapp.com/api

![alt tag](https://www.guiltygear.com/ggst/en/wordpress/wp-content/themes/ggst/img/logo.webp)

## How It's Made:

**Tech used:** HTML, JavaScript, Node.js, Express.js

I wanted to make some kind of app using the game's frame data, but, the only API I could find was months out of date. So, I pulled the data from https://dustloop.com and made one myself. 

## Optimizations
This API is future-proofed by a script that can update the data for every character as well as pull data for new characters in the event of a game patch!

Just use `npm run frameupdate`.

## Lessons Learned:
Inputting all of the data for this API manually would have taken much more time than learning how to scrape it... so, I learned how to scrape.

## Examples:
An app I made using the frame data api to determine which moves your character can punish with on block in any matchup:
http://ggst-framedata.herokuapp.com/

Let me know if you make something with this API so I can link it here, too!
