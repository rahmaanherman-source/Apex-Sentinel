import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesHost, shouldBlock } from '../src/lib/matcher.js';

test('matches exact and subdomain hosts',()=>{assert.equal(matchesHost('doubleclick.net','doubleclick.net'),true);assert.equal(matchesHost('ads.doubleclick.net','doubleclick.net'),true);assert.equal(matchesHost('example.com','doubleclick.net'),false)});
test('shouldBlock handles malformed URLs safely',()=>{assert.equal(shouldBlock('https://ads.example.com/x',['example.com']),true);assert.equal(shouldBlock('not-a-url',['example.com']),false)});
