echo off
set pluginPath=..\moodledev3\lib\editor\atto\plugins\recitautolink

rem remove the current link
..\outils\junction -d src

rem set the link
..\outils\junction src %pluginPath%

pause