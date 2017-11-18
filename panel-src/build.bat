@echo off

node node_modules/webpack/bin/webpack.js --display-error-details %*

if errorlevel 1 (
  echo.
  echo.
  echo -------------------------------------------------
  echo ! Build FAILED with errors.                     !
  echo -------------------------------------------------
)

exit /b %errorlevel%
