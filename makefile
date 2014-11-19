all:
	jslint src/horo-nope.js && \
	jshint src/horo-nope.js && \
	eslint src/horo-nope.js && \
	cat src/meta.js src/jquery.js src/horo-nope.js > horo-nope.user.js && \
	cat src/meta.js > horo-nope.meta.js

install:
	open -a Firefox horo-nope.user.js
