import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, SecurityScore, FeatureCard, StatusBadge } from '@/components';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const quickActions = [
    { id: 'vpn', icon: 'shield-checkmark', label: 'VPN', color: Colors.primary },
    { id: 'scan', icon: 'scan', label: 'Scansiona', color: Colors.accent },
    { id: 'alert', icon: 'warning', label: 'Avvisi', color: Colors.warning, badge: 2 },
    { id: 'support', icon: 'headset', label: 'Supporto', color: Colors.accentPink },
  ];

  const recentActivity = [
    { id: 1, type: 'vpn', message: 'VPN connessa a Milano', time: '2 min fa', icon: 'shield-checkmark' },
    { id: 2, type: 'scan', message: 'Nessun deepfake rilevato', time: '1 ora fa', icon: 'checkmark-circle' },
    { id: 3, type: 'ai', message: 'AI ha analizzato 15 post social', time: '3 ore fa', icon: 'sparkles' },
  ];

  return (
    <View style={styles.container}>
      <Header
        showLogo
        showNotification
        showSettings
        notificationCount={3}
        onNotificationPress={() => {}}
        onSettingsPress={() => router.push('/profile')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Bentornato</Text>
          <Text style={styles.subtitle}>La tua sicurezza digitale a colpo d'occhio</Text>
        </View>

        {/* Security Score Card */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.backgroundTertiary]}
          style={styles.scoreCard}
        >
          <View style={styles.scoreCardContent}>
            <SecurityScore score={87} size="medium" />
            <View style={styles.scoreInfo}>
              <StatusBadge status="protected" label="Sistemi Attivi" />
              <Text style={styles.scoreDescription}>
                La tua identità digitale è ben protetta. Mantieni la VPN attiva per la massima sicurezza.
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Azioni Rapide</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickAction}
              onPress={() => {
                if (action.id === 'vpn') router.push('/vpn');
                if (action.id === 'scan') router.push('/monitor');
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                <Ionicons name={action.icon as any} size={24} color={action.color} />
                {action.badge && (
                  <View style={styles.quickActionBadge}>
                    <Text style={styles.quickActionBadgeText}>{action.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>Funzionalità di Protezione</Text>
        <View style={styles.features}>
          <FeatureCard
            title="Protezione VPN"
            description="Proteggi la tua connessione con crittografia di livello militare"
            icon="shield-checkmark"
            iconColor={Colors.primary}
            status="active"
            onPress={() => router.push('/vpn')}
          />
          <FeatureCard
            title="Rilevamento Deepfake"
            description="Scansione AI per contenuti falsi che usano la tua immagine"
            icon="scan-circle"
            iconColor={Colors.accent}
            status="active"
            onPress={() => router.push('/monitor')}
          />
          <FeatureCard
            title="AI Threat Shield"
            description="Protezione intelligente che impara le tue abitudini digitali"
            icon="sparkles"
            iconColor={Colors.accentPink}
            status="active"
            onPress={() => router.push('/ai')}
          />
          <FeatureCard
            title="Supporto Legale"
            description="Assistenza esperta quando la tua identità è compromessa"
            icon="briefcase"
            iconColor={Colors.warning}
            badge="PRO"
            onPress={() => {}}
          />
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Attività Recente</Text>
        <View style={styles.activityList}>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name={activity.icon as any} size={20} color={Colors.success} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Mission Quote */}
        <View style={styles.missionCard}>
          <Image
            source={require('@/assets/images/br3ach_name.png')}
            style={styles.missionLogo}
            resizeMode="contain"
          />
          <Text style={styles.missionText}>
            "La sicurezza digitale non dovrebbe essere un privilegio di pochi, ma un diritto di tutti."
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  welcomeSection: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },
  scoreCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scoreCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  scoreInfo: {
    flex: 1,
    gap: Spacing.sm,
  },
  scoreDescription: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  quickAction: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  quickActionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.error,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionBadgeText: {
    color: Colors.textPrimary,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  quickActionLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  features: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  activityList: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.success}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
  },
  activityTime: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  missionCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionLogo: {
    height: 24,
    width: 100,
    marginBottom: Spacing.sm,
  },
  missionText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: Spacing.md,
    lineHeight: 22,
  },
});
