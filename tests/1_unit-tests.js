const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('convertHandler should correctly read a whole number input.', function() {
    assert.equal(convertHandler.getNum("123456mi"), 123456);
  });

  test('convertHandler should correctly read a decimal number input.', function() {
    assert.equal(convertHandler.getNum("123.456kg"), 123.456);
  });

  test('convertHandler should correctly read a fractional input.', function() {
    assert.equal(convertHandler.getNum("1/2lbs"), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.equal(convertHandler.getNum("3.0/1.5gal"), 2);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.throws ( () => convertHandler.getNum("3/2/3mi") );
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum("mi"),1);
  })

  test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal(convertHandler.getUnit("123gal"), "gal");
    assert.equal(convertHandler.getUnit("123l"), "l");
    assert.equal(convertHandler.getUnit("123mi"), "mi");
    assert.equal(convertHandler.getUnit("123km"), "km");
    assert.equal(convertHandler.getUnit("123lbs"), "lbs");
    assert.equal(convertHandler.getUnit("123kg"), "kg");
  });

  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.throws ( () => convertHandler.getUnit("123mi%") );
  });

  test('convertHandler should return the correct return unit for each valid input unit.', function() {
    assert.equal(convertHandler.getReturnUnit("gal"),"l");
    assert.equal(convertHandler.getReturnUnit("l"),"gal");
    assert.equal(convertHandler.getReturnUnit("mi"),"km");
    assert.equal(convertHandler.getReturnUnit("km"),"mi");
    assert.equal(convertHandler.getReturnUnit("lbs"),"kg");
    assert.equal(convertHandler.getReturnUnit("kg"),"lbs");
  })

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convertHandler.spellOutUnit("gal"),"gal");
    assert.equal(convertHandler.spellOutUnit("l"),"L");
    assert.equal(convertHandler.spellOutUnit("mi"),"mi");
    assert.equal(convertHandler.spellOutUnit("km"),"km");
    assert.equal(convertHandler.spellOutUnit("lbs"),"lbs");
    assert.equal(convertHandler.spellOutUnit("kg"),"kg");
  });

  test('convertHandler should correctly convert gal to L.', function() {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);    
    assert.equal(convertHandler.convert(10, 'gal'), 37.85410);    
  });

  test('convertHandler should correctly convert L to gal.', function() {
    assert.equal(convertHandler.convert(1, 'l'), 0.26417 );
    assert.equal(convertHandler.convert(10, 'l'), 2.64172 );
  });

  test('convertHandler should correctly convert mi to km.', function() {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    assert.equal(convertHandler.convert(10, 'mi'), 16.09340);
  });

  test('convertHandler should correctly convert km to mi.', function() {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    assert.equal(convertHandler.convert(10, 'km'), 6.21373);
  });

  test('convertHandler should correctly convert lbs to kg.', function() {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    assert.equal(convertHandler.convert(10, 'lbs'), 4.53592);
  });

  test('convertHandler should correctly convert kg to lbs.', function() {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    assert.equal(convertHandler.convert(10, 'kg'), 22.04624);
  });
  
});