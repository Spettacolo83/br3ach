import React, { useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, GradientButton, StatusBadge } from '@/components';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface ScanResult {
  id: string;
  platform: string;
  icon: string;
  status: 'clean' | 'warning' | 'threat';
  lastScan: string;
  detections: number;
}

const scanResults: ScanResult[] = [
  { id: '1', platform: 'Instagram', icon: 'logo-instagram', status: 'clean', lastScan: '2 ore fa', detections: 0 },
  { id: '2', platform: 'TikTok', icon: 'logo-tiktok', status: 'clean', lastScan: '3 ore fa', detections: 0 },
  { id: '3', platform: 'YouTube', icon: 'logo-youtube', status: 'warning', lastScan: '1 giorno fa', detections: 2 },
  { id: '4', platform: 'Twitter/X', icon: 'logo-twitter', status: 'clean', lastScan: '5 ore fa', detections: 0 },
  { id: '5', platform: 'Facebook', icon: 'logo-facebook', status: 'clean', lastScan: '1 giorno fa', detections: 0 },
];

export default function MonitorScreen() {
  const insets = useSafeAreaInsets();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'clean':
        return { color: Colors.success, label: 'Pulito', icon: 'checkmark-circle' };
      case 'warning':
        return { color: Colors.warning, label: 'Verifica', icon: 'warning' };
      case 'threat':
        return { color: Colors.error, label: 'Minaccia', icon: 'alert-circle' };
      default:
        return { color: Colors.textMuted, label: 'Sconosciuto', icon: 'help-circle' };
    }
  };

  const totalDetections = scanResults.reduce((sum, r) => sum + r.detections, 0);

  return (
    <View style={styles.container}>
      <Header title="Monitor Deepfake" showSettings onSettingsPress={() => {}} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.backgroundTertiary]}
          style={styles.statusCard}
        >
          <View style={styles.statusHeader}>
            <View style={styles.statusIcon}>
              <Ionicons
                name={totalDetections > 0 ? 'warning' : 'shield-checkmark'}
                size={40}
                color={totalDetections > 0 ? Colors.warning : Colors.success}
              />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {totalDetections > 0 ? 'Attenzione Richiesta' : 'Tutto OK'}
              </Text>
              <Text style={styles.statusSubtitle}>
                {totalDetections > 0
                  ? `${totalDetections} potenziali deepfake rilevati`
                  : 'Nessun deepfake con la tua immagine trovato'}
              </Text>
            </View>
          </View>

          {/* Scan Progress */}
          {isScanning && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Scansione del web in corso...</Text>
                <Text style={styles.progressValue}>{scanProgress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${scanProgress}%` }]} />
              </View>
            </View>
          )}

          <GradientButton
            title={isScanning ? 'Scansione...' : 'Avvia Scansione Completa'}
            onPress={handleStartScan}
            disabled={isScanning}
            loading={isScanning}
            gradient={Colors.gradientPrimary}
            style={styles.scanButton}
          />
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="images" size={24} color={Colors.accent} />
            <Text style={styles.statValue}>1,248</Text>
            <Text style={styles.statLabel}>Immagini Scansionate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="videocam" size={24} color={Colors.accentPink} />
            <Text style={styles.statValue}>342</Text>
            <Text style={styles.statLabel}>Video Controllati</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="globe" size={24} color={Colors.primary} />
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Piattaforme</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="warning" size={24} color={Colors.warning} />
            <Text style={styles.statValue}>{totalDetections}</Text>
            <Text style={styles.statLabel}>Rilevamenti</Text>
          </View>
        </View>

        {/* Platform Results */}
        <Text style={styles.sectionTitle}>Monitoraggio Piattaforme</Text>
        <View style={styles.platformList}>
          {scanResults.map((result) => {
            const statusConfig = getStatusConfig(result.status);
            return (
              <TouchableOpacity
                key={result.id}
                style={styles.platformCard}
                activeOpacity={0.7}
              >
                <View style={styles.platformIcon}>
                  <Ionicons name={result.icon as any} size={24} color={Colors.textPrimary} />
                </View>
                <View style={styles.platformInfo}>
                  <Text style={styles.platformName}>{result.platform}</Text>
                  <Text style={styles.platformScan}>Ultima scansione: {result.lastScan}</Text>
                </View>
                <View style={styles.platformStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: `${statusConfig.color}20` }]}>
                    <Ionicons name={statusConfig.icon as any} size={14} color={statusConfig.color} />
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                      {statusConfig.label}
                    </Text>
                  </View>
                  {result.detections > 0 && (
                    <Text style={styles.detectionCount}>{result.detections} trovati</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* How It Works */}
        <Text style={styles.sectionTitle}>Come Funziona</Text>
        <View style={styles.howItWorks}>
          {[
            {
              step: '1',
              title: 'Carica le tue Foto',
              desc: 'Carica in sicurezza immagini di riferimento per far imparare la tua fisionomia all\'AI',
              icon: 'cloud-upload',
            },
            {
              step: '2',
              title: 'Scansione AI',
              desc: 'La nostra AI scansiona continuamente il web alla ricerca di immagini e video',
              icon: 'scan',
            },
            {
              step: '3',
              title: 'Rilevamento Deepfake',
              desc: 'Algoritmi avanzati identificano contenuti manipolati',
              icon: 'eye',
            },
            {
              step: '4',
              title: 'Avviso e Azione',
              desc: 'Ricevi notifiche e agisci con supporto legale',
              icon: 'notifications',
            },
          ].map((item, index) => (
            <View key={index} style={styles.howItWorksItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{item.step}</Text>
              </View>
              <View style={styles.howItWorksContent}>
                <View style={styles.howItWorksIcon}>
                  <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
                </View>
                <View style={styles.howItWorksText}>
                  <Text style={styles.howItWorksTitle}>{item.title}</Text>
                  <Text style={styles.howItWorksDesc}>{item.desc}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add Reference Photos */}
        <TouchableOpacity style={styles.addPhotosCard} activeOpacity={0.8}>
          <LinearGradient
            colors={[`${Colors.primary}20`, `${Colors.accent}20`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addPhotosGradient}
          >
            <Ionicons name="add-circle" size={48} color={Colors.primary} />
            <Text style={styles.addPhotosTitle}>Aggiungi Foto di Riferimento</Text>
            <Text style={styles.addPhotosDesc}>
              Carica foto di te stesso per migliorare l'accuratezza del rilevamento deepfake
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
  statusCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statusIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  statusSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },
  progressSection: {
    marginBottom: Spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  progressValue: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  scanButton: {
    marginTop: Spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  platformList: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  platformCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  platformIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  platformScan: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  platformStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  detectionCount: {
    color: Colors.warning,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  howItWorks: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  howItWorksItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepNumberText: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  howItWorksContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  howItWorksIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  howItWorksText: {
    flex: 1,
  },
  howItWorksTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  howItWorksDesc: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
    lineHeight: 18,
  },
  addPhotosCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  addPhotosGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
  },
  addPhotosTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
    marginTop: Spacing.md,
  },
  addPhotosDesc: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
