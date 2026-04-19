# Learn Ruby on Rails

Source for the book _Learn Ruby on Rails_ by Stefan Wintermeyer.

The current chapter content was originally written for Rails 5.2 / Ruby 2.5
and is being brought forward to current Rails releases. The build toolchain
is evergreen (Asciidoctor 2).

## Requirements

- Ruby (any modern version; `mise` recommended for management)
- Bundler

## Install

```sh
bundle install
```

## Build

```sh
bundle exec rake html   # HTML output in output/
bundle exec rake pdf    # PDF output in output/
bundle exec rake build  # both
bundle exec rake clean  # remove output/
```

Master file: `learn-ruby-on-rails.adoc`.

## License

See individual files for attribution.
