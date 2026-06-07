#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Read the file
with open('pr-award_new.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the old section (PRESS SLIDER)
old_section = '''<!-- ===== PRESS SLIDER ===== -->
<section class="pr-slider-section">
  <div class="container">
    <div class="reveal section-header--light">
      <div class="section-label">News Coverage</div>
      <h2 class="section-title">Featured in <em>Media</em></h2>
    </div>
    <div class="carousel-wrap">
      <div class="carousel-viewport" id="carouselVP">
        <div class="carousel-track" id="carouselTrack">

          <div class="pr-slide">
            <div class="pr-slide-img">
              <img src="assets/img/pr/danikjagran12022023.png" alt="Dainik Jagran" draggable="false">
              <div class="pr-slide-overlay"></div>
              <div class="pr-slide-source">Dainik Jagran</div>
            </div>
            <div class="pr-slide-body">
              <h4><a href="https://www.s4cinesphere.in/images/e/Mahiya4.png" target="_blank">Waiting for the Music Album "Mahiya"</a></h4>
              <p>Covered on 19.01.2023</p>
              <a href="https://www.s4cinesphere.in/images/e/Mahiya4.png" target="_blank" class="pr-link">Read Coverage <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="pr-slide">
            <div class="pr-slide-img">
              <img src="assets/img/pr/turbookpr231223.png" alt="Newswires" draggable="false">
              <div class="pr-slide-overlay"></div>
              <div class="pr-slide-source">Newswires</div>
            </div>
            <div class="pr-slide-body">
              <h4><a href="https://www.einnews.com/pr_news/676953671/new-voice-in-fiction-subhankar-explores-love-acceptance-and-uncharted-paths" target="_blank">New Book Release</a></h4>
              <p>Covered 2023–2024</p>
              <a href="https://www.einnews.com/pr_news/676953671/new-voice-in-fiction-subhankar-explores-love-acceptance-and-uncharted-paths" target="_blank" class="pr-link">Read Coverage <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="pr-slide">
            <div class="pr-slide-img">
              <img src="assets/img/pr/sambad05012023.png" alt="The Sambad" draggable="false">
              <div class="pr-slide-overlay"></div>
              <div class="pr-slide-source">The Sambad</div>
            </div>
            <div class="pr-slide-body">
              <h4><a href="https://sambadepaper.com/imageview_26636_109047_4_79_05-01-2023_5_i_1_sf.html" target="_blank">New Project Started</a></h4>
              <p>Covered on 05.01.2023</p>
              <a href="https://sambadepaper.com/imageview_26636_109047_4_79_05-01-2023_5_i_1_sf.html" target="_blank" class="pr-link">Read Coverage <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="pr-slide">
            <div class="pr-slide-img">
              <img src="assets/img/pr/presswire05052024.png" alt="IssueWire" draggable="false">
              <div class="pr-slide-overlay"></div>
              <div class="pr-slide-source">IssueWire</div>
            </div>
            <div class="pr-slide-body">
              <h4><a href="https://www.issuewire.com/breaking-news-the-uncharted-romance-tops-amazon-kindle-charts-1798210413853729" target="_blank">Bestseller Tag Achieved</a></h4>
              <p>Covered May 2024</p>
              <a href="https://www.issuewire.com/breaking-news-the-uncharted-romance-tops-amazon-kindle-charts-1798210413853729" target="_blank" class="pr-link">Read Coverage <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="pr-slide">
            <div class="pr-slide-img">
              <img src="assets/img/pr/american.tur.png" alt="American Times" draggable="false">
              <div class="pr-slide-overlay"></div>
              <div class="pr-slide-source">The American Times</div>
            </div>
            <div class="pr-slide-body">
              <h4><a href="https://www.americantimesreporter.com/article/676953671-new-voice-in-fiction-subhankar-explores-love-acceptance-and-uncharted-paths" target="_blank">Release of "The Uncharted Romance"</a></h4>
              <p>Covered by The American Times</p>
              <a href="https://www.americantimesreporter.com/article/676953671-new-voice-in-fiction-subhankar-explores-love-acceptance-and-uncharted-paths" target="_blank" class="pr-link">Read Coverage <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

        </div><!-- end track -->
      </div><!-- end viewport -->

      <!-- Controls -->
      <div class="carousel-controls">
        <div class="carousel-dots" id="carouselDots"></div>
      </div>

    </div><!-- end carousel-wrap -->
  </div>
</section>'''

# Define the new section
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
</section>'''

# Replace
if old_section in content:
    new_content = content.replace(old_section, new_section)
    with open('pr-award_new.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Replacement successful')
else:
    print('Old section not found in file')
