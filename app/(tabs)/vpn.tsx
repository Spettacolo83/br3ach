import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, VPNToggle, ServerCard, GradientButton } from '@/components';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  isPremium?: boolean;
}

const servers: Server[] = [
  { id: '1', name: 'Milano', country: 'Italia', flag: '🇮🇹', ping: 15, load: 45 },
  { id: '2', name: 'Francoforte', country: 'Germania', flag: '🇩🇪', ping: 28, load: 60 },
  { id: '3', name: 'Amsterdam', country: 'Paesi Bassi', flag: '🇳🇱', ping: 35, load: 55 },
  { id: '4', name: 'Londra', country: 'Regno Unito', flag: '🇬🇧', ping: 42, load: 70 },
  { id: '5', name: 'New York', country: 'Stati Uniti', flag: '🇺🇸', ping: 95, load: 40, isPremium: true },
  { id: '6', name: 'Tokyo', country: 'Giappone', flag: '🇯🇵', ping: 180, load: 35, isPremium: true },
  { id: '7', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', ping: 160, load: 50, isPremium: true },
  { id: '8', name: 'Sydney', country: 'Australia', flag: '🇦🇺', ping: 210, load: 30, isPremium: true },
];

export default function VPNScreen() {
  const insets = useSafeAreaInsets();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [showAllServers, setShowAllServers] = useState(false);

  const handleToggleVPN = async () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      setIsConnecting(true);
      // Simulate connection
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 2000);
    }
  };

  const handleSelectServer = (server: Server) => {
    if (server.isPremium) {
      Alert.alert(
        'Server Premium',
        'Questo server è disponibile per utenti Pro. Effettua l\'upgrade per accedere a server in tutto il mondo.',
        [
          { text: 'Più tardi', style: 'cancel' },
          { text: 'Upgrade', onPress: () => {} },
        ]
      );
      return;
    }
    setSelectedServer(server);
    if (isConnected) {
      // Reconnect to new server
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
      }, 1500);
    }
  };

  const displayedServers = showAllServers ? servers : servers.slice(0, 4);

  return (
    <View style={styles.container}>
      <Header title="Protezione VPN" showSettings onSettingsPress={() => {}} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* VPN Toggle */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.backgroundTertiary]}
          style={styles.vpnCard}
        >
          <VPNToggle
            isConnected={isConnected}
            isConnecting={isConnecting}
            onToggle={handleToggleVPN}
            serverLocation={selectedServer.name}
            serverFlag={selectedServer.flag}
          />

          {/* Connection Stats */}
          {isConnected && (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="arrow-down" size={16} color={Colors.accent} />
                <Text style={styles.statValue}>45.2 MB/s</Text>
                <Text style={styles.statLabel}>Scaricamento</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="arrow-up" size={16} color={Colors.accentPink} />
                <Text style={styles.statValue}>12.8 MB/s</Text>
                <Text style={styles.statLabel}>Caricamento</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="time" size={16} color={Colors.success} />
                <Text style={styles.statValue}>{selectedServer.ping}ms</Text>
                <Text style={styles.statLabel}>Latenza</Text>
              </View>
            </View>
          )}
        </LinearGradient>

        {/* IP Info */}
        <View style={styles.ipCard}>
          <View style={styles.ipRow}>
            <View>
              <Text style={styles.ipLabel}>Il tuo indirizzo IP</Text>
              <Text style={styles.ipValue}>
                {isConnected ? '185.***.***.42' : '93.45.123.***'}
              </Text>
            </View>
            <View style={[
              styles.ipBadge,
              { backgroundColor: isConnected ? `${Colors.success}20` : `${Colors.error}20` }
            ]}>
              <Ionicons
                name={isConnected ? 'shield-checkmark' : 'warning'}
                size={16}
                color={isConnected ? Colors.success : Colors.error}
              />
              <Text style={[
                styles.ipBadgeText,
                { color: isConnected ? Colors.success : Colors.error }
              ]}>
                {isConnected ? 'Protetto' : 'Esposto'}
              </Text>
            </View>
          </View>
          {isConnected && (
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color={Colors.textMuted} />
              <Text style={styles.locationText}>
                {selectedServer.name}, {selectedServer.country}
              </Text>
            </View>
          )}
        </View>

        {/* Server Selection */}
        <View style={styles.serverSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seleziona Server</Text>
            <TouchableOpacity onPress={() => setShowAllServers(!showAllServers)}>
              <Text style={styles.seeAll}>
                {showAllServers ? 'Mostra meno' : 'Vedi tutti'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recommended Server */}
          <TouchableOpacity
            style={styles.recommendedServer}
            onPress={() => handleSelectServer(servers[0])}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={Colors.gradientPrimary as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.recommendedGradient}
            >
              <View style={styles.recommendedContent}>
                <Ionicons name="flash" size={24} color={Colors.textPrimary} />
                <View style={styles.recommendedInfo}>
                  <Text style={styles.recommendedTitle}>Server più veloce</Text>
                  <Text style={styles.recommendedSubtitle}>
                    Connessione automatica al miglior server disponibile
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textPrimary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Server List */}
          <View style={styles.serverList}>
            {displayedServers.map((server) => (
              <ServerCard
                key={server.id}
                name={server.name}
                country={server.country}
                flag={server.flag}
                ping={server.ping}
                load={server.load}
                isSelected={selectedServer.id === server.id}
                isPremium={server.isPremium}
                onPress={() => handleSelectServer(server)}
              />
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Funzionalità VPN</Text>
          <View style={styles.featuresList}>
            {[
              { icon: 'lock-closed', title: 'Crittografia AES-256', desc: 'Sicurezza di livello militare' },
              { icon: 'eye-off', title: 'Politica No-Log', desc: 'La tua privacy è garantita' },
              { icon: 'flash', title: 'Kill Switch', desc: 'Disconnessione automatica se cade la VPN' },
              { icon: 'globe', title: 'Protezione DNS', desc: 'Previene fughe di DNS' },
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={20} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>
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
  vpnCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  ipCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ipLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  ipValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  ipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  ipBadgeText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  locationText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  serverSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  seeAll: {
    color: Colors.primary,
    fontSize: FontSize.md,
  },
  recommendedServer: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  recommendedGradient: {
    padding: Spacing.md,
  },
  recommendedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  recommendedInfo: {
    flex: 1,
  },
  recommendedTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  recommendedSubtitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    opacity: 0.8,
  },
  serverList: {
    gap: Spacing.sm,
  },
  featuresSection: {
    marginBottom: Spacing.xl,
  },
  featuresList: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  featureDesc: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
});
