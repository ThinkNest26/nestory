/* Nestory · tiny QR code maker (byte mode, error correction M, versions 1–9). Draws an SVG. */
(function(){
  const ECC = [0,10,16,26,18,24,16,18,22,22], BLK = [0,1,1,1,2,2,4,4,4,5];
  function rawModules(v){ let r = (16*v+128)*v+64; if(v >= 2){ const n = Math.floor(v/7)+2; r -= (25*n-10)*n-55; if(v >= 7) r -= 36; } return r; }
  function dataCw(v){ return Math.floor(rawModules(v)/8) - ECC[v]*BLK[v]; }
  function mul(x, y){ let z = 0; for(let i = 7; i >= 0; i--){ z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z & 255; }
  function divisor(d){ const r = new Array(d).fill(0); r[d-1] = 1; let root = 1; for(let i = 0; i < d; i++){ for(let j = 0; j < d; j++){ r[j] = mul(r[j], root); if(j+1 < d) r[j] ^= r[j+1]; } root = mul(root, 2); } return r; }
  function remainder(data, div){ const r = div.map(() => 0); for(const b of data){ const f = b ^ r.shift(); r.push(0); div.forEach((c, i) => r[i] ^= mul(c, f)); } return r; }
  function alignPos(v){ if(v === 1) return []; const n = Math.floor(v/7)+2, step = Math.ceil((v*4+4)/(n*2-2))*2, out = [6]; for(let i = n-1, p = v*4+10; out.length < n; i--, p -= step) out.splice(1, 0, p); return out; }
  window.qrMatrix = function(text){
    const bytes = Array.from(new TextEncoder().encode(text));
    let v = 1; while(v <= 9 && 4 + 8 + bytes.length*8 > dataCw(v)*8) v++;
    if(v > 9) throw new Error("Text too long for QR");
    const cap = dataCw(v)*8, bits = [];
    const put = (val, len) => { for(let i = len-1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(4, 4); put(bytes.length, 8); bytes.forEach(b => put(b, 8));
    put(0, Math.min(4, cap - bits.length)); put(0, (8 - bits.length % 8) % 8);
    for(let p = 0xEC; bits.length < cap; p ^= 0xEC ^ 0x11) put(p, 8);
    const data = []; for(let i = 0; i < bits.length; i += 8){ let b = 0; for(let j = 0; j < 8; j++) b = (b << 1) | bits[i+j]; data.push(b); }
    const nb = BLK[v], ecl = ECC[v], raw = Math.floor(rawModules(v)/8), nShort = nb - raw % nb, shortLen = Math.floor(raw/nb), div = divisor(ecl), blocks = [];
    for(let i = 0, k = 0; i < nb; i++){ const dat = data.slice(k, k + shortLen - ecl + (i < nShort ? 0 : 1)); k += dat.length; const e = remainder(dat, div); if(i < nShort) dat.push(0); blocks.push(dat.concat(e)); }
    const all = []; for(let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => { if(i !== shortLen - ecl || j >= nShort) all.push(b[i]); });
    const size = v*4+17, m = [...Array(size)].map(() => Array(size).fill(false)), fn = [...Array(size)].map(() => Array(size).fill(false));
    const set = (x, y, d) => { m[y][x] = d; fn[y][x] = true; };
    for(let i = 0; i < size; i++){ set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    const finder = (cx, cy) => { for(let dy = -4; dy <= 4; dy++) for(let dx = -4; dx <= 4; dx++){ const d = Math.max(Math.abs(dx), Math.abs(dy)), x = cx+dx, y = cy+dy; if(x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4); } };
    finder(3, 3); finder(size-4, 3); finder(3, size-4);
    const al = alignPos(v); al.forEach((a, i) => al.forEach((b, j) => { if((i === 0 && j === 0) || (i === 0 && j === al.length-1) || (i === al.length-1 && j === 0)) return; for(let dy = -2; dy <= 2; dy++) for(let dx = -2; dx <= 2; dx++) set(a+dx, b+dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }));
    const fmt = mask => { const d = (0 << 3) | mask; let r = d; for(let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537); const b = ((d << 10) | r) ^ 0x5412, g = i => ((b >>> i) & 1) === 1;
      for(let i = 0; i <= 5; i++) set(8, i, g(i)); set(8, 7, g(6)); set(8, 8, g(7)); set(7, 8, g(8)); for(let i = 9; i < 15; i++) set(14-i, 8, g(i));
      for(let i = 0; i < 8; i++) set(size-1-i, 8, g(i)); for(let i = 8; i < 15; i++) set(8, size-15+i, g(i)); set(8, size-8, true); };
    fmt(0);
    if(v >= 7){ let r = v; for(let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1F25); const b = (v << 12) | r; for(let i = 0; i < 18; i++){ const bit = ((b >>> i) & 1) === 1, a = size-11+i%3, c = Math.floor(i/3); set(a, c, bit); set(c, a, bit); } }
    let i = 0;
    for(let right = size-1; right >= 1; right -= 2){ if(right === 6) right = 5; for(let vert = 0; vert < size; vert++) for(let j = 0; j < 2; j++){ const x = right-j, up = ((right+1) & 2) === 0, y = up ? size-1-vert : vert; if(!fn[y][x] && i < all.length*8){ m[y][x] = ((all[i >>> 3] >>> (7-(i & 7))) & 1) === 1; i++; } } }
    const MASK = 2; for(let y = 0; y < size; y++) for(let x = 0; x < size; x++) if(!fn[y][x] && x % 3 === 0) m[y][x] = !m[y][x];
    fmt(MASK);
    return m;
  };
  window.qrSVG = function(text, px){ const m = qrMatrix(text), n = m.length, q = 4; let d = ""; m.forEach((row, y) => row.forEach((on, x) => { if(on) d += `M${x+q},${y+q}h1v1h-1z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n+q*2} ${n+q*2}" width="${px||120}" height="${px||120}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`; };
})();
