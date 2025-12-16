import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface ServerCardProps {
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  isSelected?: boolean;
  isPremium?: boolean;
  onPress: () => void;
}

export const ServerCard: React.FC<ServerCardProps> = ({
  name,
  country,
  flag,
  ping,
  load,
  isSelected = false,
  isPremium = false,
  onPress,
}) => {
  const getLoadColor = () => {
    if (load < 50) return Colors.success;
    if (load < 80) return Colors.warning;
    return Colors.error;
  };

  const getPingQuality = () => {
    if (ping < 50) return { label: 'Excellent', color: Colors.success };
    if (ping < 100) return { label: 'Good', color: Colors.accent };
    if (ping < 200) return { label: 'Fair', color: Colors.warning };
    return { label: 'Poor', color: Colors.error };
  };

  const pingQuality = getPingQuality();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{flag}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={10} color={Colors.warning} />
              <Text style={styles.premiumText}>PRO</Text>
            </View>
          )}
        </View>
        <Text style={styles.country}>{country}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{ping}ms</Text>
          <View style={[styles.qualityDot, { backgroundColor: pingQuality.color }]} />
        </View>
        <View style={styles.loadBar}>
          <View
            style={[
              styles.loadFill,
              { width: `${load}%`, backgroundColor: getLoadColor() },
            ]}
          />
        </View>
      </View>

      {isSelected && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.small,
  },
  cardSelected: {
    borderColor: Colors.success,
    backgroundColor: `${Colors.success}10`,
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  flag: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: `${Colors.warning}20`,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  premiumText: {
    color: Colors.warning,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  country: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  stats: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  qualityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  loadBar: {
    width: 60,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadFill: {
    height: '100%',
    borderRadius: 2,
  },
  checkmark: {
    marginLeft: Spacing.sm,
  },
});

export default ServerCard;
