$ErrorActionPreference = 'Stop'

$mysqlCommand = Get-Command mysql -ErrorAction SilentlyContinue
if (-not $mysqlCommand) {
  throw 'MySQL command-line client (mysql) was not found. Add its bin folder to PATH or run database/setup.sql from MySQL Workbench.'
}

$adminUser = Read-Host 'MySQL administrator username'
if ([string]::IsNullOrWhiteSpace($adminUser)) {
  throw 'A MySQL administrator username is required to create the database and app account.'
}

$sqlPath = Join-Path $PSScriptRoot '..\database\setup.sql'
Get-Content -LiteralPath $sqlPath -Raw | & $mysqlCommand.Source --host=127.0.0.1 "--user=$adminUser" --password
if ($LASTEXITCODE -ne 0) {
  throw 'MySQL setup failed. Confirm the administrator credentials and try again.'
}

Write-Host 'MySQL database and sayso app account are ready.'
Write-Host 'The app uses DB_USER=sayso and DB_PASSWORD=change-me from .env.'
