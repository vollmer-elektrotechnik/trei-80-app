@echo off
chcp 65001 > nul
title GitHub Auto-Push - TREI 80 App

echo ===================================================
echo   TREI 80 Trainer - GitHub Commit ^& Push Skript
echo ===================================================
echo.

:: 1. Git-Identität sicherstellen (Setzt deine Daten einmalig fest)
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 git config --global user.name "Julian Vollmer"

git config --global user.email >nul 2>&1
if %errorlevel% neq 0 git config --global user.email "julian@vollmer-elektrotechnik.de"

:: 2. Repository initialisieren, falls noch nicht geschehen
if not exist ".git" (
    echo [*] Initialisiere neues Git-Repository...
    git init
    git branch -M main
    git remote add origin https://github.com/vollmer-elektrotechnik/trei-80-app.git
    echo.
)

:: 3. Status anzeigen
echo [1/4] Prüfe geänderte Dateien...
git status -s
echo.

:: 4. Commit-Nachricht abfragen
set /p msg="Commit-Nachricht eingeben (z.B. Update): "

if "%msg%"=="" (
    echo [!] Keine Nachricht eingegeben. Abbruch.
    goto END
)

:: 5. Dateien hinzufügen, committen und pushen
echo.
echo [2/4] Füge Dateien hinzu...
git add .

echo [3/4] Erstelle Commit...
git commit -m "%msg%"

echo [4/4] Lade zu GitHub hoch...
git push -u origin main

echo.
echo ===================================================
echo   Vorgang abgeschlossen!
echo ===================================================

:END
echo.
echo Taste druecken zum Beenden...
pause > nul