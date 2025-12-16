// Br3ach Brand Theme
// "Your daily digital security"

export const Colors = {
  // Primary brand colors
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#5046E5',

  // Background colors (Dark theme)
  background: '#0F0E17',
  backgroundSecondary: '#1A1A2E',
  backgroundTertiary: '#232340',
  card: '#1E1E32',

  // Accent colors
  accent: '#00D9FF',
  accentGreen: '#00FF88',
  accentPink: '#E94560',
  accentOrange: '#FF6B35',

  // Status colors
  success: '#00FF88',
  warning: '#FFB800',
  error: '#FF4757',
  info: '#00D9FF',

  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  textMuted: '#6B6B80',
  textDisabled: '#4A4A5A',

  // Border colors
  border: '#2A2A40',
  borderLight: '#3A3A50',

  // Gradient colors
  gradientPrimary: ['#6C63FF', '#00D9FF'],
  gradientSuccess: ['#00FF88', '#00D9FF'],
  gradientDanger: ['#E94560', '#FF6B35'],
  gradientDark: ['#1A1A2E', '#0F0E17'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadow = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
};

export default {
  Colors,
  Spacing,
  FontSize,
  BorderRadius,
  Shadow,
};
