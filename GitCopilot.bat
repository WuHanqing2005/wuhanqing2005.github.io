@echo off
setlocal enabledelayedexpansion
title FILE_AUDIT_SYSTEM_v5.0
color 0b

:Header
cls
echo ==========================================================================
echo       [ SYSTEM AUDIT CORE v5.0 ] - HIGH-SPEED SCANNING INTERFACE
echo       TIMESTAMP: %date% %time%
echo ==========================================================================
echo.

:: Initialize counters and arrays
set /a c100=0, c50=0, c20=0, c1=0, total=0

echo [*] SCANNING LOCAL DIRECTORY...
echo --------------------------------------------------------------------------

:: Core scanning logic
for %%F in (*) do (
    if /i not "%%~nxF"=="%~nx0" (
        set "size=%%~zF"
        set /a sizeMB=!size! / 1048576
        
        if !sizeMB! GEQ 100 (
            set "file100[!c100!]=!sizeMB! MB -- %%~nxF"
            set /a c100+=1
            set /a total+=1
        )
        if !sizeMB! GEQ 50 if !sizeMB! LSS 100 (
            set "file50[!c50!]=!sizeMB! MB -- %%~nxF"
            set /a c50+=1
            set /a total+=1
        )
        if !sizeMB! GEQ 20 if !sizeMB! LSS 50 (
            set "file20[!c20!]=!sizeMB! MB -- %%~nxF"
            set /a c20+=1
            set /a total+=1
        )
        if !sizeMB! GEQ 1 if !sizeMB! LSS 20 (
            set "file1[!c1!]=!sizeMB! MB -- %%~nxF"
            set /a c1+=1
            set /a total+=1
        )
    )
)

echo.
echo ==========================================================================
echo [ OVER 100MB - CRITICAL ] - Total: !c100! files
echo ==========================================================================
if !c100! GTR 0 (
    color 0c
    for /l %%i in (0,1,99) do (
        if defined file100[%%i] (
            echo  [CRITICAL] !file100[%%i]!
        )
    )
) else (
    echo  [ NO FILES ]
)

echo.
color 0b
echo ==========================================================================
echo [ 50-100MB - WARNING ] - Total: !c50! files
echo ==========================================================================
if !c50! GTR 0 (
    color 0e
    for /l %%i in (0,1,99) do (
        if defined file50[%%i] (
            echo  [WARNING]  !file50[%%i]!
        )
    )
) else (
    echo  [ NO FILES ]
)

echo.
color 0b
echo ==========================================================================
echo [ 20-50MB - NOTICE ] - Total: !c20! files
echo ==========================================================================
if !c20! GTR 0 (
    color 0b
    for /l %%i in (0,1,99) do (
        if defined file20[%%i] (
            echo  [NOTICE]   !file20[%%i]!
        )
    )
) else (
    echo  [ NO FILES ]
)

echo.
color 0b
echo ==========================================================================
echo [ 1-20MB - STABLE ] - Total: !c1! files
echo ==========================================================================
if !c1! GTR 0 (
    color 0a
    for /l %%i in (0,1,99) do (
        if defined file1[%%i] (
            echo  [STABLE]   !file1[%%i]!
        )
    )
) else (
    echo  [ NO FILES ]
)

echo.
color 0b
echo ==========================================================================
echo [ AUDIT STATISTICS ]
echo --------------------------------------------------------------------------
echo  TOTAL FILES DETECTED : !total!
echo  CRITICAL OVER 100MB  : !c100!
echo  WARNING  50-100MB    : !c50!
echo  NOTICE   20-50MB     : !c20!
echo  STABLE   1-20MB      : !c1!
echo.
echo [ SYSTEM ADVICE ]
echo --------------------------------------------------------------------------

if !c100! GTR 0 (
    echo  ALERT: !c100! HUGE FILES FOUND.
    echo  DANGER: GitHub REJECTS files larger than 100MB.
    echo  ACTION: REMOVE these files or use Git LFS before pushing!
) else (
    if !c50! GTR 0 (
        echo  WARNING: !c50! LARGE FILES FOUND ^(50-100MB^).
        echo  ADVICE: Consider using Git LFS for better repository health.
    ) else (
        echo  STATUS: PASS.
        echo  ADVICE: All files are within GitHub safe limits.
    )
)

echo.
echo ==========================================================================
echo.

:: Git operations menu (only if no files over 100MB)
if !c100! EQU 0 (
    echo.
    echo ==========================================================================
    echo [ GIT OPERATIONS MENU ]
    echo ==========================================================================
    echo  1. Push to Git Repository
    echo  2. Pull from Git Repository
    echo  3. Exit
    echo ==========================================================================
    echo.
    set /p choice="Enter your choice (1-3): "
    
    if "!choice!"=="1" goto GitPush
    if "!choice!"=="2" goto GitPull
    if "!choice!"=="3" goto End
    
    echo  [ERROR] Invalid choice. Exiting...
    goto End
)

pause
goto :eof

:GitPush
echo.
echo ==========================================================================
echo [ STARTING GIT PUSH OPERATION ]
echo ==========================================================================
echo.

echo [*] Adding all files...
git add --all
if errorlevel 1 (
    echo [ERROR] Failed to add files.
    goto End
)

echo [*] Creating commit...
for /f "tokens=*" %%A in ('whoami') do set username=%%A
set commitMsg=%username% %date% %time% - Automated push
git commit -m "!commitMsg!"
if errorlevel 1 (
    echo [WARNING] No changes to commit or commit failed.
)

echo [*] Pushing to remote repository...
git push
if errorlevel 1 (
    echo [ERROR] Failed to push to remote repository.
    goto End
)

echo.
echo [SUCCESS] Git push completed successfully!
goto End

:GitPull
echo.
echo ==========================================================================
echo [ STARTING GIT PULL OPERATION ]
echo ==========================================================================
echo.

echo [*] Pulling from remote repository...
git pull
if errorlevel 1 (
    echo [ERROR] Failed to pull from remote repository.
    goto End
)

echo.
echo [SUCCESS] Git pull completed successfully!
goto End

:End
echo.
echo ==========================================================================
echo.
pause
