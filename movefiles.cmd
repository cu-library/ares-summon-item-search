@ECHO OFF
SETLOCAL

REM This files moves ares-summon-tem-search.js, ares-summon-item-search.css, and the jQuery Libraries to the Ares Webroot. 

REM Change to the same directory as the current script
@setlocal enableextensions
@cd /d "%~dp0"

SET installdir=C:\inetpub\wwwroot\ares
SET jsinstalldir=%installdir%\js
SET cssinstalldir=%installdir%\css

ECHO To use this script, right click and select "Run as administrator" option.
ECHO You will still need to include ares-summon-item-search.js in item forms. See the README.

ECHO Copying jquery-1.11.3.min.js...
COPY /V /-Y jquery-1.11.3.min.js %jsinstalldir%

ECHO Copying jquery-ui-1.11.4.min.js...
COPY /V /-Y jquery-ui-1.11.4.min.js %jsinstalldir%

ECHO Copying jquery-ui-1.11.4.min.css...
COPY /V /-Y jquery-ui-1.11.4.min.css %cssinstalldir%

ECHO Copying ares-summon-item-search.js...
COPY /V /-Y ares-summon-item-search.js %jsinstalldir%

ECHO Copying ares-ummon-item-search.css...
COPY /V /-Y ares-summon-item-search.css %cssinstalldir%

ECHO Done!
PAUSE




