TestemTrouble
=============

* `npm install -g testem``
* `git clone https://github.com/dbashford/TestemTrouble`
* `testem -f testem/testem.json`

Eventually things bomb with EMFILE issues, or are super slow.  Pulling in requirejs dependencies can take minutes.

Everything works fine with `testem ci -f testem/testem.json`.