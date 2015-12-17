@ECHO OFF
SETLOCAL

REM This files moves evocator.js and evocator.css to the Ares Webroot. 

REM Change to the same directory as the current script
@setlocal enableextensions
@cd /d "%~dp0"

SET installdir=C:\inetpub\wwwroot\ares
SET jsinstalllocation=%installdir%\js\evocator.js
SET cssinstalllocation=%installdir%\css\evocator.css

ECHO To use this script, right click and select "Run as administrator" option.
ECHO You will still need to include evocator.js in item forms. See the README.

ECHO Installing...
COPY /V /-Y evocator.js %jsinstalllocation%
COPY /V /-Y evocator.css %cssinstalllocation%
ECHO Done!
PAUSE




