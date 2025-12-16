import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Br3achLogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
}

export const Br3achLogo: React.FC<Br3achLogoProps> = ({
  size = 'medium',
}) => {
  const dimensions = {
    small: { height: 20 },
    medium: { height: 30 },
    large: { height: 40 },
    hero: { height: 60 },
  };

  const { height } = dimensions[size];

  return (
    <Image
      source={require('@/assets/images/br3ach_logo.png')}
      style={{ height, width: height * 4 }}
      resizeMode="contain"
    />
  );
};

export default Br3achLogo;
