import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanUrl } from '../src/lib/url-cleaner.js';

test('removes common tracking parameters',()=>{const out=cleanUrl('https://example.com/path?utm_source=x&fbclid=abc&keep=yes');const u=new URL(out);assert.equal(u.searchParams.has('utm_source'),false);assert.equal(u.searchParams.has('fbclid'),false);assert.equal(u.searchParams.get('keep'),'yes')});
test('preserves non-tracking query data',()=>{assert.equal(cleanUrl('https://example.com/?q=sentinel'),'https://example.com/?q=sentinel')});
