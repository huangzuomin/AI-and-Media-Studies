@echo off
REM Set working directory to the specified project directory
cd /d "D:\website\hugoplate"
if errorlevel 1 (
    echo Error: Failed to switch to directory D:\website\hugoplate!
    echo Please check if the directory exists.
    pause
    exit /b 1
)

REM Set character encoding to UTF-8
chcp 65001 > nul

REM Set color and title
color 0A
title GitHub Sync Tool

echo ============================================
echo          GitHub Sync Tool
echo ============================================
echo.

REM Display current directory for debugging
echo Current working directory: %CD%
echo.

REM Check Git version for debugging
echo Checking Git installation...
git --version
if errorlevel 1 (
    echo Error: Git is not installed or not found in PATH!
    echo Please ensure Git is installed and added to environment variables.
    pause
    exit /b 1
)
echo Git installation check passed!
echo.

REM Check if in a Git repository with detailed output
echo Checking if current directory is a Git repository...
git rev-parse --is-inside-work-tree
if errorlevel 1 (
    echo Error: Current directory is not a Git repository!
    echo Please make sure the directory D:\website\hugoplate is a valid Git repository.
    pause
    exit /b 1
)
echo Directory is a Git repository!
echo.

REM Get current branch name
echo Fetching current branch name...
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set branch=%%i
if errorlevel 1 (
    echo Error: Failed to get branch name!
    pause
    exit /b 1
)
echo Current branch: %branch%
echo.

REM Add all modified files to staging area
echo Adding modified files...
git add .
if errorlevel 1 (
    echo Error: Failed to add files!
    pause
    exit /b 1
)
echo Added successfully!
echo.

REM Commit changes to local repository
echo Please enter commit message (default: Update):
set /p commit_msg=Commit message:
if "%commit_msg%"=="" set commit_msg=Update

echo Committing changes...
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo Error: Commit failed! There might be no changes to commit.
    pause
    exit /b 1
)
echo Committed successfully!
echo.

REM Pull latest code to avoid conflicts
echo Pulling latest code...
git pull origin %branch%
if errorlevel 1 (
    echo Error: Pull failed! Please check network or resolve conflicts.
    pause
    exit /b 1
)
echo Pulled successfully!
echo.

REM Push code to GitHub
echo Pushing code to GitHub...
git push origin %branch%
if errorlevel 1 (
    echo Error: Push failed! Please check network or permissions.
    pause
    exit /b 1
)
echo Pushed successfully!
echo.

echo ============================================
echo          Sync complete! Code uploaded to GitHub
echo ============================================
pause
