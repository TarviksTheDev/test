import { pxToRem, responsiveFontSizes } from '../Utils/getFontValue';

// ----------------------------------------------------------------------

const FONT_PRIMARY = 'Plus Jakarta Sans, sans-serif'; // Custom Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 750,
    fontSize: pxToRem(18),
    lineHeight: 80 / 70,
    ...responsiveFontSizes({ sm: 12, md: 15, lg: 18 }),
  },
  h3: {
    fontSize: pxToRem(15),
    ...responsiveFontSizes({ sm: 12, md: 14, lg: 15 }),
  },
  h4: {
    // fontWeight: 'bold',
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
  },
  h5: {
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 700,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(12),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontWeight: 600,
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
  article: {
    fontWeight: 700,
  },
};

export default typography;
