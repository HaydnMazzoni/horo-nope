all:
	jshint horo-nope.user.js && \
	eslint horo-nope.user.js

install:
	open -a Firefox horo-nope.user.js
