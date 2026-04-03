// ─── Google Drive image CDN helper ───────────────────────────────────────────
// All images served via Google's CDN — public sharing must be enabled on the folder
const gd = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

// ─── IMAGE REGISTRY ───────────────────────────────────────────────────────────
export const IMAGES = {
  // ── NORTHERN LIGHTS (Finland / Scandinavia) ──
  auroraRoad:     gd('1KwlXpresSSRcZ_MqE6SSReeGTcsLkiWs'), // LOV05260 – person on road under aurora
  auroraArms:     gd('1ENv8aTZuzHE4IRY-Xh0mJjPCUY1fdvaS'), // LOV05243 – arms open under aurora
  auroraWide:     gd('1Np_U0wfcJICEFEQBcHqcbfSl1V-LYFic'), // LOV05236 – wide aurora shot
  aurora4:        gd('10mFJUnNd6nKIhYQGE31NTT7v7KOHjKb3'), // LOV05235 – aurora closeup

  // ── DESERT / MIDDLE EAST ──
  desertHelmet:   gd('1OyRCYo8ijd-wKas8EWuoKxy8V3cmM18B'), // motorbike helmet in desert
  desertSand:     gd('17XdO2AHHnwyeynEEK56Mexdg2fvkG14M'), // sandy desert selfie
  desertArab:     gd('1ZyztY1zN2M2YYUlQ0PS-fggIXPbyy3G5'), // traditional Arab dress
  desertArab2:    gd('1QDbkigat_VEDiRZHabBZRkanZKuzPANo'), // Arab dress wide shot
  hotAirBalloon:  gd('1f71uSf1CBXhjQutcqyXsYr36sJn3SR_8'), // hot air balloon

  // ── MECCA / SAUDI ARABIA ──
  mecca1:         gd('1cT0ACmlKDAGWaOmA0jmI5QTwxVuvXkkz'), // Mecca pilgrimage white
  mecca2:         gd('1bVXDpwaSCMq7ES7rKGDqPLoJBrX9ad9K'), // Kaaba wide shot

  // ── SCANDINAVIA / ARCTIC ──
  reindeer:       gd('1or0PxEAuFBMfjuFq5IFR9XncT6abolzY'), // reindeer Lapland
  arcticHat:      gd('1EjmPlIV1dL6-YB_Uu3BLZpyQG7K9atvj'), // arctic selfie with hat
  arcticSnow:     gd('1DK74bk-qvg1QEqM7tof0-de87FyI3lvR'), // snowy scene

  // ── FJORDS / NORWAY ──
  fjord1:         gd('16_jdiGl-25ht_M2td7OZARCmnar7_YH6'), // green fjord canyon
  fjord2:         gd('1z85SH5Bt1UzlgI8WhRM6-JO0JMfQ0-Aa'), // narrow fjord/canyon

  // ── EUROPE – VIENNA ──
  viennaGold:     gd('1JVkky_SBGleTgxHtN6hPRR9aJOdX_d3w'), // Vienna golden Hofburg statue
  viennaCathedral:gd('1K9yE8w3eV2EGK76NiVXs_HfZbK0Z0zC4'), // Stephansdom cathedral
  viennaPalace:   gd('1kFnjcU1oG-miWyKSCV6DPm_VIPlmeV09'), // Kunsthistorisches Museum

  // ── EUROPE – GENERAL ──
  copenhagen:     gd('1ifybPMvRl9NCOiR3KcdpOnbBFoIfEKh1'), // Copenhagen Nyhavn harbor
  colorBuildings: gd('1VK-7kYbpCKPsL9guzrFhyRYReuZHQ8Es'), // colorful European buildings
  oldTown:        gd('1wsCpZ39vgo98FIAPXY9yb-k2uexiISXz'), // European old town
  churchTower:    gd('1i_oyQjBMj1-kgOLywfRUhxFie5_aA3jY'), // church clock tower
  greenPark:      gd('1xOWTmGs7VYh8vBVgyNqt8k48PP7mD62H'), // European park monument
  colorMarket:    gd('10NPG8R1Y3wrQvudmJTom8VXTTDwIrEtP'), // colorful street market umbrellas

  // ── MEDITERRANEAN / ASIA ──
  whiteMedi:      gd('1kyf3eTt1x0WEKCNZyH-ZxgVUYvsE_AFT'), // white Mediterranean architecture
  bookshop:       gd('1nipXKqGT-SPiaWkHT2F3XW_1BD1O0Sos'), // Mediterranean bookstore
  waterfall:      gd('1a4DDI8AeHf3QKa2WXFpbI-hx4tlNSshE'), // waterfall selfie

  // ── CITY BY NIGHT / MISC ──
  cityNight:      gd('1IyuepPrl8oGkUi16yfvCV3eCS6ZzMpEo'), // city at night with lights
  ferrisPool:     gd('1SOmMpvNnrvw0NMuZdj4Lcr4zJH6gQ4WX'), // ferris wheel + pool
  lasVegas:       gd('1sCYi6uSwKx9P8yfO7j-LrHMPAknu0w3n'), // Las Vegas signs
  cityBridge:     gd('1wL0E6KZ374OkMZgdB1JTKEn0Wz90K42Y'), // city view with bridge

  // ── SPORTS / QATAR ──
  stadium1:       gd('1BmsK7khi6b7_sHWwml-jNyHu1o535ITp'), // Qatar stadium exterior
  stadium2:       gd('14UmemYxZJX6iw9k05GBbVFx41CfQSNQL'), // stadium interior
  tentMarket:     gd('1-Bq-P2HcXp4yrAi6il3A5jYV7aqQ77gb'), // colorful tent/market

  // ── AVIATION ──
  airplane1:      gd('16kjyX1YuoC83QRZGYppzOkOykyKSdto-'), // plane flying overhead
  airplane2:      gd('1NbTIRiG0-IAx7cjnu_Ov49OQrtNt4oqq'), // plane with person (St Maarten style)
  airportSelfie:  gd('1PEevkAVJg8_2Pz6v4VzU2FY8k6tj-a3F'), // airport / pink plane

  // ── ZERO BUDGET STORY ──
  budgetRoom:     gd('1EiOW7-dce4FCuwhuVtXU6wu0ZwmDKobj'), // simple room with old CRT TV ← zero budget
  budgetSelfie:   gd('1GycQHLBa5tRAFfUPuEdgLcBpcTcGb49k'), // dark city night selfie

  // ── UGANDA INCIDENT ──
  ugandaHospital: gd('1rpQWljiVYSquIhEVCsIumhtgIDKS4KcJ'), // hospital bed Uganda
  ugandaHospital2:gd('1BVHMEsN78x-LPC-FQzGxBtCtJY-c1DnS'), // hospital/medical

  // ── WOODEN / CAVE INTERIORS (Caveman story) ──
  woodenInterior: gd('1C3R7JfcHDEcfECJF4GG-kL30S6nIVa-0'), // ornate wooden interior
  caveInterior:   gd('1OoTX16a1EWa8X89pa8z5IvTmILKx13PI'), // wooden cave-like
  tallShip:       gd('1q5slPpQd1XYbtkumdOKPYsIzBIXi6aO3'), // tall sailing ship

  // ── PORTRAIT / MISC ──
  outdoorRed:     gd('1KgstLau8evv4BBRom-aKOeLjt99OxLRQ'), // outdoor red outfit
  screenshot:     gd('12dBy1NEfG09SB4Ji4lm2oZgwuHPkjlSp'), // screenshot gallery
};
