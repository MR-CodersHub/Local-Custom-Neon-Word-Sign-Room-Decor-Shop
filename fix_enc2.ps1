$files = Get-ChildItem -Path "." -Filter "*.html"
foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $text  = [System.Text.Encoding]::UTF8.GetString($bytes)
    # Replace mojibake em-dash: â€" = U+2014
    $emdash = [string]([char]0xE2) + [string]([char]0x80) + [string]([char]0x94)
    $text  = $text.Replace($emdash, [string][char]0x2014)
    [System.IO.File]::WriteAllText($f.FullName, $text, [System.Text.Encoding]::UTF8)
    Write-Host "OK: $($f.Name)"
}
Write-Host "Done"
