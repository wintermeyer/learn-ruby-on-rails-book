SOURCE  = "learn-ruby-on-rails.adoc"
OUT_DIR = "output"
ASSETS  = "assets"

directory OUT_DIR

desc "Build multi-page HTML (one page per chapter) with the wincon skin"
task :html => OUT_DIR do
  # Use asciidoctor-multipage for one HTML file per top-level chapter.
  # -a linkcss               link to an external stylesheet, don't inline
  # -a stylesheet=book.css,
  # -a stylesdir=assets      asciidoctor finds + copies assets/book.css
  # -a !webfonts             suppress Google Fonts (we ship system fonts)
  # -a !icons                drop the FontAwesome CDN link
  # -a rouge-css=style       inline syntax token styles instead of an
  #                          external rouge-<theme>.css file
  # -a nofooter              suppress the "last updated" boilerplate
  sh %(bundle exec asciidoctor \
    -r asciidoctor-multipage \
    -b multipage_html5 \
    -a linkcss \
    -a copycss! \
    -a stylesheet=book.css \
    -a stylesdir=. \
    -a webfonts! \
    -a !icons \
    -a rouge-css=style \
    -a nofooter \
    -D #{OUT_DIR} #{SOURCE})

  # copycss! disables asciidoctor's own copy step (which errors out
  # because the source lives in assets/, not the repo root). We copy
  # the stylesheet ourselves.
  cp "#{ASSETS}/book.css", "#{OUT_DIR}/book.css"

  # Copy the images directory so <img src="images/..."> resolves.
  mkdir_p "#{OUT_DIR}/images"
  cp_r Dir.glob("images/*"), "#{OUT_DIR}/images/"

  # Wrap every chapter page with the wincon nav and footer.
  require_relative "scripts/wrap_pages"
  WrapPages.run(
    html_dir: OUT_DIR,
    nav_path: "#{ASSETS}/nav.html",
    footer_path: "#{ASSETS}/footer.html",
  )
end

desc "Build PDF (single-document, as before)"
task :pdf => OUT_DIR do
  sh "bundle exec asciidoctor-pdf -D #{OUT_DIR} #{SOURCE}"
end

desc "Build HTML and PDF"
task :build => [:html, :pdf]

desc "Remove build artifacts"
task :clean do
  rm_rf OUT_DIR
end

task :default => :build
