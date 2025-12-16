import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface SecurityScoreProps {
  score: number; // 0-100
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

export const SecurityScore: React.FC<SecurityScoreProps> = ({
  score,
  label = 'Punteggio Sicurezza',
  size = 'large',
}) => {
  const dimensions = {
    small: { size: 100, stroke: 8, fontSize: 24 },
    medium: { size: 150, stroke: 10, fontSize: 32 },
    large: { size: 200, stroke: 12, fontSize: 48 },
  };

  const { size: circleSize, stroke, fontSize } = dimensions[size];
  const radius = (circleSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return Colors.success;
    if (score >= 60) return Colors.accent;
    if (score >= 40) return Colors.warning;
    return Colors.error;
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Eccellente';
    if (score >= 60) return 'Buono';
    if (score >= 40) return 'Discreto';
    return 'A Rischio';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.scoreContainer, { width: circleSize, height: circleSize }]}>
        <Svg width={circleSize} height={circleSize} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={Colors.border}
            strokeWidth={stroke}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={getScoreColor()}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          />
        </Svg>
        <View style={styles.scoreTextContainer}>
          <Text style={[styles.scoreNumber, { fontSize }]}>{score}</Text>
          <Text style={styles.scoreStatus}>{getScoreLabel()}</Text>
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scoreContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  scoreTextContainer: {
    alignItems: 'center',
  },
  scoreNumber: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  scoreStatus: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.md,
  },
});

export default SecurityScore;
