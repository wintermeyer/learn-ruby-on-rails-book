// Detect shell / REPL transcripts in source and literal blocks
// at build time and add the `terminal` role to them. The UI
// bundle's CSS targets `.doc .listingblock.terminal` to render
// those blocks with macOS-style terminal chrome (three
// traffic-light dots, subtle depth). Doing this at build time
// means the class lands in the static HTML — no runtime JS
// needed in the browser.
//
// We match the first non-whitespace line of the block against
// common prompts:
//   iex>              — Elixir IEx
//   iex(n)>           — IEx with numbered prompt
//   irb>              — Ruby irb (simple form)
//   irb(main):001:0>  — Ruby irb (default form)
//   >>                — minimalist prompt used in the Ruby /
//                       Rails books for irb transcripts
//   $                 — POSIX shell prompt
//   user@host:        — shell prompt with hostname prefix
//
// The extension is a tree processor: it walks every listing
// (source) block and every literal block, checks the raw
// source, and calls `addRole('terminal')` when the prefix
// matches. Roles on blocks are emitted by Asciidoctor as CSS
// classes on the wrapping <div>.

'use strict'

const TERMINAL_PREFIX = /^\s*(iex(\([^)]*\))?>|irb(\([^)]*\))?>|>>|\$\s|[A-Za-z0-9_.-]+@[A-Za-z0-9_.-]+[:#$]\s)/

module.exports.register = function register (registry) {
  registry.treeProcessor(function () {
    const self = this
    self.process(function (doc) {
      ;['listing', 'literal'].forEach(function (context) {
        doc.findBy({ context: context }).forEach(function (block) {
          const lines = block.getLines ? block.getLines() : (block.lines || [])
          const source = Array.isArray(lines) ? lines.join('\n') : String(lines || '')
          if (source && TERMINAL_PREFIX.test(source)) {
            block.addRole('terminal')
          }
        })
      })
    })
  })
}
