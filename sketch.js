// 🧺 Was-hulp voor de Zielige Man
// p5.js interactieve waskaart voor de compleet overweldigde man

'use strict';

// ─── Wasdata ─────────────────────────────────────────────────────────────────
const WASH_DATA = {
  sokken: {
    name: 'Sokken', icon: '🧦',
    temp: 60, program: 'Katoen 60°C',
    soap: '35 ml — 1 volle dop',
    drying: '✅ Droger mag  |  hangend drogen mag ook',
    withWhat: 'Ondergoed, andere sokken (zelfde kleur!)',
    notWith: 'Truien, spijkerbroeken',
    colorTip: 'Wit bij wit · Donker bij donker · Kleur bij kleur',
    funFact: '"Er gaat er altijd eentje verloren. Dat is normaal. Accepteer het."',
    mood: 'confused'
  },
  tshirt: {
    name: 'T-shirt', icon: '👕',
    temp: 40, program: 'Synthetisch 40°C',
    soap: '35 ml — 1 volle dop',
    drying: '⚠️ NIET in de droger!  |  Hangend drogen',
    withWhat: 'Broeken, ondergoed (zelfde kleur)',
    notWith: 'Truien, handdoeken',
    colorTip: 'Wit bij wit · Kleur bij kleur · NOOIT mengen!',
    funFact: '"Eerst controleren op vlekken. Ja, die ene ook."',
    mood: 'sad'
  },
  trui: {
    name: 'Trui', icon: '🧥',
    temp: 30, program: 'Fijn / Handwas 30°C',
    soap: '20 ml — fijn wasmiddel!!',
    drying: '🚨 PLAT DROGEN op handdoek  ·  GEEN droger  ·  GEEN hanger',
    withWhat: 'Andere fijne was op 30°C',
    notWith: 'ALLES. Serieus. Alles. Altijd apart.',
    colorTip: 'Altijd apart of met gelijkaardig fijn goed',
    funFact: '"Trui in de droger = trui voor je hamster."',
    mood: 'crying'
  },
  broek: {
    name: 'Broek', icon: '👖',
    temp: 40, program: 'Synthetisch 40°C',
    soap: '35 ml — 1 volle dop',
    drying: '⚠️ Hangend drogen  |  droger = krimpen',
    withWhat: 'T-shirts, sokken (zelfde kleur)',
    notWith: 'Truien, handdoeken',
    colorTip: 'Donker bij donker · Kleur bij kleur',
    funFact: '"LEEG DE ZAKKEN. Dat meen ik. Nu meteen."',
    mood: 'confused'
  },
  jeans: {
    name: 'Spijkerbroek', icon: '🩳',
    temp: 30, program: 'Jeans / Donker 30°C',
    soap: '35 ml — binnenstebuiten wassen!',
    drying: '🚨 ALTIJD hangend drogen  ·  nooit droger',
    withWhat: 'Donkere sokken, donkere t-shirts',
    notWith: 'Witte of lichte kleding — roze gaat het worden',
    colorTip: 'Alleen met donker goed · Nooit met wit!',
    funFact: '"Één jeans + één wit shirt = roze shirt voor eeuwig."',
    mood: 'crying'
  },
  ondergoed: {
    name: 'Ondergoed', icon: '🩲',
    temp: 60, program: 'Katoen 60°C',
    soap: '35 ml — 1 volle dop',
    drying: '✅ Droger mag  |  hangend drogen',
    withWhat: 'Sokken, handdoeken (zelfde kleur)',
    notWith: 'Truien, jeans, gekleurde items bij wit',
    colorTip: 'Wit bij wit · Donker bij donker',
    funFact: '"60 graden. Hygiëne is geen discussiepunt."',
    mood: 'sad'
  },
  handdoek: {
    name: 'Handdoek', icon: '🏊',
    temp: 60, program: 'Katoen 60°C',
    soap: '50 ml — iets meer dan normaal',
    drying: '✅ Droger OK — worden er zachter van!',
    withWhat: 'Sokken, ondergoed',
    notWith: 'T-shirts, truien, spijkerbroeken',
    colorTip: 'Wit bij wit · Kleur bij kleur',
    funFact: '"Geen wasverzachter! Dat vernietigt de absorptie."',
    mood: 'confused'
  }
};

const ITEM_KEYS = Object.keys(WASH_DATA);

// ─── State ────────────────────────────────────────────────────────────────────
let screenState = 'home'; // home | detail | mama
let currentItem = null;
let rainDrops = [];
let bubbles = [];
let mamaFrame = 0;
let tearY1 = 0, tearY2 = 0;
let heartParticles = [];
let titleWobble = 0;

// ─── Setup ────────────────────────────────────────────────────────────────────
function setup() {
  let cnv = createCanvas(820, 580);
  cnv.parent('canvas-container');
  textFont('Georgia');

  for (let i = 0; i < 90; i++) {
    rainDrops.push({
      x: random(width),
      y: random(height),
      spd: random(3, 9),
      len: random(8, 22),
      a: random(60, 140)
    });
  }
}

// ─── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  background(10, 18, 35);
  drawRain();

  if (screenState === 'home')   drawHome();
  else if (screenState === 'detail') drawDetail();
  else if (screenState === 'mama')   drawMama();

  drawItemBar();
  drawMamaButton();
}

// ─── Rain ─────────────────────────────────────────────────────────────────────
function drawRain() {
  for (let r of rainDrops) {
    stroke(80, 120, 210, r.a);
    strokeWeight(1);
    line(r.x, r.y, r.x - 1, r.y + r.len);
    r.y += r.spd;
    if (r.y > height) { r.y = -20; r.x = random(width); }
  }
  noStroke();
}

// ─── Home screen ─────────────────────────────────────────────────────────────
function drawHome() {
  titleWobble += 0.04;

  // Title
  fill(190, 215, 255);
  noStroke();
  textAlign(CENTER);
  textSize(26);
  text('🧺 Was-hulp voor de Zielige Man 🧺', width / 2, 48 + sin(titleWobble) * 2);

  textSize(13);
  fill(90, 120, 180);
  text('"Ik weet niet wat ik doe en dat is oké... nee het is niet oké"', width / 2, 75);

  // Sad man in centre
  drawSadMan(width / 2, 250, 'sad', 1.15);

  // Instruction
  textSize(14);
  fill(140, 170, 230);
  textAlign(CENTER);
  text('⬇  Tik op een kledingstuk voor was-instructies  ⬇', width / 2, 390);
}

// ─── Detail screen ────────────────────────────────────────────────────────────
function drawDetail() {
  if (!currentItem) return;
  const d = WASH_DATA[currentItem];

  // Header
  noStroke();
  fill(210, 230, 255);
  textAlign(CENTER);
  textSize(22);
  text(d.icon + '  ' + d.name, width / 2, 38);

  // Sad man on right
  drawSadMan(720, 195, d.mood, 0.85);

  // Speech bubble from man
  drawSpeechBubble(620, 80, getMoodText(d.mood));

  // Info card
  drawInfoCard(18, 55, 590, 300, d);

  // Tips strip
  fill(255, 200, 80, 220);
  textAlign(CENTER);
  textSize(12);
  text('💡 ' + d.funFact, width / 2 - 40, 385);

  // Colour groups
  noStroke();
  fill(20, 38, 72, 220);
  stroke(60, 90, 170, 120);
  strokeWeight(1);
  rect(18, 395, 590, 42, 8);
  noStroke();
  fill(160, 200, 255);
  textAlign(LEFT);
  textSize(12);
  text('🎨  Kleur tip:  ', 30, 420);
  fill(230, 245, 255);
  text(d.colorTip, 120, 420);

  // Back button
  drawButton(18, 448, 110, 34, '← Terug');
}

function getMoodText(mood) {
  if (mood === 'crying')   return '"Ik ga dit nooit leren..."';
  if (mood === 'confused') return '"Maar hoe dan?!"';
  return '"Dit had ik al moeten weten..."';
}

// ─── Info card ────────────────────────────────────────────────────────────────
function drawInfoCard(x, y, w, h, d) {
  fill(15, 28, 58, 230);
  stroke(50, 80, 170, 140);
  strokeWeight(1);
  rect(x, y, w, h, 10);
  noStroke();

  const rows = [
    { icon: '🌡️', label: 'Temperatuur', val: d.temp + '°C' },
    { icon: '🔄', label: 'Programma',   val: d.program },
    { icon: '🧴', label: 'Wasmiddel',   val: d.soap },
    { icon: '💨', label: 'Drogen',      val: d.drying },
    { icon: '✅', label: 'Mag samen',   val: d.withWhat },
    { icon: '❌', label: 'Nooit samen', val: d.notWith },
  ];

  let iy = y + 26;
  const rowH = 44;
  textAlign(LEFT);

  for (let r of rows) {
    fill(100, 135, 220);
    textSize(12);
    text(r.icon + ' ' + r.label + ':', x + 12, iy);

    fill(225, 238, 255);
    textSize(11.5);
    drawWrappedText(r.val, x + 155, iy, w - 170);
    iy += rowH;
  }
}

function drawWrappedText(txt, x, y, maxW) {
  // Simple word-wrap
  const words = txt.split(' ');
  let line = '';
  let ly = y;
  for (let w of words) {
    const test = line + w + ' ';
    if (textWidth(test) > maxW && line !== '') {
      text(line.trim(), x, ly);
      line = w + ' ';
      ly += 14;
    } else {
      line = test;
    }
  }
  if (line.trim()) text(line.trim(), x, ly);
}

// ─── Speech bubble ────────────────────────────────────────────────────────────
function drawSpeechBubble(x, y, msg) {
  const bw = 175, bh = 42;
  fill(255, 255, 255, 200);
  stroke(160, 180, 240);
  strokeWeight(1);
  rect(x - bw, y, bw, bh, 10);
  // Tail
  noStroke();
  triangle(x - 25, y + bh, x - 8, y + bh, x, y + bh + 12);
  fill(40, 40, 60);
  noStroke();
  textSize(11);
  textAlign(CENTER);
  text(msg, x - bw / 2, y + bh / 2 + 4);
}

// ─── Mama screen ──────────────────────────────────────────────────────────────
function drawMama() {
  mamaFrame++;
  const pulse = sin(mamaFrame * 0.12) * 8;

  noStroke();
  textAlign(CENTER);
  textSize(90 + pulse);
  text('📱', width / 2, height / 2 - 40);

  textSize(22);
  fill(255, 180, 180);
  text('Je belt mama...', width / 2, height / 2 + 40);

  textSize(13);
  fill(150, 180, 240);
  const dots = '.'.repeat(floor(mamaFrame / 18) % 4);
  text('Verbinden' + dots, width / 2, height / 2 + 68);

  textSize(16);
  fill(255, 220, 100);
  text('"Lieverd, doe je het op 40 graden, dan komt het goed!"', width / 2, height / 2 + 106);

  textSize(12);
  fill(120, 150, 200);
  text('"En leeg je zakken een volgende keer, schatje."', width / 2, height / 2 + 132);

  drawButton(width / 2 - 65, height - 68, 130, 34, '← Ophangen 😢');
}

// ─── Sad man ──────────────────────────────────────────────────────────────────
function drawSadMan(cx, cy, mood, sc) {
  sc = sc || 1;
  push();
  translate(cx, cy);
  scale(sc);

  // Body / shirt (blue, sad)
  const shirtClr = mood === 'crying' ? [55, 65, 130] : [70, 80, 150];
  fill(...shirtClr);
  noStroke();
  rect(-22, -28, 44, 56, 6);

  // Neck
  fill(215, 175, 140);
  rect(-8, -38, 16, 16, 3);

  // Head
  fill(215, 175, 140);
  ellipse(0, -65, 62, 62);

  // Messy hair
  fill(70, 45, 25);
  arc(0, -78, 64, 42, PI, TWO_PI);
  ellipse(-24, -74, 14, 24);
  ellipse(24, -74, 14, 24);
  // Cowlick
  ellipse(8, -95, 10, 18);

  // Eyes
  if (mood === 'crying') {
    stroke(55, 55, 70);
    strokeWeight(2.5);
    line(-15, -68, -9, -62);
    line(-9, -68, -15, -62);
    line(9, -68, 15, -62);
    line(15, -68, 9, -62);
    noStroke();
    fill(100, 155, 255, 200);
    ellipse(-12, -55, 5, 11);
    ellipse(12, -55, 5, 11);
    fill(100, 155, 255, 130);
    ellipse(-12, -44, 5, 11);
    ellipse(12, -44, 5, 11);
  } else {
    noStroke();
    fill(45, 45, 55);
    let eyeH = (mood === 'confused') ? 11 : 7;
    ellipse(-13, -65, 9, eyeH);
    ellipse(13, -65, 9, eyeH);
    // Pupils
    fill(20, 20, 30);
    ellipse(-13, -65, 5, 5);
    ellipse(13, -65, 5, 5);
  }

  // Eyebrows (sad / confused)
  stroke(70, 45, 25);
  strokeWeight(2);
  if (mood === 'confused') {
    line(-18, -75, -8, -78);
    line(8, -78, 18, -75);
  } else {
    line(-18, -76, -8, -72);
    line(8, -72, 18, -76);
  }
  noStroke();

  // Mouth
  noFill();
  stroke(110, 65, 65);
  strokeWeight(2.5);
  if (mood === 'crying') {
    arc(0, -50, 24, 16, 0, PI);
  } else {
    arc(0, -47, 24, 14, PI, TWO_PI);
  }
  noStroke();

  // Question mark for confused
  if (mood === 'confused') {
    fill(255, 215, 50);
    textSize(22);
    textAlign(CENTER);
    text('?', 32, -85);
  }

  // Arms
  stroke(215, 175, 140);
  strokeWeight(9);
  if (mood === 'sad') {
    line(-22, -18, -50, 12);
    line(22, -18, 50, 12);
  } else if (mood === 'confused') {
    line(-22, -18, -52, -42);
    line(22, -18, 52, 12);
  } else {
    line(-22, -18, -35, 32);
    line(22, -18, 35, 32);
  }
  noStroke();

  // Pants
  fill(45, 55, 85);
  rect(-20, 28, 18, 36, 4);
  rect(2, 28, 18, 36, 4);

  // Shoes
  fill(35, 30, 28);
  ellipse(-11, 68, 22, 10);
  ellipse(11, 68, 22, 10);

  pop();
}

// ─── Item bar ─────────────────────────────────────────────────────────────────
const BTN_W = 102, BTN_H = 82, BTN_Y = 492;

function itemBtnRects() {
  const total = ITEM_KEYS.length;
  const gap = 6;
  const startX = (width - total * (BTN_W + gap)) / 2;
  return ITEM_KEYS.map((key, i) => ({
    key,
    x: startX + i * (BTN_W + gap),
    y: BTN_Y,
    w: BTN_W,
    h: BTN_H
  }));
}

function drawItemBar() {
  // Separator
  stroke(40, 60, 120, 180);
  strokeWeight(1);
  line(0, BTN_Y - 8, width, BTN_Y - 8);
  noStroke();

  const btns = itemBtnRects();
  for (let btn of btns) {
    const hov = isHover(btn.x, btn.y, btn.w, btn.h);
    const sel = currentItem === btn.key;

    if (sel)       fill(55, 88, 190);
    else if (hov)  fill(38, 62, 140);
    else           fill(20, 34, 72);

    stroke(sel ? [115, 155, 255] : [50, 75, 145]);
    strokeWeight(sel ? 2 : 1);
    rect(btn.x, btn.y, btn.w, btn.h, 10);

    noStroke();
    textAlign(CENTER);
    textSize(sel ? 30 : 26);
    text(WASH_DATA[btn.key].icon, btn.x + btn.w / 2, btn.y + 36);

    fill(sel ? 255 : 170);
    textSize(10);
    text(WASH_DATA[btn.key].name, btn.x + btn.w / 2, btn.y + 62);
  }
}

// ─── Mama button ──────────────────────────────────────────────────────────────
const MAMA_BTN = { x: 680, y: 450, w: 130, h: 36 };

function drawMamaButton() {
  const hov = isHover(MAMA_BTN.x, MAMA_BTN.y, MAMA_BTN.w, MAMA_BTN.h);
  fill(hov ? [210, 35, 35] : [160, 18, 18]);
  stroke(255, 90, 90);
  strokeWeight(1);
  rect(MAMA_BTN.x, MAMA_BTN.y, MAMA_BTN.w, MAMA_BTN.h, 8);
  noStroke();
  fill(255, 195, 195);
  textAlign(CENTER);
  textSize(12.5);
  text('🚨 Bel Mama', MAMA_BTN.x + MAMA_BTN.w / 2, MAMA_BTN.y + 23);
}

// ─── Generic button ───────────────────────────────────────────────────────────
function drawButton(x, y, w, h, lbl) {
  const hov = isHover(x, y, w, h);
  fill(hov ? [48, 78, 165] : [28, 52, 120]);
  stroke(75, 105, 200);
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();
  fill(195, 218, 255);
  textAlign(CENTER);
  textSize(12);
  text(lbl, x + w / 2, y + h / 2 + 4);
}

// ─── Mouse ────────────────────────────────────────────────────────────────────
function mousePressed() {
  // Mama button
  if (isHover(MAMA_BTN.x, MAMA_BTN.y, MAMA_BTN.w, MAMA_BTN.h)) {
    screenState = 'mama';
    mamaFrame = 0;
    return;
  }

  // Back from mama
  if (screenState === 'mama') {
    if (isHover(width / 2 - 65, height - 68, 130, 34)) {
      screenState = currentItem ? 'detail' : 'home';
      return;
    }
  }

  // Back from detail
  if (screenState === 'detail') {
    if (isHover(18, 448, 110, 34)) {
      screenState = 'home';
      currentItem = null;
      return;
    }
  }

  // Item bar
  const btns = itemBtnRects();
  for (let btn of btns) {
    if (isHover(btn.x, btn.y, btn.w, btn.h)) {
      currentItem = btn.key;
      screenState = 'detail';
      return;
    }
  }
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function mouseMoved() {
  const btns = itemBtnRects();
  const overBtn = btns.some(b => isHover(b.x, b.y, b.w, b.h))
    || isHover(MAMA_BTN.x, MAMA_BTN.y, MAMA_BTN.w, MAMA_BTN.h)
    || (screenState === 'detail' && isHover(18, 448, 110, 34))
    || (screenState === 'mama' && isHover(width / 2 - 65, height - 68, 130, 34));
  cursor(overBtn ? HAND : ARROW);
}

// ─── Util ─────────────────────────────────────────────────────────────────────
function isHover(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}
