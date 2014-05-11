var wcwidth = require('../')
var assert = require('assert')

describe('wcwidth', function() {
  it('handles regular strings', function() {
    assert.strictEqual(wcwidth('abc'), 3)
  })

  it('handles multibyte strings', function() {
    assert.strictEqual(wcwidth('字的模块'), 8)
  })

  it('handles multibyte characters mixed with regular characters', function() {
    assert.strictEqual(wcwidth('abc 字的模块'), 12)
  })

  it('ignores control characters e.g. \\n', function() {
    assert.strictEqual(wcwidth('abc\n字的模块\ndef'), 14)
  })

  it('ignores bad input', function() {
    assert.strictEqual(wcwidth(''), 0)
    assert.strictEqual(wcwidth(3), 0)
    assert.strictEqual(wcwidth({}), 0)
    assert.strictEqual(wcwidth([]), 0)
    assert.strictEqual(wcwidth(), 0)
  })

  it('ignores nul (charcode 0)', function() {
    assert.strictEqual(wcwidth(String.fromCharCode(0)), 0)
  })

  it('ignores nul mixed with chars', function() {
    assert.strictEqual(wcwidth('a' + String.fromCharCode(0) + '\n字的'), 5)
  })

  it('can have custom value for nul', function() {
    assert.strictEqual(wcwidth.config({
      nul: 10
    })(String.fromCharCode(0) + 'a字的'), 15)
  })

  it('can have custom control char value', function() {
    assert.strictEqual(wcwidth.config({
      control: 1
    })('abc\n字的模块\ndef'), 16)
  })

  it('negative custom control chars == -1', function() {
    assert.strictEqual(wcwidth.config({
      control: -1
    })('abc\n字的模块\ndef'), -1)
  })
})
