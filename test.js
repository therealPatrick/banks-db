const test = require('ava');
const banksDB = require('.');
const type = require('./type');

test('finds bank by first 6 symbols', (t) => {
  t.deepEqual(banksDB('5211784563802833').name, 'alfabank');
});

test('returns card type', (t) => {
  t.deepEqual(banksDB('5211784563802833').type, 'mastercard');
});

test('finds bank by first 5 symbols', (t) => {
  t.deepEqual(banksDB('4622384563802833').name, 'vtb24');
});

test('returns false on unknown bank', (t) => {
  t.deepEqual(typeof banksDB('4111111111111111').name, 'undefined');
});

test('returns card type on unknown bank', (t) => {
  t.deepEqual(banksDB('4111111111111111').type, 'visa');
});

test('finds bank by converted to string card number', (t) => {
  t.deepEqual(banksDB(4377734563802833).name, 'tinkoff');
});

test('ignores non-digits symbols in card number', (t) => {
  t.deepEqual(banksDB('43-77-73-45-63-80-28-33').name, 'tinkoff');
});

test('ignores whitespaces', (t) => {
  t.deepEqual(banksDB('4627 3045 6380 2833').name, 'raiffeisen');
});

test('accepts undefined', (t) => {
  t.deepEqual(typeof banksDB(undefined).name, 'undefined');
});

test('returns card type', (t) => {
  t.deepEqual(type(4111111111111111), 'visa');
});

test('returns undefined on unknown card type', (t) => {
  t.deepEqual(typeof type(123456), 'undefined');
});

test('returns all banks data', (t) => {
  t.truthy(Array.isArray(banksDB.data));
});

test('returns country + bankname', (t) => {
  t.deepEqual(banksDB('5211784563802833').code, 'ru-alfabank');
});

test('returns code from banksDB.data', (t) => {
  t.deepEqual(typeof banksDB.data[0].code, 'string');
});
