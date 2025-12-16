import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface VPNToggleProps {
  isConnected: boolean;
  isConnecting?: boolean;
  onToggle: () => void;
  serverLocation?: string;
  serverFlag?: string;
}

export const VPNToggle: React.FC<VPNToggleProps> = ({
  isConnected,
  isConnecting = false,
  onToggle,
  serverLocation = 'Server più veloce',
  serverFlag = '🌍',
}) => {
  const getStatusText = () => {
    if (isConnecting) return 'Connessione...';
    if (isConnected) return 'Connesso';
    return 'Disconnesso';
  };

  const getStatusColor = () => {
    if (isConnecting) return Colors.accent;
    if (isConnected) return Colors.success;
    return Colors.error;
  };

  return (
    <View style={styles.container}>
      {/* Main Toggle Button */}
      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={onToggle}
        disabled={isConnecting}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isConnected
              ? [Colors.success, Colors.accentGreen]
              : isConnecting
              ? [Colors.accent, Colors.primary]
              : [Colors.backgroundSecondary, Colors.backgroundTertiary]
          }
          style={styles.toggleButton}
        >
          <View style={styles.innerCircle}>
            <Image
              source={
                isConnected
                  ? require('@/assets/images/br3ach_logo.png')
                  : require('@/assets/images/br3ach_logo_gray.png')
              }
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          {isConnecting && (
            <View style={styles.pulseRing} />
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Status */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        <Text style={styles.statusText}>{getStatusText()}</Text>
      </View>

      {/* Server Info */}
      {isConnected && (
        <View style={styles.serverInfo}>
          <Text style={styles.serverFlag}>{serverFlag}</Text>
          <Text style={styles.serverLocation}>{serverLocation}</Text>
        </View>
      )}

      {/* Action Text */}
      <Text style={styles.actionText}>
        {isConnected ? 'Tocca per disconnettere' : 'Tocca per connettere'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  toggleContainer: {
    marginBottom: Spacing.lg,
  },
  toggleButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.glow,
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  pulseRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.accent,
    opacity: 0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '600',
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  serverFlag: {
    fontSize: FontSize.xl,
  },
  serverLocation: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  actionText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
});

export default VPNToggle;
