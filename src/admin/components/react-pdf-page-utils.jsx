// react-pdf-page-utils.ts

/** Convert millimeters to PDF points (1 pt = 1/72 in, 1 in = 25.4 mm) */
export const mm2pt = (mm) => (mm * 72) / 25.4;

/** Predefined standard page sizes in points */
export const PageSizes = {
  /* ISO A‑series */
  A0: [mm2pt(841), mm2pt(1189)] ,
  A1: [mm2pt(594), mm2pt(841)] ,
  A2: [mm2pt(420), mm2pt(594)] ,
  A3: [mm2pt(297), mm2pt(420)] ,
  A4: [mm2pt(210), mm2pt(297)] ,
  A5: [mm2pt(148), mm2pt(210)] ,
  A6: [mm2pt(105), mm2pt(148)] ,

  /* US Letter & Legal */
  LETTER: [mm2pt(216), mm2pt(279)] ,
  LEGAL:  [mm2pt(216), mm2pt(356)] ,

  /* ID‑1 (Passport‑card & CR‑80 credit card) */
  PASSPORT_CARD: [mm2pt(85.60), mm2pt(53.98)] ,
  CR80:           [mm2pt(85.60), mm2pt(53.98)] ,

  /* Business card (ISO 7810 ID‑3 ~ 88.9×50.8 mm) */
  BUSINESS_CARD:  [mm2pt(88.9), mm2pt(50.8)] ,
};

/**
 * For any custom width/height in mm, returns [widthPt, heightPt]
 * @param widthMm  width in millimeters
 * @param heightMm height in millimeters
 */
export const getPageSize = (
  widthMm,
  heightMm
) => [mm2pt(widthMm), mm2pt(heightMm)];

/**
 * Swap width and height for landscape orientation
 * @param size [widthPt, heightPt]
 */
export const landscape = ([w, h]) => [h, w];
