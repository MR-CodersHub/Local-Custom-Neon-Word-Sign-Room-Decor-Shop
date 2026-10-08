$cssPath = "css\style.css"
$lines = Get-Content $cssPath
$keepLines = @()
foreach ($line in $lines) {
    $keepLines += $line
    if ($line -match "END OF STYLESHEET") { break }
}
$keepLines | Out-File -FilePath $cssPath -Encoding UTF8 -NoNewline
Write-Host "Done. Lines kept: $($keepLines.Count)"
