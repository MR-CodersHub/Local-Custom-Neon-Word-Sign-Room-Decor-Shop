$files = Get-ChildItem -Path "." -Filter "*.html"

foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $t = [System.Text.Encoding]::UTF8.GetString($bytes)

    # --- 1. Remove BOM artifacts ---
    $t = $t.TrimStart([char]0xFEFF)

    # --- 2. Fix inline padding-top on hero carousel containers ---
    # Remove padding-top:140px from container inside hero carousel
    $t = $t -replace 'style="position:relative;z-index:2;padding-top:140px;padding-bottom:80px;min-height:100vh;display:flex;align-items:center;"',
                      'class="hero-container-inner" style="position:relative;z-index:2;padding-top:60px;padding-bottom:60px;min-height:calc(100vh - 72px);display:flex;align-items:center;"'

    # Generic pattern: any container style with padding-top:140px in hero
    $t = $t -replace 'padding-top:140px;', 'padding-top:60px;'
    $t = $t -replace 'padding-top: 140px;', 'padding-top: 60px;'

    # --- 3. Remove duplicate style on section hero that double-pads with body offset ---
    $t = $t -replace 'class="hero p-0" style="padding:0;"', 'class="hero-section" style="padding:0;margin:0;"'
    $t = $t -replace "class='hero p-0' style='padding:0;'", "class='hero-section' style='padding:0;margin:0;'"

    # --- 4. Fix page-hero — since body has padding-top:72px, page-hero should start at 0 extra ---
    # page-hero CSS already has padding: 140px 0 72px, so no override needed

    # --- 5. Remove leftover inline color styles on dropdown items ---
    $t = $t -replace ' style="color:var\(--t1\);"', ''
    $t = $t -replace " style='color:var\(--t1\);'", ''
    $t = $t -replace ' style="color:var\(--text-primary\);"', ''

    # --- 6. Remove leftover inline background/border on breadcrumb ---
    $t = $t -replace ' style="background:none;padding:0;"', ''
    $t = $t -replace " style='background:none;padding:0;'", ''

    # --- 7. Fix body — add section-wide padding correction ---
    # Remove any body padding-top inline style added by older edits
    $t = $t -replace '<body style="padding-top:[^"]*">', '<body>'
    $t = $t -replace "<body style='padding-top:[^']*'>", '<body>'

    # --- 8. Remove p-0 overrides on hero section that conflict ---
    $t = $t -replace 'class="hero p-0"', 'class="hero-section"'

    [System.IO.File]::WriteAllText($f.FullName, $t, [System.Text.Encoding]::UTF8)
    Write-Host "Patched: $($f.Name)"
}

Write-Host "`nAll HTML files patched."
