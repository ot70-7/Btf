import {
  $,
  Reader,
  Writer,
  chooseWallet,
  connectWallet,
  detectProviders,
  discriminatorHex,
  el,
  getConfig,
  getConnection,
  getTiers,
  reviewTransaction,
  setStatus,
  signAndSend,
  toast,
  walletHint,
  withBusy
} from "./chunk-7AWCEZ2K.js";
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  __commonJS,
  __toESM,
  require_Layout,
  require_buffer
} from "./chunk-6BHCQRA3.js";

// node_modules/bigint-buffer/dist/browser.js
var require_browser = __commonJS({
  "node_modules/bigint-buffer/dist/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var converter;
    function toBigIntLE2(buf) {
      {
        const reversed = Buffer.from(buf);
        reversed.reverse();
        const hex = reversed.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, false);
    }
    exports.toBigIntLE = toBigIntLE2;
    function toBigIntBE2(buf) {
      {
        const hex = buf.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, true);
    }
    exports.toBigIntBE = toBigIntBE2;
    function toBufferLE2(num, width) {
      {
        const hex = num.toString(16);
        const buffer = Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
        buffer.reverse();
        return buffer;
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), false);
    }
    exports.toBufferLE = toBufferLE2;
    function toBufferBE2(num, width) {
      {
        const hex = num.toString(16);
        return Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), true);
    }
    exports.toBufferBE = toBufferBE2;
  }
});

// node_modules/@solana/spl-token/lib/esm/constants.js
var TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
var TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
var ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
var NATIVE_MINT = new PublicKey("So11111111111111111111111111111111111111112");
var NATIVE_MINT_2022 = new PublicKey("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");

// node_modules/@solana/buffer-layout-utils/lib/esm/base.mjs
var encodeDecode = (layout) => {
  const decode = layout.decode.bind(layout);
  const encode = layout.encode.bind(layout);
  return { decode, encode };
};

// node_modules/@solana/buffer-layout-utils/lib/esm/bigint.mjs
var import_buffer = __toESM(require_buffer(), 1);
var import_buffer_layout = __toESM(require_Layout(), 1);
var import_bigint_buffer = __toESM(require_browser(), 1);
function assertValidBigInteger(untrustedInput) {
  if (typeof untrustedInput !== "bigint") {
    throw new Error("Expected a `BigInt`");
  }
}
function bigInt_IMPL(littleEndian, length) {
  return (property) => {
    const layout = (0, import_buffer_layout.blob)(length, property);
    const { encode, decode } = encodeDecode(layout);
    const bigIntLayout = layout;
    bigIntLayout.decode = (buffer, offset) => {
      const src = decode(buffer, offset);
      return littleEndian ? (0, import_bigint_buffer.toBigIntLE)(import_buffer.Buffer.from(src)) : (0, import_bigint_buffer.toBigIntBE)(import_buffer.Buffer.from(src));
    };
    bigIntLayout.encode = (bigInt2, buffer, offset) => {
      assertValidBigInteger(bigInt2);
      let src;
      if (length === 0) {
        src = import_buffer.Buffer.alloc(0);
      } else {
        src = littleEndian ? (0, import_bigint_buffer.toBufferLE)(bigInt2, length) : (0, import_bigint_buffer.toBufferBE)(bigInt2, length);
      }
      return encode(src, buffer, offset);
    };
    return bigIntLayout;
  };
}
var bigInt = /* @__PURE__ */ bigInt_IMPL.bind(
  null,
  /* littleEndian */
  true
);
var u64 = /* @__PURE__ */ bigInt(8);

// node_modules/bignumber.js/bignumber.mjs
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
var mathceil = Math.ceil;
var mathfloor = Math.floor;
var bignumberError = "[BigNumber Error] ";
var tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ";
var BASE = 1e14;
var LOG_BASE = 14;
var MAX_SAFE_INTEGER = 9007199254740991;
var POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13];
var SQRT_BASE = 1e7;
var MAX = 1e9;
function clone(configObject) {
  var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: "\xA0",
    // non-breaking space
    suffix: ""
  }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
  function BigNumber2(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
    if (!(x instanceof BigNumber2)) return new BigNumber2(v, b);
    if (b == null) {
      if (v && v._isBigNumber === true) {
        x.s = v.s;
        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }
        return;
      }
      if ((isNum = typeof v == "number") && v * 0 == 0) {
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++) ;
          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }
          return;
        }
        str = String(v);
      } else {
        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      if ((i = str.search(/e/i)) > 0) {
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {
        e = str.length;
      }
    } else {
      intCheck(b, 2, ALPHABET.length, "Base");
      if (b == 10 && alphabetHasNormalDecimalDigits) {
        x = new BigNumber2(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }
      str = String(v);
      if (isNum = typeof v == "number") {
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
        if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
          throw Error(tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }
      alphabet = ALPHABET.slice(0, b);
      e = i = 0;
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == ".") {
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {
            if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }
          return parseNumeric(x, String(v), isNum, b);
        }
      }
      isNum = false;
      str = convertBase(str, b, 10, x.s);
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      else e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++) ;
    for (len = str.length; str.charCodeAt(--len) === 48; ) ;
    if (str = str.slice(i, ++len)) {
      len -= i;
      if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
        throw Error(tooManyDigits + x.s * v);
      }
      if ((e = e - i - 1) > MAX_EXP) {
        x.c = x.e = null;
      } else if (e < MIN_EXP) {
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;
        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));
          for (len -= LOG_BASE; i < len; ) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }
          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }
        for (; i--; str += "0") ;
        x.c.push(+str);
      }
    } else {
      x.c = [x.e = 0];
    }
  }
  BigNumber2.clone = clone;
  BigNumber2.ROUND_UP = 0;
  BigNumber2.ROUND_DOWN = 1;
  BigNumber2.ROUND_CEIL = 2;
  BigNumber2.ROUND_FLOOR = 3;
  BigNumber2.ROUND_HALF_UP = 4;
  BigNumber2.ROUND_HALF_DOWN = 5;
  BigNumber2.ROUND_HALF_EVEN = 6;
  BigNumber2.ROUND_HALF_CEIL = 7;
  BigNumber2.ROUND_HALF_FLOOR = 8;
  BigNumber2.EUCLID = 9;
  BigNumber2.config = BigNumber2.set = function(obj) {
    var p, v;
    if (obj != null) {
      if (typeof obj == "object") {
        if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }
        if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }
        if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }
        if (obj.hasOwnProperty(p = "RANGE")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error(bignumberError + p + " cannot be zero: " + v);
            }
          }
        }
        if (obj.hasOwnProperty(p = "CRYPTO")) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error(bignumberError + "crypto unavailable");
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error(bignumberError + p + " not true or false: " + v);
          }
        }
        if (obj.hasOwnProperty(p = "MODULO_MODE")) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }
        if (obj.hasOwnProperty(p = "POW_PRECISION")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }
        if (obj.hasOwnProperty(p = "FORMAT")) {
          v = obj[p];
          if (typeof v == "object") FORMAT = v;
          else throw Error(bignumberError + p + " not an object: " + v);
        }
        if (obj.hasOwnProperty(p = "ALPHABET")) {
          v = obj[p];
          if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
            alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
            ALPHABET = v;
          } else {
            throw Error(bignumberError + p + " invalid: " + v);
          }
        }
      } else {
        throw Error(bignumberError + "Object expected: " + obj);
      }
    }
    return {
      DECIMAL_PLACES,
      ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO,
      MODULO_MODE,
      POW_PRECISION,
      FORMAT,
      ALPHABET
    };
  };
  BigNumber2.isBigNumber = function(v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber2.DEBUG) return true;
    var i, n, c = v.c, e = v.e, s = v.s;
    out: if ({}.toString.call(c) == "[object Array]") {
      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;
        if (String(c[0]).length == i) {
          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }
          if (n !== 0) return true;
        }
      }
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }
    throw Error(bignumberError + "Invalid BigNumber: " + v);
  };
  BigNumber2.maximum = BigNumber2.max = function() {
    return maxOrMin(arguments, -1);
  };
  BigNumber2.minimum = BigNumber2.min = function() {
    return maxOrMin(arguments, 1);
  };
  BigNumber2.random = function() {
    var pow2_53 = 9007199254740992;
    var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
      return mathfloor(Math.random() * pow2_53);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(dp) {
      var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);
      k = mathceil(dp / LOG_BASE);
      if (CRYPTO) {
        if (crypto.getRandomValues) {
          a = crypto.getRandomValues(new Uint32Array(k *= 2));
          for (; i < k; ) {
            v = a[i] * 131072 + (a[i + 1] >>> 11);
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;
        } else if (crypto.randomBytes) {
          a = crypto.randomBytes(k *= 7);
          for (; i < k; ) {
            v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error(bignumberError + "crypto unavailable");
        }
      }
      if (!CRYPTO) {
        for (; i < k; ) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }
      k = c[--i];
      dp %= LOG_BASE;
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }
      for (; c[i] === 0; c.pop(), i--) ;
      if (i < 0) {
        c = [e = 0];
      } else {
        for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }
      rand.e = e;
      rand.c = c;
      return rand;
    };
  }();
  BigNumber2.sum = function() {
    var i = 1, args = arguments, sum = new BigNumber2(args[0]);
    for (; i < args.length; ) sum = sum.plus(args[i++]);
    return sum;
  };
  convertBase = /* @__PURE__ */ function() {
    var decimal = "0123456789";
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j, arr = [0], arrL, i = 0, len = str.length;
      for (; i < len; ) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
        arr[0] += alphabet.indexOf(str.charAt(i++));
        for (j = 0; j < arr.length; j++) {
          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }
      return arr.reverse();
    }
    return function(str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
      if (i >= 0) {
        k = POW_PRECISION;
        POW_PRECISION = 0;
        str = str.replace(".", "");
        y = new BigNumber2(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;
        y.c = toBaseOut(
          toFixedPoint(coeffToString(x.c), x.e, "0"),
          10,
          baseOut,
          decimal
        );
        y.e = y.c.length;
      }
      xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
      e = k = xc.length;
      for (; xc[--k] == 0; xc.pop()) ;
      if (!xc[0]) return alphabet.charAt(0);
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }
      d = e + dp + 1;
      i = xc[d];
      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;
      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
      if (d < 1 || !xc[0]) {
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {
        xc.length = d;
        if (r) {
          for (--baseOut; ++xc[--d] > baseOut; ) {
            xc[d] = 0;
            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }
        for (k = xc.length; !xc[--k]; ) ;
        for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++])) ;
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }
      return str;
    };
  }();
  div = /* @__PURE__ */ function() {
    function multiply(x, k, base2) {
      var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
      for (x = x.slice(); i--; ) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
        carry = (temp / base2 | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base2;
      }
      if (carry) x = [carry].concat(x);
      return x;
    }
    function compare2(a, b, aL, bL) {
      var i, cmp;
      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {
        for (i = cmp = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return cmp;
    }
    function subtract(a, b, aL, base2) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base2 + a[aL] - b[aL];
      }
      for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
    }
    return function(x, y, dp, rm, base2) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
      if (!xc || !xc[0] || !yc || !yc[0]) {
        return new BigNumber2(
          // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
          )
        );
      }
      q = new BigNumber2(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;
      if (!base2) {
        base2 = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }
      for (i = 0; yc[i] == (xc[i] || 0); i++) ;
      if (yc[i] > (xc[i] || 0)) e--;
      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;
        n = mathfloor(base2 / (yc[0] + 1));
        if (n > 1) {
          yc = multiply(yc, n, base2);
          xc = multiply(xc, n, base2);
          yL = yc.length;
          xL = xc.length;
        }
        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; rem[remL++] = 0) ;
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base2 / 2) yc0++;
        do {
          n = 0;
          cmp = compare2(yc, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base2 + (rem[1] || 0);
            n = mathfloor(rem0 / yc0);
            if (n > 1) {
              if (n >= base2) n = base2 - 1;
              prod = multiply(yc, n, base2);
              prodL = prod.length;
              remL = rem.length;
              while (compare2(prod, rem, prodL, remL) == 1) {
                n--;
                subtract(prod, yL < prodL ? yz : yc, prodL, base2);
                prodL = prod.length;
                cmp = 1;
              }
            } else {
              if (n == 0) {
                cmp = n = 1;
              }
              prod = yc.slice();
              prodL = prod.length;
            }
            if (prodL < remL) prod = [0].concat(prod);
            subtract(rem, prod, remL, base2);
            remL = rem.length;
            if (cmp == -1) {
              while (compare2(yc, rem, yL, remL) < 1) {
                n++;
                subtract(rem, yL < remL ? yz : yc, remL, base2);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          }
          qc[i++] = n;
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);
        more = rem[0] != null;
        if (!qc[0]) qc.splice(0, 1);
      }
      if (base2 == BASE) {
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
      } else {
        q.e = e;
        q.r = +more;
      }
      return q;
    };
  }();
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    if (!n.c) return n.toString();
    c0 = n.c[0];
    ne = n.e;
    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
    } else {
      n = round(new BigNumber2(n), i, rm);
      e = n.e;
      str = coeffToString(n.c);
      len = str.length;
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
        for (; len < i; str += "0", len++) ;
        str = toExponential(str, e);
      } else {
        i -= ne + (id === 2 && e > ne);
        str = toFixedPoint(str, e, "0");
        if (e + 1 > len) {
          if (--i > 0) for (str += "."; i--; str += "0") ;
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += ".";
            for (; i--; str += "0") ;
          }
        }
      }
    }
    return n.s < 0 && c0 ? "-" + str : str;
  }
  function maxOrMin(args, n) {
    var k, y, i = 1, x = new BigNumber2(args[0]);
    for (; i < args.length; i++) {
      y = new BigNumber2(args[i]);
      if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
        x = y;
      }
    }
    return x;
  }
  function normalise(n, c, e) {
    var i = 1, j = c.length;
    for (; !c[--j]; c.pop()) ;
    for (j = c[0]; j >= 10; j /= 10, i++) ;
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
      n.c = n.e = null;
    } else if (e < MIN_EXP) {
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }
    return n;
  }
  parseNumeric = /* @__PURE__ */ function() {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(x, str, isNum, b) {
      var base2, s = isNum ? str : str.replace(whitespaceOrPlus, "");
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {
          s = s.replace(basePrefix, function(m, p1, p2) {
            base2 = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
            return !b || b == base2 ? p1 : m;
          });
          if (b) {
            base2 = b;
            s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
          }
          if (str != s) return new BigNumber2(s, base2);
        }
        if (BigNumber2.DEBUG) {
          throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
        }
        x.s = null;
      }
      x.c = x.e = null;
    };
  }();
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
    if (xc) {
      out: {
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
        i = sd - d;
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];
          rd = mathfloor(n / pows10[d - j - 1] % 10);
        } else {
          ni = mathceil((i + 1) / LOG_BASE);
          if (ni >= xc.length) {
            if (r) {
              for (; xc.length <= ni; xc.push(0)) ;
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];
            for (d = 1; k >= 10; k /= 10, d++) ;
            i %= LOG_BASE;
            j = i - LOG_BASE + d;
            rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
          }
        }
        r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
        r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        if (sd < 1 || !xc[0]) {
          xc.length = 0;
          if (r) {
            sd -= x.e + 1;
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {
            xc[0] = x.e = 0;
          }
          return x;
        }
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }
        if (r) {
          for (; ; ) {
            if (ni == 0) {
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++) ;
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }
              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }
        for (i = xc.length; xc[--i] === 0; xc.pop()) ;
      }
      if (x.e > MAX_EXP) {
        x.c = x.e = null;
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }
    return x;
  }
  function valueOf(n) {
    var str, e = n.e;
    if (e === null) return n.toString();
    str = coeffToString(n.c);
    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
    return n.s < 0 ? "-" + str : str;
  }
  P.absoluteValue = P.abs = function() {
    var x = new BigNumber2(this);
    if (x.s < 0) x.s = 1;
    return x;
  };
  P.comparedTo = function(y, b) {
    return compare(this, new BigNumber2(y, b));
  };
  P.decimalPlaces = P.dp = function(dp, rm) {
    var c, n, v, x = this;
    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber2(x), dp + x.e + 1, rm);
    }
    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
    if (n < 0) n = 0;
    return n;
  };
  P.dividedBy = P.div = function(y, b) {
    return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };
  P.dividedToIntegerBy = P.idiv = function(y, b) {
    return div(this, new BigNumber2(y, b), 0, 1);
  };
  P.exponentiatedBy = P.pow = function(n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
    n = new BigNumber2(n);
    if (n.c && !n.isInteger()) {
      throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
    }
    if (m != null) m = new BigNumber2(m);
    nIsBig = n.e > 14;
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
      y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }
    nIsNeg = n.s < 0;
    if (m) {
      if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
      isModExp = !nIsNeg && x.isInteger() && m.isInteger();
      if (isModExp) x = x.mod(m);
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
      k = x.s < 0 && isOdd(n) ? -0 : 0;
      if (x.e > -1) k = 1 / k;
      return new BigNumber2(nIsNeg ? 1 / k : k);
    } else if (POW_PRECISION) {
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }
    if (nIsBig) {
      half = new BigNumber2(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }
    y = new BigNumber2(ONE);
    for (; ; ) {
      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;
        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);
        }
      }
      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);
        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }
      x = x.times(x);
      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);
      }
    }
    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);
    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };
  P.integerValue = function(rm) {
    var n = new BigNumber2(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };
  P.isEqualTo = P.eq = function(y, b) {
    return compare(this, new BigNumber2(y, b)) === 0;
  };
  P.isFinite = function() {
    return !!this.c;
  };
  P.isGreaterThan = P.gt = function(y, b) {
    return compare(this, new BigNumber2(y, b)) > 0;
  };
  P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
    return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
  };
  P.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };
  P.isLessThan = P.lt = function(y, b) {
    return compare(this, new BigNumber2(y, b)) < 0;
  };
  P.isLessThanOrEqualTo = P.lte = function(y, b) {
    return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
  };
  P.isNaN = function() {
    return !this.s;
  };
  P.isNegative = function() {
    return this.s < 0;
  };
  P.isPositive = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return !!this.c && this.c[0] == 0;
  };
  P.minus = function(y, b) {
    var i, j, t, xLTy, x = this, a = x.s;
    y = new BigNumber2(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber2(NaN);
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
      if (!xc[0] || !yc[0]) {
        return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0
        ));
      }
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }
      t.reverse();
      for (b = a; b--; t.push(0)) ;
      t.reverse();
    } else {
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }
    if (xLTy) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }
    b = (j = yc.length) - (i = xc.length);
    if (b > 0) for (; b--; xc[i++] = 0) ;
    b = BASE - 1;
    for (; j > a; ) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b) ;
        --xc[i];
        xc[j] += BASE;
      }
      xc[j] -= yc[j];
    }
    for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
    if (!xc[0]) {
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }
    return normalise(y, xc, ye);
  };
  P.modulo = P.mod = function(y, b) {
    var q, s, x = this;
    y = new BigNumber2(y, b);
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber2(NaN);
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber2(x);
    }
    if (MODULO_MODE == 9) {
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }
    y = x.minus(q.times(y));
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
    return y;
  };
  P.multipliedBy = P.times = function(y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base2, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
    if (!xc || !yc || !xc[0] || !yc[0]) {
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;
        if (!xc || !yc) {
          y.c = y.e = null;
        } else {
          y.c = [0];
          y.e = 0;
        }
      }
      return y;
    }
    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;
    if (xcL < ycL) {
      zc = xc;
      xc = yc;
      yc = zc;
      i = xcL;
      xcL = ycL;
      ycL = i;
    }
    for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
    base2 = BASE;
    sqrtBase = SQRT_BASE;
    for (i = ycL; --i >= 0; ) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;
      for (k = xcL, j = i + k; j > i; ) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
        c = (xlo / base2 | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base2;
      }
      zc[j] = c;
    }
    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }
    return normalise(y, zc, e);
  };
  P.negated = function() {
    var x = new BigNumber2(this);
    x.s = -x.s || null;
    return x;
  };
  P.plus = function(y, b) {
    var t, x = this, a = x.s;
    y = new BigNumber2(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber2(NaN);
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return new BigNumber2(a / 0);
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }
      t.reverse();
      for (; a--; t.push(0)) ;
      t.reverse();
    }
    a = xc.length;
    b = yc.length;
    if (a - b < 0) {
      t = yc;
      yc = xc;
      xc = t;
      b = a;
    }
    for (a = 0; b; ) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }
    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }
    return normalise(y, xc, ye);
  };
  P.precision = P.sd = function(sd, rm) {
    var c, n, v, x = this;
    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber2(x), sd, rm);
    }
    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;
    if (v = c[v]) {
      for (; v % 10 == 0; v /= 10, n--) ;
      for (v = c[0]; v >= 10; v /= 10, n++) ;
    }
    if (sd && x.e + 1 > n) n = x.e + 1;
    return n;
  };
  P.shiftedBy = function(k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times("1e" + k);
  };
  P.squareRoot = P.sqrt = function() {
    var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }
    s = Math.sqrt(+valueOf(x));
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += "0";
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new BigNumber2(n);
    } else {
      r = new BigNumber2(s + "");
    }
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;
      for (; ; ) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));
        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }
            dp += 4;
            s += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }
            break;
          }
        }
      }
    }
    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };
  P.toExponential = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };
  P.toFixed = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };
  P.toFormat = function(dp, rm, format2) {
    var str, x = this;
    if (format2 == null) {
      if (dp != null && rm && typeof rm == "object") {
        format2 = rm;
        rm = null;
      } else if (dp && typeof dp == "object") {
        format2 = dp;
        dp = rm = null;
      } else {
        format2 = FORMAT;
      }
    } else if (typeof format2 != "object") {
      throw Error(bignumberError + "Argument not an object: " + format2);
    }
    str = x.toFixed(dp, rm);
    if (x.c) {
      var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
      if (g2) {
        i = g1;
        g1 = g2;
        g2 = i;
        len -= i;
      }
      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = "-" + intPart;
      }
      str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
        new RegExp("\\d{" + g2 + "}\\B", "g"),
        "$&" + (format2.fractionGroupSeparator || "")
      ) : fractionPart) : intPart;
    }
    return (format2.prefix || "") + str + (format2.suffix || "");
  };
  P.toFraction = function(md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
    if (md != null) {
      n = new BigNumber2(md);
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
      }
    }
    if (!xc) return new BigNumber2(x);
    d = new BigNumber2(ONE);
    n1 = d0 = new BigNumber2(ONE);
    d1 = n0 = new BigNumber2(ONE);
    s = coeffToString(xc);
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber2(s);
    n0.c[0] = 0;
    for (; ; ) {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }
    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
      div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
    ) < 1 ? [n1, d1] : [n0, d0];
    MAX_EXP = exp;
    return r;
  };
  P.toNumber = function() {
    return +valueOf(this);
  };
  P.toPrecision = function(sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };
  P.toString = function(b) {
    var str, n = this, s = n.s, e = n.e;
    if (e === null) {
      if (s) {
        str = "Infinity";
        if (s < 0) str = "-" + str;
      } else {
        str = "NaN";
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
      } else if (b === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, "0");
      } else {
        intCheck(b, 2, ALPHABET.length, "Base");
        str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
      }
      if (s < 0 && n.c[0]) str = "-" + str;
    }
    return str;
  };
  P.valueOf = P.toJSON = function() {
    return valueOf(this);
  };
  P._isBigNumber = true;
  P[Symbol.toStringTag] = "BigNumber";
  P[Symbol.for("nodejs.util.inspect.custom")] = P.valueOf;
  if (configObject != null) BigNumber2.set(configObject);
  return BigNumber2;
}
function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}
function coeffToString(a) {
  var s, z, i = 1, j = a.length, r = a[0] + "";
  for (; i < j; ) {
    s = a[i++] + "";
    z = LOG_BASE - s.length;
    for (; z--; s = "0" + s) ;
    r += s;
  }
  for (j = r.length; r.charCodeAt(--j) === 48; ) ;
  return r.slice(0, j + 1 || 1);
}
function compare(x, y) {
  var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
  if (!i || !j) return null;
  a = xc && !xc[0];
  b = yc && !yc[0];
  if (a || b) return a ? b ? 0 : -j : i;
  if (i != j) return i;
  a = i < 0;
  b = k == l;
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
  if (!b) return k > l ^ a ? 1 : -1;
  j = (k = xc.length) < (l = yc.length) ? k : l;
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
  }
}
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}
function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
}
function toFixedPoint(str, e, z) {
  var len, zs;
  if (e < 0) {
    for (zs = z + "."; ++e; zs += z) ;
    str = zs + str;
  } else {
    len = str.length;
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z) ;
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + "." + str.slice(e);
    }
  }
  return str;
}
var BigNumber = clone();
var bignumber_default = BigNumber;

// node_modules/@solana/buffer-layout-utils/lib/esm/decimal.mjs
var WAD = new bignumber_default("1e+18");

// node_modules/@solana/buffer-layout-utils/lib/esm/native.mjs
var import_buffer_layout2 = __toESM(require_Layout(), 1);
var bool = (property) => {
  const layout = (0, import_buffer_layout2.u8)(property);
  const { encode, decode } = encodeDecode(layout);
  const boolLayout = layout;
  boolLayout.decode = (buffer, offset) => {
    const src = decode(buffer, offset);
    return !!src;
  };
  boolLayout.encode = (bool2, buffer, offset) => {
    const src = Number(bool2);
    return encode(src, buffer, offset);
  };
  return boolLayout;
};

// node_modules/@solana/buffer-layout-utils/lib/esm/web3.mjs
var import_buffer_layout3 = __toESM(require_Layout(), 1);
var publicKey = (property) => {
  const layout = (0, import_buffer_layout3.blob)(32, property);
  const { encode, decode } = encodeDecode(layout);
  const publicKeyLayout = layout;
  publicKeyLayout.decode = (buffer, offset) => {
    const src = decode(buffer, offset);
    return new PublicKey(src);
  };
  publicKeyLayout.encode = (publicKey2, buffer, offset) => {
    const src = publicKey2.toBuffer();
    return encode(src, buffer, offset);
  };
  return publicKeyLayout;
};

// node_modules/@solana/spl-token/lib/esm/errors.js
var TokenError = class extends Error {
  constructor(message) {
    super(message);
  }
};
var TokenOwnerOffCurveError = class extends TokenError {
  constructor() {
    super(...arguments);
    this.name = "TokenOwnerOffCurveError";
  }
};

// node_modules/@solana/spl-token/lib/esm/state/mint.js
var import_buffer_layout4 = __toESM(require_Layout(), 1);
var MintLayout = (0, import_buffer_layout4.struct)([
  (0, import_buffer_layout4.u32)("mintAuthorityOption"),
  publicKey("mintAuthority"),
  u64("supply"),
  (0, import_buffer_layout4.u8)("decimals"),
  bool("isInitialized"),
  (0, import_buffer_layout4.u32)("freezeAuthorityOption"),
  publicKey("freezeAuthority")
]);
var MINT_SIZE = MintLayout.span;
function getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve = false, programId2 = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
  if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer()))
    throw new TokenOwnerOffCurveError();
  const [address] = PublicKey.findProgramAddressSync([owner.toBuffer(), programId2.toBuffer(), mint.toBuffer()], associatedTokenProgramId);
  return address;
}

// src/lib/discriminators.js
var IX = {
  initializePool: "5fb40aac54aee828",
  fundRewards: "7240a370afa71379",
  setApr: "1fc68fd4b218ce6f",
  setPaused: "5b3c7dc0b0e1a6da",
  stake: "ceb0ca12c8d1b36c",
  claim: "3ec6d6c1d59f6cd2",
  unstake: "5a5f6b2acd7c32e1"
};
var ACCOUNT = {
  pool: "f19a6d0411b16dbc",
  position: "aabc8fe47a40f7d0",
  userState: "48b155f94ca7ba7e"
};

// src/lib/program.js
var POOL_SEED = "pool";
var AUTHORITY_SEED = "authority";
var POSITION_SEED = "position";
var USER_SEED = "user";
function programId() {
  return new PublicKey(getConfig().staking.programId);
}
function poolPda() {
  return PublicKey.findProgramAddressSync([Buffer.from(POOL_SEED)], programId())[0];
}
function authorityPda() {
  return PublicKey.findProgramAddressSync([Buffer.from(AUTHORITY_SEED)], programId())[0];
}
function userStatePda(owner) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(USER_SEED), owner.toBuffer()],
    programId()
  )[0];
}
function positionPda(owner, nonce) {
  const bytes = new Uint8Array(8);
  new DataView(bytes.buffer).setBigUint64(0, BigInt(nonce), true);
  return PublicKey.findProgramAddressSync(
    [Buffer.from(POSITION_SEED), owner.toBuffer(), bytes],
    programId()
  )[0];
}
function discriminator(hex) {
  return Uint8Array.from(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
}
function instruction(hex, data, keys) {
  return new TransactionInstruction({
    programId: programId(),
    keys,
    data: Buffer.from(data)
  });
}
function base(hex) {
  return new Writer().raw(discriminator(hex));
}
function ixStake({ owner, userState, position, ownerAta, principalVault, rewardVault, tier, amount, nonce }) {
  const writer = base(IX.stake).u8(tier).u64(amount).u64(nonce).bytes();
  return instruction(IX.stake, writer, [
    { pubkey: owner, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: userState, isSigner: false, isWritable: true },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: ownerAta, isSigner: false, isWritable: true },
    { pubkey: principalVault, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
  ]);
}
function ixClaim({ owner, userState, position, ownerAta, rewardVault, nonce }) {
  const writer = base(IX.claim).u64(nonce).bytes();
  return instruction(IX.claim, writer, [
    { pubkey: owner, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: userState, isSigner: false, isWritable: true },
    { pubkey: ownerAta, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]);
}
function ixUnstake({ owner, userState, position, ownerAta, principalVault, rewardVault, nonce }) {
  const writer = base(IX.unstake).u64(nonce).bytes();
  return instruction(IX.unstake, writer, [
    { pubkey: owner, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: position, isSigner: false, isWritable: true },
    { pubkey: userState, isSigner: false, isWritable: true },
    { pubkey: ownerAta, isSigner: false, isWritable: true },
    { pubkey: principalVault, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]);
}
function expectDiscriminator(reader, hex, name) {
  const actual = discriminatorHex(reader.bytes.slice(reader.offset, reader.offset + 8));
  reader.offset += 8;
  if (actual !== hex) {
    throw new Error(`${name} \u8D26\u6237\u7C7B\u578B\u4E0D\u5339\u914D\uFF08\u671F\u671B ${hex}\uFF0C\u5B9E\u9645 ${actual}\uFF09`);
  }
}
function decodePool(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.pool, "Pool");
  const pool = {
    address,
    mint: reader.pubkey(),
    admin: reader.pubkey(),
    bump: reader.u8(),
    authorityBump: reader.u8(),
    principalVault: reader.pubkey(),
    rewardVault: reader.pubkey(),
    paused: reader.bool(),
    minStake: reader.u64(),
    totalStaked: reader.u64(),
    totalCommitted: reader.u128(),
    totalPaid: reader.u128(),
    totalFunded: reader.u128(),
    stakerCount: reader.u64(),
    positionCount: reader.u64(),
    tiers: []
  };
  for (let i = 0; i < 5; i += 1) {
    pool.tiers.push({
      aprBps: reader.u64(),
      lockSecs: reader.u64(),
      capSecs: reader.u64(),
      enabled: reader.bool()
    });
  }
  return pool;
}
function decodePosition(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.position, "Position");
  return {
    address,
    pool: reader.pubkey(),
    owner: reader.pubkey(),
    nonce: reader.u64(),
    tier: reader.u8(),
    amount: reader.u64(),
    aprBps: reader.u64(),
    capSecs: reader.u64(),
    startTs: reader.i64(),
    unlockTs: reader.i64(),
    claimed: reader.u128(),
    committed: reader.u128(),
    bump: reader.u8()
  };
}
function decodeUserState(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.userState, "UserState");
  return {
    address,
    pool: reader.pubkey(),
    owner: reader.pubkey(),
    nextNonce: reader.u64(),
    activePositions: reader.u16(),
    totalStaked: reader.u64(),
    totalClaimed: reader.u128(),
    bump: reader.u8()
  };
}
async function fetchPool(connection) {
  const info = await connection.getAccountInfo(poolPda(), "confirmed");
  return info ? decodePool(poolPda().toBase58(), info.data) : null;
}
async function fetchUserState(connection, owner) {
  const address = userStatePda(owner);
  const info = await connection.getAccountInfo(address, "confirmed");
  return info ? decodeUserState(address.toBase58(), info.data) : null;
}
async function fetchPositions(connection, owner) {
  const userState = await fetchUserState(connection, owner);
  const count = Number(userState?.nextNonce ?? 0n);
  if (count === 0) return [];
  const addresses = Array.from({ length: count }, (_, nonce) => positionPda(owner, nonce));
  const infos = await connection.getMultipleAccountsInfo(addresses, "confirmed");
  const positions = [];
  infos.forEach((info, index) => {
    if (!info) return;
    try {
      positions.push(decodePosition(addresses[index].toBase58(), info.data));
    } catch {
    }
  });
  return positions;
}

// src/lib/rewards.js
var BPS_DENOMINATOR = 10000n;
var YEAR_SECONDS = 31536000n;
function maxReward(amount, aprBps, capSecs) {
  return BigInt(amount) * BigInt(aprBps) * BigInt(capSecs) / (BPS_DENOMINATOR * YEAR_SECONDS);
}
function accrued(amount, aprBps, elapsedSecs, capSecs) {
  const effective = BigInt(elapsedSecs) < BigInt(capSecs) ? BigInt(elapsedSecs) : BigInt(capSecs);
  return maxReward(amount, aprBps, effective);
}
function claimable(amount, aprBps, elapsedSecs, capSecs, claimed) {
  const earned = accrued(amount, aprBps, elapsedSecs, capSecs);
  return earned > BigInt(claimed) ? earned - BigInt(claimed) : 0n;
}

// src/lib/tokenAccount.js
async function readTokenAmount(connection, address) {
  const info = await connection.getAccountInfo(address, "confirmed");
  if (!info || info.data.length < 72) return null;
  const view = new DataView(info.data.buffer, info.data.byteOffset + 64, 8);
  return view.getBigUint64(0, true);
}
async function readTokenAmountOrZero(connection, address) {
  try {
    const amount = await readTokenAmount(connection, address);
    return amount ?? 0n;
  } catch {
    return 0n;
  }
}

// src/lib/format.js
var DECIMALS = 9;
function formatTokens(value, decimals = DECIMALS, maxFractionDigits = 4) {
  const amount = BigInt(value);
  const negative = amount < 0n;
  const abs = negative ? -amount : amount;
  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const fraction = abs % divisor;
  let text = withGrouping(whole);
  if (fraction > 0n && maxFractionDigits > 0) {
    let digits = fraction.toString().padStart(decimals, "0").slice(0, maxFractionDigits);
    digits = digits.replace(/0+$/, "");
    if (digits.length > 0) text += `.${digits}`;
  }
  return negative ? `-${text}` : text;
}
function withGrouping(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function parseTokens(text, decimals = DECIMALS) {
  const clean = String(text).trim().replace(/,/g, "");
  if (!/^\d*(\.\d*)?$/.test(clean) || clean === "" || clean === ".") {
    throw new Error("\u8BF7\u8F93\u5165\u6709\u6548\u6570\u91CF");
  }
  const [whole, fraction = ""] = clean.split(".");
  if (fraction.length > decimals) {
    throw new Error(`\u6700\u591A\u652F\u6301 ${decimals} \u4F4D\u5C0F\u6570`);
  }
  const padded = fraction.padEnd(decimals, "0");
  return BigInt(whole || "0") * 10n ** BigInt(decimals) + BigInt(padded || "0");
}
function formatBps(bps) {
  const value = Number(bps) / 100;
  const text = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return `${text}%`;
}
function formatDuration(seconds) {
  const value = Number(seconds);
  if (value === 0) return "\u968F\u65F6\u53EF\u89E3\u9664";
  const days = Math.round(value / 86400);
  if (days % 30 === 0 && days < 360) return `${days} \u5929`;
  if (days === 360) return "360 \u5929";
  return `${days} \u5929`;
}
function formatDateTime(unixSeconds) {
  if (!unixSeconds) return "\u2014";
  const date = new Date(Number(unixSeconds) * 1e3);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}
function shorten(address, head = 4, tail = 4) {
  if (!address) return "\u2014";
  return `${address.slice(0, head)}\u2026${address.slice(-tail)}`;
}

// src/user.js
var state = {
  connection: getConnection(),
  wallet: null,
  pool: null,
  userState: null,
  positions: [],
  balance: 0n,
  selectedTier: 0
};
var config = getConfig();
function nowSeconds() {
  return Math.floor(Date.now() / 1e3);
}
function decodeError(error) {
  const message = error?.message ?? String(error);
  const anchorError = error?.error?.errorMessage;
  if (anchorError) return anchorError;
  if (message.includes("User rejected")) return "\u4F60\u5DF2\u5728\u94B1\u5305\u4E2D\u53D6\u6D88\u4EA4\u6613";
  if (message.includes("insufficient")) return "\u4F59\u989D\u4E0D\u8DB3\uFF0C\u6216\u624B\u7EED\u8D39\u4E0D\u8DB3";
  return message;
}
init();
async function init() {
  const badge = $("#network-badge");
  badge.textContent = config.network === "mainnet-beta" ? "\u4E3B\u7F51" : config.network;
  if (config.network === "mainnet-beta") badge.classList.add("badge--warn");
  $("#connect").addEventListener("click", onConnect);
  $("#stake").addEventListener("click", onStake);
  $("#max").addEventListener("click", () => {
    $("#amount").value = formatTokens(state.balance, config.token.decimals, 9);
  });
  if (detectProviders().length === 0) {
    $("#connect").textContent = "\u5728\u94B1\u5305\u4E2D\u6253\u5F00";
    setStatus(walletHint(), "error");
  }
  renderTiers();
  renderAbout();
  renderSummary();
  try {
    state.pool = await fetchPool(state.connection);
  } catch (error) {
    setStatus(`\u8BFB\u53D6\u8D28\u62BC\u6C60\u5931\u8D25\uFF1A${decodeError(error)}`, "error");
    return;
  }
  if (!state.pool) {
    setStatus("\u8D28\u62BC\u6C60\u5C1A\u672A\u521B\u5EFA\uFF08\u7A0B\u5E8F\u5730\u5740\u53EF\u80FD\u4ECD\u662F\u5360\u4F4D\u503C\uFF0C\u6216\u9879\u76EE\u65B9\u5C1A\u672A\u521D\u59CB\u5316\uFF09\u3002", "error");
    $("#stake").disabled = true;
    $("#stake").textContent = "\u8D28\u62BC\u6C60\u672A\u5C31\u7EEA";
    renderSummary();
    return;
  }
  renderSummary();
}
async function onConnect() {
  if (detectProviders().length === 0) {
    toast(walletHint(), "error", 8e3);
    return;
  }
  try {
    state.wallet = await connectWallet({ choose: chooseWallet });
    $("#connect").textContent = shorten(state.wallet.publicKey.toBase58());
    $("#connect").dataset.connected = "true";
    await refresh();
  } catch (error) {
    toast(decodeError(error), "error");
  }
}
async function refresh() {
  if (!state.wallet) return;
  const owner = state.wallet.publicKey;
  try {
    const [pool, userState, positions] = await Promise.all([
      fetchPool(state.connection),
      fetchUserState(state.connection, owner),
      fetchPositions(state.connection, owner)
    ]);
    state.pool = pool;
    state.userState = userState;
    state.positions = positions.sort((a, b) => Number(a.startTs - b.startTs));
    state.balance = await loadBalance(owner, pool);
    renderSummary();
    renderPositions();
    renderTiers();
  } catch (error) {
    setStatus(`\u5237\u65B0\u5931\u8D25\uFF1A${decodeError(error)}`, "error");
  }
}
async function loadBalance(owner, pool) {
  if (!pool) return 0n;
  const ata = getAssociatedTokenAddressSync(new PublicKey(pool.mint), owner);
  try {
    return await readTokenAmountOrZero(state.connection, ata);
  } catch {
    return 0n;
  }
}
function tierLabel(index) {
  return getTiers()[index]?.label ?? `Tier ${index}`;
}
function renderSummary() {
  const pool = state.pool;
  const positions = state.positions.filter((p) => p.owner === state.wallet?.publicKey.toBase58());
  const staked = positions.reduce((sum, p) => sum + p.amount, 0n);
  const claimed = state.userState?.totalClaimed ?? 0n;
  const now = nowSeconds();
  const outstanding = positions.reduce(
    (sum, p) => sum + claimable(p.amount, p.aprBps, now - Number(p.startTs), p.capSecs, p.claimed),
    0n
  );
  const aprs = pool ? pool.tiers.map((tier) => formatBps(tier.aprBps)).join(" / ") : "\u2014";
  const card = $("#summary");
  card.replaceChildren(
    el(
      "div",
      { class: "grid-2" },
      statBox("\u4EE3\u5E01\u4F59\u989D", formatTokens(state.balance, config.token.decimals), config.token.symbol),
      statBox("\u8D28\u62BC\u4E2D", formatTokens(staked, config.token.decimals), `${positions.length} \u4E2A\u4ED3\u4F4D`),
      statBox("\u7D2F\u8BA1\u5DF2\u9886\u5956\u52B1", formatTokens(claimed, config.token.decimals), "\u94FE\u4E0A\u5DF2\u652F\u4ED8"),
      statBox("\u5F53\u524D\u53EF\u9886\u53D6", formatTokens(outstanding, config.token.decimals), "\u6309\u79D2\u7D2F\u8BA1")
    ),
    el("p", { class: "small muted", text: `\u5404\u6863 APR\uFF1A${aprs}\uFF08APR \u4EE5\u4ED3\u4F4D\u5F00\u4ED3\u65F6\u8BB0\u5F55\u4E3A\u51C6\uFF09` })
  );
  $("#summary-title").textContent = pool?.paused ? "\u8D28\u62BC\u6C60\u5DF2\u6682\u505C\u65B0\u8D28\u62BC" : "\u6211\u7684\u8D44\u4EA7";
  if (pool?.paused) {
    $("#stake").disabled = true;
    $("#stake").textContent = "\u5F53\u524D\u6682\u505C\u63A5\u53D7\u65B0\u8D28\u62BC";
  }
}
function renderAbout() {
  const host = $("#about");
  if (!host) return;
  const text = config.token.description || "";
  host.replaceChildren(
    ...text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph) => el("p", { class: "small muted", text: paragraph }))
  );
}
function statBox(label, value, hint) {
  return el(
    "div",
    { class: "stat" },
    el("span", { class: "stat__label", text: label }),
    el("strong", { class: "stat__value", text: value }),
    el("span", { class: "stat__hint", text: hint })
  );
}
function renderTiers() {
  const host = $("#tiers");
  const pool = state.pool;
  host.replaceChildren(
    ...getTiers().map((tier, index) => {
      const onChain = pool?.tiers[index];
      const aprBps = onChain ? onChain.aprBps : BigInt(tier.aprBps);
      const lockSecs = onChain ? Number(onChain.lockSecs) : tier.lockSecs;
      const card = el(
        "div",
        { class: `tier${state.selectedTier === index ? " is-active" : ""}`, role: "button", tabindex: "0" },
        el(
          "div",
          { class: "tier__main" },
          el("span", { class: "tier__apr", text: formatBps(aprBps) }),
          el("span", { class: "tier__meta", text: `${tier.label} \xB7 ${lockSecs === 0 ? "\u968F\u65F6\u53EF\u89E3\u9664" : `\u9501\u4ED3 ${Math.round(lockSecs / 86400)} \u5929`}` })
        ),
        el("span", { class: "tier__meta", text: onChain?.enabled === false ? "\u672A\u542F\u7528" : "\u9009\u62E9" })
      );
      const select = () => {
        state.selectedTier = index;
        renderTiers();
        renderStakeHint();
      };
      card.addEventListener("click", select);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") select();
      });
      return card;
    })
  );
  renderStakeHint();
}
function renderStakeHint() {
  const pool = state.pool;
  if (!pool) return;
  const tier = pool.tiers[state.selectedTier];
  const now = nowSeconds();
  let amount = 0n;
  try {
    amount = parseTokens($("#amount").value, config.token.decimals);
  } catch {
    amount = 0n;
  }
  const reward = amount > 0n ? maxReward(amount, tier.aprBps, tier.capSecs) : 0n;
  const unlock = Number(tier.lockSecs) === 0 ? "\u968F\u65F6\u53EF\u89E3\u9664" : formatDateTime(now + Number(tier.lockSecs));
  $("#amount-hint").replaceChildren(
    el("span", { class: "small muted", text: `\u6700\u574F\u60C5\u51B5\u5956\u52B1\uFF1A${formatTokens(reward, config.token.decimals)} ${config.token.symbol}` }),
    el("span", { class: "spacer" }),
    el("span", { class: "small muted", text: `\u5230\u671F\uFF1A${unlock}` })
  );
  const minimum = formatTokens(pool.minStake, config.token.decimals, 9);
  if (amount > 0n && amount < pool.minStake) {
    setStatus(`\u6700\u5C0F\u8D28\u62BC\u6570\u91CF\u4E3A ${minimum} ${config.token.symbol}`, "error");
  } else {
    setStatus("", "info");
  }
}
function renderPositions() {
  const host = $("#positions");
  const now = nowSeconds();
  if (!state.wallet) {
    host.replaceChildren(el("p", { class: "muted small", text: "\u8FDE\u63A5\u94B1\u5305\u540E\u663E\u793A\u4F60\u7684\u4ED3\u4F4D\u3002" }));
    return;
  }
  if (state.positions.length === 0) {
    host.replaceChildren(el("p", { class: "muted small", text: "\u8FD8\u6CA1\u6709\u8D28\u62BC\u4ED3\u4F4D\u3002" }));
    return;
  }
  host.replaceChildren(
    ...state.positions.map((position) => {
      const pending = claimable(
        position.amount,
        position.aprBps,
        now - Number(position.startTs),
        position.capSecs,
        position.claimed
      );
      const unlocked = now >= Number(position.unlockTs);
      const remaining = Number(position.unlockTs) - now;
      const claimButton = el(
        "button",
        { class: "btn btn--ghost btn--small", type: "button", onclick: (event) => onClaim(position, event.currentTarget) },
        pending > 0n ? `\u9886\u53D6 ${formatTokens(pending, config.token.decimals)}` : "\u6682\u65E0\u53EF\u9886\u53D6"
      );
      claimButton.disabled = pending === 0n;
      const unstakeButton = el(
        "button",
        { class: "btn btn--small", type: "button", onclick: (event) => onUnstake(position, event.currentTarget) },
        "\u89E3\u9664\u8D28\u62BC"
      );
      unstakeButton.disabled = !unlocked;
      return el(
        "div",
        { class: "position" },
        el(
          "div",
          { class: "position__head" },
          el("span", { class: "position__amount", text: `${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}` }),
          el("span", { class: "badge", text: `${tierLabel(position.tier)} \xB7 ${formatBps(position.aprBps)}` })
        ),
        el(
          "div",
          { class: "position__meta" },
          el("span", { text: `\u5F00\u4ED3\uFF1A${formatDateTime(position.startTs)}` }),
          el("span", {
            text: Number(position.unlockTs) === 0 ? "\u7075\u6D3B\u8D28\u62BC\uFF0C\u968F\u65F6\u53EF\u89E3\u9664" : unlocked ? `\u5DF2\u4E8E ${formatDateTime(position.unlockTs)} \u5230\u671F` : `\u9501\u4ED3\u81F3 ${formatDateTime(position.unlockTs)}\uFF08\u5269\u4F59 ${Math.ceil(remaining / 86400)} \u5929\uFF09`
          }),
          el("span", { text: `\u5DF2\u9886\uFF1A${formatTokens(position.claimed, config.token.decimals)}` })
        ),
        el("div", { class: "position__actions" }, claimButton, unstakeButton)
      );
    })
  );
}
async function onStake(event) {
  const button = event.currentTarget;
  if (!state.wallet) {
    toast("\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305", "error");
    return;
  }
  let amount;
  try {
    amount = parseTokens($("#amount").value, config.token.decimals);
  } catch (error) {
    toast(error.message, "error");
    return;
  }
  if (amount <= 0n) {
    toast("\u8BF7\u8F93\u5165\u8D28\u62BC\u6570\u91CF", "error");
    return;
  }
  const pool = state.pool;
  const tier = pool.tiers[state.selectedTier];
  const owner = state.wallet.publicKey;
  const nonce = state.userState?.nextNonce ?? 0n;
  const unlockTs = Number(tier.lockSecs) === 0 ? 0 : nowSeconds() + Number(tier.lockSecs);
  const commitment = maxReward(amount, tier.aprBps, tier.capSecs);
  const confirmed = await reviewTransaction({
    title: "\u786E\u8BA4\u8D28\u62BC",
    subtitle: "\u4EA4\u6613\u5C06\u7531\u4F60\u7684\u94B1\u5305\u7B7E\u540D\uFF0C\u4EE3\u5E01\u4ECE\u4F60\u7684\u8D26\u6237\u8F6C\u5165\u8D28\u62BC\u5408\u7EA6\u91D1\u5E93\u3002",
    rows: [
      ["\u8D28\u62BC\u671F\u9650", `${tierLabel(state.selectedTier)}\uFF08${formatDuration(tier.lockSecs)}\uFF09`],
      ["APR", formatBps(tier.aprBps)],
      ["\u8D28\u62BC\u6570\u91CF", `${formatTokens(amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u5230\u671F\u65F6\u95F4", unlockTs === 0 ? "\u968F\u65F6\u53EF\u89E3\u9664" : formatDateTime(unlockTs)],
      ["\u9884\u7559\u5956\u52B1\uFF08\u6700\u574F\u60C5\u51B5\uFF09", formatTokens(commitment, config.token.decimals)],
      ["\u4F60\u7684\u94B1\u5305", shorten(owner.toBase58(), 6, 6)],
      ["\u5408\u7EA6", shorten(config.staking.programId, 6, 6)]
    ],
    risks: [
      "\u9501\u4ED3\u671F\u95F4\u672C\u91D1\u4E0D\u53EF\u63D0\u53D6\uFF0C\u5230\u671F\u524D\u65E0\u6CD5\u89E3\u9664\u3002",
      "\u53D1\u653E\u5956\u52B1\u53D6\u51B3\u4E8E\u5956\u52B1\u6C60\u4F59\u989D\uFF0C\u5408\u7EA6\u4F1A\u62D2\u7EDD\u8D85\u51FA\u9884\u7B97\u7684\u8D28\u62BC\u3002",
      "APR \u53EA\u662F\u53C2\u6570\uFF0C\u4E0D\u6784\u6210\u6536\u76CA\u627F\u8BFA\u3002"
    ]
  });
  if (!confirmed) return;
  await withBusy(button, async () => {
    try {
      const ix = ixStake({
        owner,
        userState: userStatePda(owner),
        position: positionPda(owner, nonce),
        ownerAta: getAssociatedTokenAddressSync(new PublicKey(pool.mint), owner),
        principalVault: new PublicKey(pool.principalVault),
        rewardVault: new PublicKey(pool.rewardVault),
        tier: state.selectedTier,
        amount,
        nonce
      });
      const { Transaction } = await import("./index.browser.esm-25CM7TUS.js");
      const tx = new Transaction().add(ix);
      tx.feePayer = owner;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u8D28\u62BC\u6210\u529F\uFF1A${shorten(signature)}`, "ok");
      $("#amount").value = "";
      await refresh();
    } catch (error) {
      toast(decodeError(error), "error");
    }
  });
}
async function onClaim(position, button) {
  const owner = state.wallet.publicKey;
  const now = nowSeconds();
  const pending = claimable(position.amount, position.aprBps, now - Number(position.startTs), position.capSecs, position.claimed);
  const confirmed = await reviewTransaction({
    title: "\u9886\u53D6\u5956\u52B1",
    subtitle: "\u53EA\u8F6C\u79FB\u5DF2\u7D2F\u79EF\u7684\u5956\u52B1\uFF0C\u672C\u91D1\u7559\u5728\u5408\u7EA6\u4E2D\u7EE7\u7EED\u8BA1\u606F\u3002",
    rows: [
      ["\u4ED3\u4F4D", `${tierLabel(position.tier)} \xB7 ${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u672C\u6B21\u9886\u53D6", `${formatTokens(pending, config.token.decimals)} ${config.token.symbol}`],
      ["\u63A5\u6536\u5730\u5740", shorten(owner.toBase58(), 6, 6)]
    ],
    risks: ["\u9886\u53D6\u540E\u8BE5\u6BB5\u65F6\u95F4\u7684\u5956\u52B1\u5F52\u96F6\uFF0C\u4ED3\u4F4D\u7EE7\u7EED\u6309\u539F APR \u7D2F\u79EF\u3002"]
  });
  if (!confirmed) return;
  await withBusy(button, async () => {
    try {
      const ix = ixClaim({
        owner,
        userState: userStatePda(owner),
        position: new PublicKey(position.address),
        ownerAta: getAssociatedTokenAddressSync(new PublicKey(state.pool.mint), owner),
        rewardVault: new PublicKey(state.pool.rewardVault),
        nonce: position.nonce
      });
      const { Transaction } = await import("./index.browser.esm-25CM7TUS.js");
      const tx = new Transaction().add(ix);
      tx.feePayer = owner;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u5DF2\u9886\u53D6\uFF1A${shorten(signature)}`, "ok");
      await refresh();
    } catch (error) {
      toast(decodeError(error), "error");
    }
  });
}
async function onUnstake(position, button) {
  const owner = state.wallet.publicKey;
  const unlocked = nowSeconds() >= Number(position.unlockTs);
  if (!unlocked) {
    toast("\u9501\u4ED3\u671F\u672A\u7ED3\u675F\uFF0C\u65E0\u6CD5\u89E3\u9664", "error");
    return;
  }
  const now = nowSeconds();
  const pending = claimable(position.amount, position.aprBps, now - Number(position.startTs), position.capSecs, position.claimed);
  const confirmed = await reviewTransaction({
    title: "\u89E3\u9664\u8D28\u62BC",
    subtitle: "\u672C\u91D1\u4E0E\u672A\u9886\u53D6\u5956\u52B1\u4F1A\u4E00\u8D77\u56DE\u5230\u4F60\u7684\u94B1\u5305\uFF0C\u4ED3\u4F4D\u8D26\u6237\u5173\u95ED\u3002",
    rows: [
      ["\u4ED3\u4F4D", `${tierLabel(position.tier)} \xB7 ${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u672C\u91D1", `${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u672A\u9886\u53D6\u5956\u52B1", `${formatTokens(pending, config.token.decimals)} ${config.token.symbol}`],
      ["\u63A5\u6536\u5730\u5740", shorten(owner.toBase58(), 6, 6)]
    ],
    risks: ["\u89E3\u9664\u540E\u8BE5\u4ED3\u4F4D\u4E0D\u518D\u8BA1\u606F\uFF1B\u5982\u9700\u7EE7\u7EED\u8D28\u62BC\u9700\u91CD\u65B0\u5F00\u4ED3\uFF0C\u6309\u5F53\u65F6 APR \u6267\u884C\u3002"]
  });
  if (!confirmed) return;
  await withBusy(button, async () => {
    try {
      const ix = ixUnstake({
        owner,
        userState: userStatePda(owner),
        position: new PublicKey(position.address),
        ownerAta: getAssociatedTokenAddressSync(new PublicKey(state.pool.mint), owner),
        principalVault: new PublicKey(state.pool.principalVault),
        rewardVault: new PublicKey(state.pool.rewardVault),
        nonce: position.nonce
      });
      const { Transaction } = await import("./index.browser.esm-25CM7TUS.js");
      const tx = new Transaction().add(ix);
      tx.feePayer = owner;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u5DF2\u89E3\u9664\uFF1A${shorten(signature)}`, "ok");
      await refresh();
    } catch (error) {
      toast(decodeError(error), "error");
    }
  });
}
window.addEventListener("aura:refresh", refresh);
$("#amount").addEventListener("input", renderStakeHint);
//# sourceMappingURL=user.js.map
