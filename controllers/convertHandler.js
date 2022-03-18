function ConvertHandler() {

  let unitMap = {
    gal: 'l',
    l: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  };

  let spellOut = {
    gal: 'gal',
    l: 'L',
    mi: 'mi',
    km: 'km',
    lbs: 'lbs',
    kg: 'kg'
  };
  
  let unitRatio = {
    gal: 3.78541,
    l:   0.264172,
    mi:  1.60934,
    km:  0.621373,
    lbs: 0.453592,
    kg:  2.204624
  };

  let unitFullName = {
    gal: 'gallons',
    l: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms'    
  }
  
  let numberRegEx = /^((\.\d+|\d+(\.\d+|))(\/(\.\d+|\d+(\.\d+|))|)|)[^\/\.\d]*$/;
  let unitRegEx = /^[.\/\d]*(gal|l|mi|km|lbs|kg)$/;
  
  this.getNum = function(input) {

    let match = input.match ( numberRegEx );
    
    if ( !match ) {
      throw new Error('invalid number');      
    }
    
    if ( match[1] === '' )
      match[1] = '1';
    
    let result = eval(match[1]);
   
    return result;
    
  };
  
  this.getUnit = function(input) {

    let match = input.toLowerCase().match ( unitRegEx );

    if ( !match ) {
      throw new Error('invalid unit');      
    }
    
    let result = match[1];
    
    return result;
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = unitMap[initUnit];    
    return result;
  };

  this.spellOutUnit = function(unit) {
    return spellOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    let result = initNum * unitRatio[initUnit];
    reult = Math.round ( ( result + Number.EPSILON ) * 1000000 ) / 1000000;
    return result.toFixed(5);

  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitFullName[initUnit]} converts to ${returnNum} ${unitFullName[returnUnit]}`;
  };
  
}

module.exports = ConvertHandler;
