@ECHO OFF
SETLOCAL

REM This files moves ares_summon_item_search.js and ares_summon_item_search.css to the Ares Webroot. 

REM Change to the same directory as the current script
@setlocal enableextensions
@cd /d "%~dp0"

SET installdir=C:\inetpub\wwwroot\ares
SET jsinstalllocation=%installdir%\js\ares_summon_item_search.js
SET cssinstalllocation=%installdir%\css\ares_summon_item_search.css 

ECHO To use this script, right click and select "Run as administrator" option.
ECHO You will still need to include ares_summon_item_search.js in item forms. See the README.

ECHO Installing...
COPY /V /-Y ares_summon_item_search.js %jsinstalllocation%
COPY /V /-Y ares_summon_item_search.css %cssinstalllocation%
ECHO Done!
PAUSE




