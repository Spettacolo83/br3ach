import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

type StatusType = 'protected' | 'warning' | 'danger' | 'inactive' | 'scanning';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showIcon = true,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'protected':
        return {
          color: Colors.success,
          bgColor: `${Colors.success}20`,
          icon: 'shield-checkmark' as const,
          defaultLabel: 'Protetto',
        };
      case 'warning':
        return {
          color: Colors.warning,
          bgColor: `${Colors.warning}20`,
          icon: 'warning' as const,
          defaultLabel: 'Attenzione',
        };
      case 'danger':
        return {
          color: Colors.error,
          bgColor: `${Colors.error}20`,
          icon: 'alert-circle' as const,
          defaultLabel: 'A Rischio',
        };
      case 'scanning':
        return {
          color: Colors.accent,
          bgColor: `${Colors.accent}20`,
          icon: 'scan' as const,
          defaultLabel: 'Scansione...',
        };
      case 'inactive':
      default:
        return {
          color: Colors.textMuted,
          bgColor: `${Colors.textMuted}20`,
          icon: 'ellipse-outline' as const,
          defaultLabel: 'Inattivo',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bgColor }]}>
      {showIcon && (
        <Ionicons name={config.icon} size={14} color={config.color} />
      )}
      <Text style={[styles.label, { color: config.color }]}>
        {label || config.defaultLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
});

export default StatusBadge;
