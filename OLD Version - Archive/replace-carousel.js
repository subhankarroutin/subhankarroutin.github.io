const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'pr-award_new.html');

// Read the file
let content = fs.readFileSync(filePath, 'utf-8');

const startMarker = '<!-- ===== PRESS SLIDER ===== -->';
const endMarker = '<!-- ===== AWARDS HIGHLIGHT ===== -->';

const newSection = `<!-- ===== BRANDS & FEATURED NEWS LOGOS ===== -->
<section class="brands-slider-section">
  <div class="container">
    <div class="reveal section-header--light">
      <div class="section-label">Featured In</div>
      <h2 class="section-title">Press & <em>Media</em> Partners</h2>
    </div>
    
    <div class="brands-wrapper">
      <div class="brands-track" id="brandsTrack">
        <div class="brand-card">
          <img src="assets/img/pr/danikjagran12022023.png" alt="Dainik Jagran">
          <span class="brand-card-label">Dainik Jagran</span>
        </div>
        <div class="brand-card">
          <img src="assets/img/pr/turbookpr231223.png" alt="Newswires">
          <span class="brand-card-label">Newswires</span>
        </div>
        <div class="brand-card">
          <img src="assets/img/pr/sambad05012023.png" alt="The Sambad">
          <span class="brand-card-label">The Sambad</span>
        </div>
        <div class="brand-card">
          <img src="assets/img/pr/presswire05052024.png" alt="IssueWire">
          <span class="brand-card-label">IssueWire</span>
        </div>
        <div class="brand-card">
          <img src="assets/img/pr/american.tur.png" alt="American Times">
          <span class="brand-card-label">The American Times</span>
        </div>
      </div>
    </div>
  </div>
</section>

`;

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx >= 0 && endIdx > startIdx) {
  const newContent = content.substring(0, startIdx) + newSection + content.substring(endIdx);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log('✓ Carousel section replaced successfully!');
  console.log(`  Old section length: ${endIdx - startIdx} chars`);
  console.log(`  New section length: ${newSection.length} chars`);
} else {
  console.log('✗ Markers not found!');
  console.log(`  startIdx=${startIdx}, endIdx=${endIdx}`);
}
