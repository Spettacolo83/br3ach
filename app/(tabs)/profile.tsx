import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, GradientButton, StatusBadge, Br3achLogo } from '@/components';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';

interface MenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  badge?: string;
  onPress?: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  danger?: boolean;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: [
        { id: 'personal', icon: 'person', title: 'Informazioni Personali', subtitle: 'Modifica il tuo profilo' },
        { id: 'subscription', icon: 'card', title: 'Abbonamento', subtitle: 'Piano Gratuito', badge: 'UPGRADE' },
        { id: 'security', icon: 'lock-closed', title: 'Sicurezza Account', subtitle: '2FA attivo' },
      ],
    },
    {
      title: 'Preferenze',
      items: [
        { id: 'notifications', icon: 'notifications', title: 'Notifiche Push', hasToggle: true, toggleValue: notifications },
        { id: 'biometrics', icon: 'finger-print', title: 'Accesso Biometrico', hasToggle: true, toggleValue: biometrics },
        { id: 'darkMode', icon: 'moon', title: 'Modalità Scura', hasToggle: true, toggleValue: darkMode },
      ],
    },
    {
      title: 'Supporto',
      items: [
        { id: 'help', icon: 'help-circle', title: 'Centro Assistenza' },
        { id: 'legal', icon: 'briefcase', title: 'Supporto Legale', badge: 'PRO' },
        { id: 'contact', icon: 'chatbubble', title: 'Contattaci' },
        { id: 'feedback', icon: 'star', title: 'Valuta l\'App' },
      ],
    },
    {
      title: 'Info',
      items: [
        { id: 'privacy', icon: 'document-text', title: 'Privacy Policy' },
        { id: 'terms', icon: 'document', title: 'Termini di Servizio' },
        { id: 'version', icon: 'information-circle', title: 'Versione App', subtitle: '1.0.0 (Build 1)' },
      ],
    },
    {
      title: '',
      items: [
        { id: 'logout', icon: 'log-out', title: 'Esci', danger: true },
      ],
    },
  ];

  const handleToggle = (id: string, value: boolean) => {
    switch (id) {
      case 'notifications':
        setNotifications(value);
        break;
      case 'biometrics':
        setBiometrics(value);
        break;
      case 'darkMode':
        setDarkMode(value);
        break;
    }
  };

  const handleMenuPress = (id: string) => {
    switch (id) {
      case 'logout':
        Alert.alert(
          'Esci',
          'Sei sicuro di voler uscire?',
          [
            { text: 'Annulla', style: 'cancel' },
            { text: 'Esci', style: 'destructive', onPress: () => {} },
          ]
        );
        break;
      case 'subscription':
        Alert.alert(
          'Passa a Pro',
          'Ottieni accesso a tutte le funzionalità inclusi server VPN premium, supporto legale e protezione AI avanzata.',
          [
            { text: 'Più tardi', style: 'cancel' },
            { text: 'Vedi Piani', onPress: () => {} },
          ]
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Profilo" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.backgroundTertiary]}
          style={styles.profileCard}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={require('@/assets/images/luca.png')}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            </View>
          </View>
          <Text style={styles.userName}>Luca Contartese</Text>
          <Text style={styles.userEmail}>info@br3ach.com</Text>

          <View style={styles.planBadge}>
            <Ionicons name="sparkles" size={16} color={Colors.warning} />
            <Text style={styles.planText}>Piano Gratuito</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Giorni Protetto</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>247</Text>
              <Text style={styles.statLabel}>Minacce Bloccate</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>87%</Text>
              <Text style={styles.statLabel}>Punteggio Sicurezza</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Upgrade Banner */}
        <TouchableOpacity
          style={styles.upgradeBanner}
          activeOpacity={0.8}
          onPress={() => handleMenuPress('subscription')}
        >
          <LinearGradient
            colors={Colors.gradientPrimary as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.upgradeGradient}
          >
            <View style={styles.upgradeContent}>
              <Ionicons name="rocket" size={32} color={Colors.textPrimary} />
              <View style={styles.upgradeInfo}>
                <Text style={styles.upgradeTitle}>Passa a Pro</Text>
                <Text style={styles.upgradeSubtitle}>
                  Sblocca server VPN premium e supporto legale
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.textPrimary} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            {section.title && (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            )}
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={() => !item.hasToggle && handleMenuPress(item.id)}
                  activeOpacity={item.hasToggle ? 1 : 0.7}
                >
                  <View style={[
                    styles.menuIcon,
                    item.danger && styles.menuIconDanger,
                  ]}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.danger ? Colors.error : Colors.primary}
                    />
                  </View>
                  <View style={styles.menuInfo}>
                    <Text style={[
                      styles.menuTitle,
                      item.danger && styles.menuTitleDanger,
                    ]}>
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                  {item.badge && (
                    <View style={styles.menuBadge}>
                      <Text style={styles.menuBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                  {item.hasToggle ? (
                    <Switch
                      value={item.toggleValue}
                      onValueChange={(value) => handleToggle(item.id, value)}
                      trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
                      thumbColor={item.toggleValue ? Colors.primary : Colors.textMuted}
                    />
                  ) : !item.badge && (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={Colors.textMuted}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Br3achLogo size="large" />
          <Text style={styles.appSlogan}>La tua sicurezza digitale quotidiana</Text>
          <Text style={styles.copyright}>© 2025 Br3ach. Tutti i diritti riservati.</Text>
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
  profileCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderRadius: 12,
  },
  userName: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  userEmail: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    marginTop: Spacing.xs,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: `${Colors.warning}20`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
  },
  planText: {
    color: Colors.warning,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  upgradeBanner: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  upgradeGradient: {
    padding: Spacing.md,
  },
  upgradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  upgradeSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.sm,
  },
  menuSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuIconDanger: {
    backgroundColor: `${Colors.error}20`,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  menuTitleDanger: {
    color: Colors.error,
  },
  menuSubtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  menuBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  menuBadgeText: {
    color: Colors.textPrimary,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginTop: Spacing.lg,
  },
  appSlogan: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: Spacing.md,
  },
  copyright: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.md,
  },
});
