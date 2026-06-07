#!/usr/bin/env python3
import os

file_path = 'pr-award_new.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<!-- ===== PRESS SLIDER ===== -->'
end_marker = '<!-- ===== AWARDS HIGHLIGHT ===== -->'

new_section = '''<!-- ===== BRANDS & FEATURED NEWS LOGOS ===== -->
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

'''

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx >= 0 and end_idx > start_idx:
    new_content = content[:start_idx] + new_section + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('✓ Carousel section replaced successfully!')
    print(f'  Old section length: {end_idx - start_idx} chars')
    print(f'  New section length: {len(new_section)} chars')
else:
    print('✗ Markers not found!')
    print(f'  start_idx={start_idx}, end_idx={end_idx}')
