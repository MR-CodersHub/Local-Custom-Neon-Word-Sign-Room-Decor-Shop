# Fix all HTML pages:
# 1. Add new Google Fonts import (Inter + Plus Jakarta Sans)
# 2. Remove old inline styles on dropdown-menu and dropdown-item
# 3. Remove any inline style on navbar
# 4. Fix old variable names in inline styles

$htmlFiles = Get-ChildItem -Path "." -Filter "*.html"

$oldFonts = "https://fonts.googleapis.com/css2?family=Outfit"
$newFonts = '<link rel="preconnect" href="https://fonts.googleapis.com" />' + "`n" +
            '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' + "`n" +
            '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet" />'

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw

    # 1. Remove old Outfit/Space Grotesk font import if present
    $content = $content -replace '<link[^>]+fonts\.googleapis[^>]+Outfit[^>]+>', ''

    # 2. Add new fonts after <meta name="viewport"...> line if not already present
    if ($content -notmatch 'Plus\+Jakarta\+Sans') {
        $content = $content -replace '(<meta name="viewport"[^/]*/?>)', "`$1`n  $newFonts"
    }

    # 3. Remove inline styles on dropdown-menu (old var names)
    $content = $content -replace 'class="dropdown-menu"\s+style="[^"]*"', 'class="dropdown-menu"'
    $content = $content -replace "class=""dropdown-menu""\s+style='[^']*'", 'class="dropdown-menu"'

    # 4. Remove inline styles on dropdown-item (old var names)
    $content = $content -replace 'class="dropdown-item"\s+style="[^"]*"', 'class="dropdown-item"'
    $content = $content -replace "class=""dropdown-item""\s+style='[^']*'", 'class="dropdown-item"'

    # 5. Fix old CSS variables used in any remaining inline styles
    $content = $content -replace 'var\(--bg-card\)',          'var(--bg-2)'
    $content = $content -replace 'var\(--border-glass\)',     'var(--glass-border)'
    $content = $content -replace 'var\(--text-primary\)',     'var(--t1)'
    $content = $content -replace 'var\(--text-secondary\)',   'var(--t2)'
    $content = $content -replace 'var\(--text-muted\)',       'var(--t3)'
    $content = $content -replace 'var\(--neon-pink\)',        'var(--pink)'
    $content = $content -replace 'var\(--neon-blue\)',        'var(--blue)'
    $content = $content -replace 'var\(--neon-green\)',       'var(--green)'
    $content = $content -replace 'var\(--neon-purple\)',      'var(--purple)'
    $content = $content -replace 'var\(--gradient-pink\)',    'var(--g-pink)'
    $content = $content -replace 'var\(--gradient-blue\)',    'var(--g-blue)'
    $content = $content -replace 'var\(--gradient-neon\)',    'var(--g-neon)'
    $content = $content -replace 'var\(--bg-primary\)',       'var(--bg-0)'
    $content = $content -replace 'var\(--bg-secondary\)',     'var(--bg-1)'
    $content = $content -replace 'var\(--bg-glass\)',         'var(--glass-bg)'
    $content = $content -replace 'var\(--border-radius\)',    'var(--rad)'
    $content = $content -replace 'var\(--border-radius-sm\)', 'var(--rad-sm)'
    $content = $content -replace 'var\(--transition\)',       'all 0.3s ease'
    $content = $content -replace 'var\(--section-padding\)',  '96px 0'

    # 6. Fix old font-family references in inline styles
    $content = $content -replace "'Outfit',\s*sans-serif", "'Inter', sans-serif"
    $content = $content -replace "'Space Grotesk',\s*sans-serif", "'Plus Jakarta Sans', sans-serif"

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nAll HTML files updated successfully."
