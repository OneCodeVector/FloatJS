function FixFloat(Float, Precision) {
    Math.round(Float * Math.pow(10, Precision)) / Math.pow(10, Precision);
}

/*

https://stackoverflow.com/questions/812961/getters-setters-for-dummies
https://stackoverflow.com/questions/3096646/how-to-convert-a-floating-point-number-to-its-binary-representation-ieee-754-i
https://stackoverflow.com/questions/2003493/javascript-float-from-to-bits
https://stackoverflow.com/questions/47322407/how-to-convert-a-float-to-binary-using-javascript

function cut(num, base, len) {
    base = Math.pow(2, base);
    return (parseInt((num * base).toString(2), 2) / base).toFixed(len);
} 

function assembleFloat(sign, exponent, mantissa)
{
    return (sign << 31) | (exponent << 23) | (mantissa);
}

function DoubleToIEEE(f)
{
    var buf = new ArrayBuffer(8);
    (new Float64Array(buf))[0] = f;
    return [ (new Uint32Array(buf))[0] ,(new Uint32Array(buf))[1] ];
}

*/

class FixedFloat {
    constructor(Float, Precision) {
        
    }
}

class Float {
    constructor(Number, Representation = "BinaryIEEE") {
        this.__proto__.SetValue = function(This, Number, Representation) {
            this.__proto__.Representation = Representation;
            This.__proto__.Number = (parseInt((Number * 4096).toString(2), 2) / 4096).toFixed(12); // 4096 = 2^12
            This.__proto__.AbsoluteNumber = (parseInt((Math.abs(Number) * 4096).toString(2), 2) / 4096).toFixed(12);
            This.__proto__.Sign = + (This.__proto__.Number < 0);
            This.__proto__.Exponent = Math.floor(Math.log(This.__proto__.AbsoluteNumber) / Math.LN2);
            This.__proto__.Mantissa = This.__proto__.AbsoluteNumber / Math.pow(2, This.__proto__.Exponent);

            This.__proto__.DecimalRepresentation = (This.__proto__.Sign << 31) | (This.__proto__.Exponent << 23) +127 | ((This.__proto__.Mantissa * 8388608) & 0x7FFFFF); // 8388608 = 2^23
            This.__proto__.StringBinaryRepresentation = This.__proto__.DecimalRepresentation.toString(2);
            This.__proto__.BinaryRepresentation = parseInt(This.__proto__.StringBinaryRepresentation)
        }

        this.__proto__.SetValue(this, Number, Representation);
    }

    set Value(Number) {
        this.__proto__.SetValue(this, Number, this.__proto__.Representation);
    }

    get Value() {
        switch (this.__proto__.Represenation) {
            case ("BinaryIEEE") : {
                return this.__proto__.StringBinaryRepresentation;
            }

            case ("BinaryIEEEDoubble") : {
                return this.__proto__.BinaryRepresentation;
            }

            case ("NumericalIEEE") : {
                return this.__proto__.DecimalRepresentation;
            }
        }
    }

    set Representation(Representation) {
        this.__proto__.Representation = Representation;
    }

    get Representation() {
        return this.__proto__.Representation;
    }

    Fix(Precision) {
        return new FixedFloat(this, Precision);
    }
}
