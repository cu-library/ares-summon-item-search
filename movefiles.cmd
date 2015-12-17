@ECHO OFF
SETLOCAL

REM This files moves ares_summon_item_search.js and ares_summon_item_search.css to the Ares Webroot. 

REM Change to the same directory as the current script
@setlocal enableextensions
@cd /d "%~dp0"

SET installdir=C:\inetpub\wwwroot\ares
SET jsinstalldir=%installdir%\js
SET cssinstalldir=%installdir%\css

ECHO To use this script, right click and select "Run as administrator" option.
ECHO You will still need to include ares_summon_item_search.js in item forms. See the README.

ECHO Copying jquery-1.11.3.min.js...
COPY /V /-Y jquery-1.11.3.min.js %jsinstalldir%

ECHO Copying ares_summon_item_search.js...
COPY /V /-Y ares_summon_item_search.js %jsinstalldir%

ECHO Copying ares_summon_item_search.css...
COPY /V /-Y ares_summon_item_search.css %cssinstalldir%

ECHO Done!
PAUSE




