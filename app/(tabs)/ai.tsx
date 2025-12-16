import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, FeatureCard, StatusBadge } from '@/components';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface ThreatItem {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
  action?: string;
}

const recentThreats: ThreatItem[] = [
  {
    id: '1',
    type: 'phishing',
    title: 'Link Sospetto Rilevato',
    description: 'L\'AI ha bloccato un potenziale tentativo di phishing nella tua email',
    severity: 'high',
    time: '10 min fa',
    action: 'Bloccato',
  },
  {
    id: '2',
    type: 'privacy',
    title: 'Rischio Esposizione Dati',
    description: 'La tua email è stata trovata in una recente violazione dati',
    severity: 'medium',
    time: '2 ore fa',
    action: 'Verifica',
  },
  {
    id: '3',
    type: 'social',
    title: 'Tentativo di Accesso Insolito',
    description: 'Tentativo di login da nuovo dispositivo in posizione sconosciuta',
    severity: 'medium',
    time: '5 ore fa',
    action: 'Protetto',
  },
];

export default function AIScreen() {
  const insets = useSafeAreaInsets();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [realTimeProtection, setRealTimeProtection] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);
  const [smartNotifications, setSmartNotifications] = useState(true);

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return { color: Colors.error, label: 'Alto', bg: `${Colors.error}20` };
      case 'medium':
        return { color: Colors.warning, label: 'Medio', bg: `${Colors.warning}20` };
      case 'low':
        return { color: Colors.accent, label: 'Basso', bg: `${Colors.accent}20` };
      default:
        return { color: Colors.textMuted, label: 'Sconosciuto', bg: `${Colors.textMuted}20` };
    }
  };

  return (
    <View style={styles.container}>
      <Header title="AI Shield" showSettings onSettingsPress={() => {}} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Status Card */}
        <LinearGradient
          colors={aiEnabled ? [Colors.primary, Colors.accent] : [Colors.backgroundSecondary, Colors.backgroundTertiary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aiStatusCard}
        >
          <View style={styles.aiStatusContent}>
            <View style={styles.aiIconContainer}>
              <Ionicons
                name={aiEnabled ? 'sparkles' : 'sparkles-outline'}
                size={48}
                color={Colors.textPrimary}
              />
            </View>
            <View style={styles.aiStatusInfo}>
              <Text style={styles.aiStatusTitle}>
                {aiEnabled ? 'AI Shield Attivo' : 'AI Shield Inattivo'}
              </Text>
              <Text style={styles.aiStatusSubtitle}>
                {aiEnabled
                  ? 'Impara continuamente e ti protegge'
                  : 'Attiva AI Shield per una protezione intelligente'}
              </Text>
            </View>
            <Switch
              value={aiEnabled}
              onValueChange={setAiEnabled}
              trackColor={{ false: Colors.border, true: `${Colors.success}80` }}
              thumbColor={aiEnabled ? Colors.success : Colors.textMuted}
            />
          </View>

          {aiEnabled && (
            <View style={styles.aiStats}>
              <View style={styles.aiStatItem}>
                <Text style={styles.aiStatValue}>247</Text>
                <Text style={styles.aiStatLabel}>Minacce Bloccate</Text>
              </View>
              <View style={styles.aiStatDivider} />
              <View style={styles.aiStatItem}>
                <Text style={styles.aiStatValue}>15</Text>
                <Text style={styles.aiStatLabel}>Giorni Attivo</Text>
              </View>
              <View style={styles.aiStatDivider} />
              <View style={styles.aiStatItem}>
                <Text style={styles.aiStatValue}>99.2%</Text>
                <Text style={styles.aiStatLabel}>Precisione</Text>
              </View>
            </View>
          )}
        </LinearGradient>

        {/* AI Protection Settings */}
        <Text style={styles.sectionTitle}>Impostazioni Protezione</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIcon, { backgroundColor: `${Colors.primary}20` }]}>
                <Ionicons name="shield" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Protezione in Tempo Reale</Text>
                <Text style={styles.settingDesc}>Monitora le minacce in tempo reale</Text>
              </View>
            </View>
            <Switch
              value={realTimeProtection}
              onValueChange={setRealTimeProtection}
              trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
              thumbColor={realTimeProtection ? Colors.primary : Colors.textMuted}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIcon, { backgroundColor: `${Colors.error}20` }]}>
                <Ionicons name="hand-left" size={20} color={Colors.error} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Blocco Automatico Minacce</Text>
                <Text style={styles.settingDesc}>Blocca automaticamente contenuti ad alto rischio</Text>
              </View>
            </View>
            <Switch
              value={autoBlock}
              onValueChange={setAutoBlock}
              trackColor={{ false: Colors.border, true: `${Colors.error}80` }}
              thumbColor={autoBlock ? Colors.error : Colors.textMuted}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIcon, { backgroundColor: `${Colors.accent}20` }]}>
                <Ionicons name="notifications" size={20} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Notifiche Intelligenti</Text>
                <Text style={styles.settingDesc}>Solo avvisi prioritari dall'AI</Text>
              </View>
            </View>
            <Switch
              value={smartNotifications}
              onValueChange={setSmartNotifications}
              trackColor={{ false: Colors.border, true: `${Colors.accent}80` }}
              thumbColor={smartNotifications ? Colors.accent : Colors.textMuted}
            />
          </View>
        </View>

        {/* Recent Threats */}
        <Text style={styles.sectionTitle}>Attività Recente</Text>
        <View style={styles.threatsList}>
          {recentThreats.map((threat) => {
            const severityConfig = getSeverityConfig(threat.severity);
            return (
              <TouchableOpacity
                key={threat.id}
                style={styles.threatCard}
                activeOpacity={0.7}
              >
                <View style={styles.threatHeader}>
                  <View style={[styles.threatIcon, { backgroundColor: severityConfig.bg }]}>
                    <Ionicons
                      name={
                        threat.type === 'phishing' ? 'fish' :
                        threat.type === 'privacy' ? 'eye-off' :
                        'person-circle'
                      }
                      size={20}
                      color={severityConfig.color}
                    />
                  </View>
                  <View style={styles.threatInfo}>
                    <Text style={styles.threatTitle}>{threat.title}</Text>
                    <Text style={styles.threatTime}>{threat.time}</Text>
                  </View>
                  <View style={[styles.severityBadge, { backgroundColor: severityConfig.bg }]}>
                    <Text style={[styles.severityText, { color: severityConfig.color }]}>
                      {severityConfig.label}
                    </Text>
                  </View>
                </View>
                <Text style={styles.threatDescription}>{threat.description}</Text>
                {threat.action && (
                  <View style={styles.threatAction}>
                    <Ionicons
                      name={threat.action === 'Blocked' ? 'checkmark-circle' : 'arrow-forward-circle'}
                      size={16}
                      color={threat.action === 'Blocked' ? Colors.success : Colors.warning}
                    />
                    <Text style={[
                      styles.threatActionText,
                      { color: threat.action === 'Blocked' ? Colors.success : Colors.warning }
                    ]}>
                      {threat.action}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AI Capabilities */}
        <Text style={styles.sectionTitle}>Capacità AI</Text>
        <View style={styles.capabilitiesGrid}>
          {[
            { icon: 'brain', title: 'Apprendimento Comportamentale', desc: 'Impara i tuoi pattern digitali' },
            { icon: 'trending-up', title: 'Previsione Minacce', desc: 'Anticipa potenziali rischi' },
            { icon: 'finger-print', title: 'Protezione Identità', desc: 'Protegge la tua identità digitale' },
            { icon: 'analytics', title: 'Analisi Intelligente', desc: 'Ispezione approfondita dei contenuti' },
          ].map((cap, index) => (
            <View key={index} style={styles.capabilityCard}>
              <View style={styles.capabilityIcon}>
                <Ionicons name={cap.icon as any} size={24} color={Colors.primary} />
              </View>
              <Text style={styles.capabilityTitle}>{cap.title}</Text>
              <Text style={styles.capabilityDesc}>{cap.desc}</Text>
            </View>
          ))}
        </View>

        {/* AI Learning Progress */}
        <View style={styles.learningCard}>
          <View style={styles.learningHeader}>
            <Ionicons name="analytics" size={24} color={Colors.accent} />
            <Text style={styles.learningTitle}>Progresso Apprendimento AI</Text>
          </View>
          <View style={styles.learningBars}>
            {[
              { label: 'Pattern Comportamentali', progress: 85 },
              { label: 'Riconoscimento Minacce', progress: 92 },
              { label: 'Analisi Contenuti', progress: 78 },
            ].map((item, index) => (
              <View key={index} style={styles.learningItem}>
                <View style={styles.learningLabelRow}>
                  <Text style={styles.learningLabel}>{item.label}</Text>
                  <Text style={styles.learningPercent}>{item.progress}%</Text>
                </View>
                <View style={styles.learningBar}>
                  <LinearGradient
                    colors={Colors.gradientPrimary as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.learningFill, { width: `${item.progress}%` }]}
                  />
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.learningFooter}>
            L'AI continua ad imparare mentre usi l'app
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
  aiStatusCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  aiStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  aiStatusInfo: {
    flex: 1,
  },
  aiStatusTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  aiStatusSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  aiStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  aiStatItem: {
    alignItems: 'center',
  },
  aiStatValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  aiStatLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  aiStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  settingsCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  settingDesc: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  threatsList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  threatCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  threatIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  threatInfo: {
    flex: 1,
  },
  threatTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  threatTime: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  severityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  severityText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  threatDescription: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  threatAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  threatActionText: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  capabilityCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  capabilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  capabilityTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  capabilityDesc: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  learningCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  learningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  learningTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  learningBars: {
    gap: Spacing.md,
  },
  learningItem: {
    gap: Spacing.xs,
  },
  learningLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  learningLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  learningPercent: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  learningBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  learningFill: {
    height: '100%',
    borderRadius: 4,
  },
  learningFooter: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
