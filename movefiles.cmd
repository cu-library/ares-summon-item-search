@ECHO OFF
SETLOCAL

REM This files moves evocation.js and evocation.css to the Ares Webroot. 

REM Change to the same directory as the current script
@setlocal enableextensions
@cd /d "%~dp0"

SET installdir=C:\inetpub\wwwroot\ares
SET jsinstalllocation=%installdir%\js\evocation.js
SET cssinstalllocation=%installdir%\css\evocation.css 

ECHO To use this script, right click and select "Run as administrator" option.
ECHO You will still need to include evocator.js in item forms. See the README.

ECHO Installing...
COPY /V /-Y evocation.js %jsinstalllocation%
COPY /V /-Y evocation.css %cssinstalllocation%
ECHO Done!
PAUSE




