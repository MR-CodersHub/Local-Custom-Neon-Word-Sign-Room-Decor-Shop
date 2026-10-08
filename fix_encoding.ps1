Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace 'â€"', '—'
    $content = $content -replace 'ðŸ''¡', '💡'
    $content = $content -replace 'ðŸ', ''
    Set-Content $_.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Fixed: $($_.Name)"
}
Write-Host "Done."
