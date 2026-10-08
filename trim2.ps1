$cssPath = "css\style.css"
$lines = Get-Content $cssPath -Encoding UTF8
$result = @()
foreach ($line in $lines) {
    $result += $line
    if ($line -match "END OF STYLESHEET") { break }
}
[System.IO.File]::WriteAllLines((Resolve-Path $cssPath).Path, $result, [System.Text.Encoding]::UTF8)
Write-Host "Trimmed to $($result.Count) lines."
