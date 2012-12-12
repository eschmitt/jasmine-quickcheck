var qc = require('quickcheck')
  , prelude = require('preludejs')

arbString = qc.arbString;
arbArray = qc.arbArray;
arbBool = qc.arbBool;
arbDouble = qc.arbDouble;
arbInt = qc.arbInt;
arbByte = qc.arbByte;
arbChar = qc.arbChar;

arbDigit = prelude.random.p(9)

arbPhone = function() {
 var area_code = prelude.nTimes(3, arbDigit)
   , prefix = prelude.nTimes(3, arbDigit)
   , num = prelude.nTimes(4, arbDigit)
   , ext = prelude.nTimes(prelude.random, arbDigit)
   , delims = ['-', '.', ' ']
   , phone = [area_code, prefix, num, ext]
   , phone_array = prelude.map(prelude.join(''), phone)
   ;

  return prelude.join(delims[prelude.random(delims.length)], phone_array)
}

quickCheck = function(number_of_tests) {
  var old_config = qc.config
    , args = arguments
    ;

  if (typeof number_of_tests !== 'function') {
    qc.config.number_of_tests = number_of_tests;
    args = Array.prototype.slice.call(args, 1);
  }

  expect(qc.forAll.apply(this, args)).toBeTruthy();

  qc.config = old_config;
}
