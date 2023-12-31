// ../_tools_/src/Scrypt.js
var buffer = await import("buffer/index.js");
var Buffer = buffer.Buffer;
var MAX_VALUE = 2147483647;
function SHA256(m) {
  const K = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  let h0 = 1779033703, h1 = 3144134277, h2 = 1013904242, h3 = 2773480762;
  let h4 = 1359893119, h5 = 2600822924, h6 = 528734635, h7 = 1541459225;
  const w = new Uint32Array(64);
  function blocks(p2) {
    let off = 0, len = p2.length;
    while (len >= 64) {
      let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i2, j, t1, t2;
      for (i2 = 0; i2 < 16; i2++) {
        j = off + i2 * 4;
        w[i2] = (p2[j] & 255) << 24 | (p2[j + 1] & 255) << 16 | (p2[j + 2] & 255) << 8 | p2[j + 3] & 255;
      }
      for (i2 = 16; i2 < 64; i2++) {
        u = w[i2 - 2];
        t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
        u = w[i2 - 15];
        t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
        w[i2] = (t1 + w[i2 - 7] | 0) + (t2 + w[i2 - 16] | 0) | 0;
      }
      for (i2 = 0; i2 < 64; i2++) {
        t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i2] + w[i2] | 0) | 0) | 0;
        t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
        h = g;
        g = f;
        f = e;
        e = d + t1 | 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 | 0;
      }
      h0 = h0 + a | 0;
      h1 = h1 + b | 0;
      h2 = h2 + c | 0;
      h3 = h3 + d | 0;
      h4 = h4 + e | 0;
      h5 = h5 + f | 0;
      h6 = h6 + g | 0;
      h7 = h7 + h | 0;
      off += 64;
      len -= 64;
    }
  }
  blocks(m);
  let i, bytesLeft = m.length % 64, bitLenHi = m.length / 536870912 | 0, bitLenLo = m.length << 3, numZeros = bytesLeft < 56 ? 56 : 120, p = m.slice(m.length - bytesLeft, m.length);
  p.push(128);
  for (i = bytesLeft + 1; i < numZeros; i++) {
    p.push(0);
  }
  p.push(bitLenHi >>> 24 & 255);
  p.push(bitLenHi >>> 16 & 255);
  p.push(bitLenHi >>> 8 & 255);
  p.push(bitLenHi >>> 0 & 255);
  p.push(bitLenLo >>> 24 & 255);
  p.push(bitLenLo >>> 16 & 255);
  p.push(bitLenLo >>> 8 & 255);
  p.push(bitLenLo >>> 0 & 255);
  blocks(p);
  return [
    h0 >>> 24 & 255,
    h0 >>> 16 & 255,
    h0 >>> 8 & 255,
    h0 >>> 0 & 255,
    h1 >>> 24 & 255,
    h1 >>> 16 & 255,
    h1 >>> 8 & 255,
    h1 >>> 0 & 255,
    h2 >>> 24 & 255,
    h2 >>> 16 & 255,
    h2 >>> 8 & 255,
    h2 >>> 0 & 255,
    h3 >>> 24 & 255,
    h3 >>> 16 & 255,
    h3 >>> 8 & 255,
    h3 >>> 0 & 255,
    h4 >>> 24 & 255,
    h4 >>> 16 & 255,
    h4 >>> 8 & 255,
    h4 >>> 0 & 255,
    h5 >>> 24 & 255,
    h5 >>> 16 & 255,
    h5 >>> 8 & 255,
    h5 >>> 0 & 255,
    h6 >>> 24 & 255,
    h6 >>> 16 & 255,
    h6 >>> 8 & 255,
    h6 >>> 0 & 255,
    h7 >>> 24 & 255,
    h7 >>> 16 & 255,
    h7 >>> 8 & 255,
    h7 >>> 0 & 255
  ];
}
function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
  password = password.length <= 64 ? password : SHA256(password);
  const innerLen = 64 + salt.length + 4;
  const inner = new Array(innerLen);
  const outerKey = new Array(64);
  let i;
  let dk = [];
  for (i = 0; i < 64; i++) {
    inner[i] = 54;
  }
  for (i = 0; i < password.length; i++) {
    inner[i] ^= password[i];
  }
  for (i = 0; i < salt.length; i++) {
    inner[64 + i] = salt[i];
  }
  for (i = innerLen - 4; i < innerLen; i++) {
    inner[i] = 0;
  }
  for (i = 0; i < 64; i++)
    outerKey[i] = 92;
  for (i = 0; i < password.length; i++)
    outerKey[i] ^= password[i];
  function incrementCounter() {
    for (let i2 = innerLen - 1; i2 >= innerLen - 4; i2--) {
      inner[i2]++;
      if (inner[i2] <= 255)
        return;
      inner[i2] = 0;
    }
  }
  while (dkLen >= 32) {
    incrementCounter();
    dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
    dkLen -= 32;
  }
  if (dkLen > 0) {
    incrementCounter();
    dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
  }
  return dk;
}
function blockmix_salsa8(BY, Yi, r, x, _X) {
  let i;
  arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
  for (i = 0; i < 2 * r; i++) {
    blockxor(BY, i * 16, _X, 16);
    salsa20_8(_X, x);
    arraycopy(_X, 0, BY, Yi + i * 16, 16);
  }
  for (i = 0; i < r; i++) {
    arraycopy(BY, Yi + i * 2 * 16, BY, i * 16, 16);
  }
  for (i = 0; i < r; i++) {
    arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
  }
}
function R(a, b) {
  return a << b | a >>> 32 - b;
}
function salsa20_8(B, x) {
  arraycopy(B, 0, x, 0, 16);
  for (let i = 8; i > 0; i -= 2) {
    x[4] ^= R(x[0] + x[12], 7);
    x[8] ^= R(x[4] + x[0], 9);
    x[12] ^= R(x[8] + x[4], 13);
    x[0] ^= R(x[12] + x[8], 18);
    x[9] ^= R(x[5] + x[1], 7);
    x[13] ^= R(x[9] + x[5], 9);
    x[1] ^= R(x[13] + x[9], 13);
    x[5] ^= R(x[1] + x[13], 18);
    x[14] ^= R(x[10] + x[6], 7);
    x[2] ^= R(x[14] + x[10], 9);
    x[6] ^= R(x[2] + x[14], 13);
    x[10] ^= R(x[6] + x[2], 18);
    x[3] ^= R(x[15] + x[11], 7);
    x[7] ^= R(x[3] + x[15], 9);
    x[11] ^= R(x[7] + x[3], 13);
    x[15] ^= R(x[11] + x[7], 18);
    x[1] ^= R(x[0] + x[3], 7);
    x[2] ^= R(x[1] + x[0], 9);
    x[3] ^= R(x[2] + x[1], 13);
    x[0] ^= R(x[3] + x[2], 18);
    x[6] ^= R(x[5] + x[4], 7);
    x[7] ^= R(x[6] + x[5], 9);
    x[4] ^= R(x[7] + x[6], 13);
    x[5] ^= R(x[4] + x[7], 18);
    x[11] ^= R(x[10] + x[9], 7);
    x[8] ^= R(x[11] + x[10], 9);
    x[9] ^= R(x[8] + x[11], 13);
    x[10] ^= R(x[9] + x[8], 18);
    x[12] ^= R(x[15] + x[14], 7);
    x[13] ^= R(x[12] + x[15], 9);
    x[14] ^= R(x[13] + x[12], 13);
    x[15] ^= R(x[14] + x[13], 18);
  }
  for (let i = 0; i < 16; ++i) {
    B[i] += x[i];
  }
}
function blockxor(S, Si, D, len) {
  for (let i = 0; i < len; i++) {
    D[i] ^= S[Si + i];
  }
}
function arraycopy(src, srcPos, dest, destPos, length) {
  while (length--) {
    dest[destPos++] = src[srcPos++];
  }
}
function checkBufferish(o) {
  if (!o || typeof o.length !== "number") {
    return false;
  }
  for (let i = 0; i < o.length; i++) {
    const v = o[i];
    if (typeof v !== "number" || v % 1 || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}
function ensureInteger(value, name) {
  if (typeof value !== "number" || value % 1) {
    throw new Error("invalid " + name);
  }
  return value;
}
var Scrypt = function(password, salt, len = 8, power = 1) {
  let N = Math.pow(2, power);
  let r = Math.pow(8, power);
  let p = Math.pow(4, power);
  let dkLen = len;
  let ret = {
    salt: salt ?? password,
    cost: N,
    memory: r,
    threads: p,
    octets: dkLen
  };
  let callback = false;
  password = Buffer.from(password.normalize("NFKC"));
  salt = Buffer.from(salt.normalize("NFKC"));
  N = ensureInteger(N, "N");
  r = ensureInteger(r, "r");
  p = ensureInteger(p, "p");
  dkLen = ensureInteger(dkLen, "dkLen");
  if (N === 0 || (N & N - 1) !== 0) {
    throw new Error("N must be power of 2");
  }
  if (N > MAX_VALUE / 128 / r) {
    throw new Error("N too large");
  }
  if (r > MAX_VALUE / 128 / p) {
    throw new Error("r too large");
  }
  if (!checkBufferish(password)) {
    throw new Error("password must be an array or buffer");
  }
  password = Array.prototype.slice.call(password);
  if (!checkBufferish(salt)) {
    throw new Error("salt must be an array or buffer");
  }
  salt = Array.prototype.slice.call(salt);
  let b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
  const B = new Uint32Array(p * 32 * r);
  for (let i = 0; i < B.length; i++) {
    const j = i * 4;
    B[i] = (b[j + 3] & 255) << 24 | (b[j + 2] & 255) << 16 | (b[j + 1] & 255) << 8 | (b[j + 0] & 255) << 0;
  }
  const XY = new Uint32Array(64 * r);
  const V = new Uint32Array(32 * r * N);
  const Yi = 32 * r;
  const x = new Uint32Array(16);
  const _X = new Uint32Array(16);
  const totalOps = p * N * 2;
  let currentOp = 0;
  let lastPercent10 = null;
  let stop = false;
  let state = 0;
  let i0 = 0, i1;
  let Bi;
  const limit = callback ? parseInt(1e3 / r) : 4294967295;
  const nextTick = typeof setImmediate !== "undefined" ? setImmediate : setTimeout;
  const incrementalSMix = function() {
    if (stop) {
      return callback(new Error("cancelled"), currentOp / totalOps);
    }
    let steps;
    switch (state) {
      case 0:
        Bi = i0 * 32 * r;
        arraycopy(B, Bi, XY, 0, Yi);
        state = 1;
        i1 = 0;
      case 1:
        steps = N - i1;
        if (steps > limit) {
          steps = limit;
        }
        for (let i = 0; i < steps; i++) {
          arraycopy(XY, 0, V, (i1 + i) * Yi, Yi);
          blockmix_salsa8(XY, Yi, r, x, _X);
        }
        i1 += steps;
        currentOp += steps;
        if (callback) {
          const percent10 = parseInt(1e3 * currentOp / totalOps);
          if (percent10 !== lastPercent10) {
            stop = callback(null, currentOp / totalOps);
            if (stop) {
              break;
            }
            lastPercent10 = percent10;
          }
        }
        if (i1 < N) {
          break;
        }
        i1 = 0;
        state = 2;
      case 2:
        steps = N - i1;
        if (steps > limit) {
          steps = limit;
        }
        for (let i = 0; i < steps; i++) {
          const offset = (2 * r - 1) * 16;
          const j = XY[offset] & N - 1;
          blockxor(V, j * Yi, XY, Yi);
          blockmix_salsa8(XY, Yi, r, x, _X);
        }
        i1 += steps;
        currentOp += steps;
        if (callback) {
          const percent10 = parseInt(1e3 * currentOp / totalOps);
          if (percent10 !== lastPercent10) {
            stop = callback(null, currentOp / totalOps);
            if (stop) {
              break;
            }
            lastPercent10 = percent10;
          }
        }
        if (i1 < N) {
          break;
        }
        arraycopy(XY, 0, B, Bi, Yi);
        i0++;
        if (i0 < p) {
          state = 0;
          break;
        }
        b = [];
        for (let i = 0; i < B.length; i++) {
          b.push(B[i] >> 0 & 255);
          b.push(B[i] >> 8 & 255);
          b.push(B[i] >> 16 & 255);
          b.push(B[i] >> 24 & 255);
        }
        const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);
        if (callback) {
          callback(null, 1, derivedKey);
        }
        return derivedKey;
    }
    if (callback) {
      nextTick(incrementalSMix);
    }
  };
  if (!callback) {
    while (true) {
      const derivedKey = incrementalSMix();
      if (derivedKey != void 0) {
        ret.hash = Buffer.from(derivedKey).toString("hex");
        return ret;
      }
    }
  }
  incrementalSMix();
};

// ../_tools_/src/Round.js
var RoundUp = function(input, factor) {
  return factor - input % factor + input;
};

// ../_tools_/src/Padding.js
var Pad = function(msg, paddingLengthFactor = 32) {
  msg = msg.toString();
  const diff = PaddingLength(msg, paddingLengthFactor);
  if (+diff === 0) {
    return msg;
  }
  let hash = Scrypt(msg, msg, paddingLengthFactor, 1).hash.toString();
  hash = hash.slice(hash.length - diff);
  return hash + msg;
};
var Unpad = function(paddedText, paddingLengthFactor = 32) {
  paddedText = paddedText.toString();
  let len = paddedText.length;
  for (let i = paddingLengthFactor + 1; i <= paddingLengthFactor * 2; i++) {
    const maybeHash = paddedText.slice(0, i);
    const msg = paddedText.slice(i);
    let hash = Scrypt(msg, msg, paddingLengthFactor, 1).hash.toString();
    hash = hash.slice(hash.length - i);
    if (hash === maybeHash) {
      return msg;
    }
  }
  return paddedText;
};
var PaddingLength = function(txt, paddingLengthFactor) {
  return RoundUp(txt.length, paddingLengthFactor) - txt.length + paddingLengthFactor;
};
export {
  Pad,
  Unpad
};
