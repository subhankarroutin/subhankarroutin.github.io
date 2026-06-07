$file = 'pr-award_new.html'
$content = Get-Content $file -Encoding UTF8 -Raw

$startMarker = '<!-- ===== PRESS SLIDER ===== -->'
$endMarker = '<!-- ===== AWARDS HIGHLIGHT ===== -->'

$startIdx = $content.IndexOf($startMarker)
$endIdx = $content.IndexOf($endMarker)

# New brands slider HTML
$newSection = "<!-- ===== BRANDS & FEATURED NEWS LOGOS ===== -->
<section class=""brands-slider-section"">
  <div class=""container"">
    <div class=""reveal section-header--light"">
      <div class=""section-label"">Featured In</div>
      <h2 class=""section-title"">Press & <em>Media</em> Partners</h2>
    </div>
    
    <div class=""brands-wrapper"">
      <div class=""brands-track"" id=""brandsTrack"">
        <div class=""brand-card"">
          <img src=""assets/img/pr/danikjagran12022023.png"" alt=""Dainik Jagran"">
          <span class=""brand-card-label"">Dainik Jagran</span>
        </div>
        <div class=""brand-card"">
          <img src=""assets/img/pr/turbookpr231223.png"" alt=""Newswires"">
          <span class=""brand-card-label"">Newswires</span>
        </div>
        <div class=""brand-card"">
          <img src=""assets/img/pr/sambad05012023.png"" alt=""The Sambad"">
          <span class=""brand-card-label"">The Sambad</span>
        </div>
        <div class=""brand-card"">
          <img src=""assets/img/pr/presswire05052024.png"" alt=""IssueWire"">
          <span class=""brand-card-label"">IssueWire</span>
        </div>
        <div class=""brand-card"">
          <img src=""assets/img/pr/american.tur.png"" alt=""American Times"">
          <span class=""brand-card-label"">The American Times</span>
        </div>
      </div>
    </div>
  </div>
</section>

"

if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
    # Replace the section
    $newContent = $content.Substring(0, $startIdx) + $newSection + $content.Substring($endIdx)
    
    # Write back to file
    Set-Content -Path $file -Value $newContent -Encoding UTF8
    
    Write-Host "✓ Carousel section replaced successfully!"
    Write-Host "  Old section length: $($endIdx - $startIdx) chars"
    Write-Host "  New section length: $($newSection.Length) chars"
} else {
    Write-Host "✗ Markers not found!"
    Write-Host "  startIdx=$startIdx, endIdx=$endIdx"
}
