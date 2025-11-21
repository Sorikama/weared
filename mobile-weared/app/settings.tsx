import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/edit-profile')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>👤</Text>
              <Text style={styles.menuItemTitle}>Modifier le profil</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/change-password')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🔒</Text>
              <Text style={styles.menuItemTitle}>Changer le mot de passe</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/change-email')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>📧</Text>
              <Text style={styles.menuItemTitle}>Adresse email</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🔔</Text>
              <View>
                <Text style={styles.menuItemTitle}>Notifications push</Text>
                <Text style={styles.menuItemSubtitle}>Recevoir les notifications</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>📬</Text>
              <View>
                <Text style={styles.menuItemTitle}>Notifications email</Text>
                <Text style={styles.menuItemSubtitle}>Recevoir par email</Text>
              </View>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Apparence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          
          <View style={styles.switchItem}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🌙</Text>
              <View>
                <Text style={styles.menuItemTitle}>Mode sombre</Text>
                <Text style={styles.menuItemSubtitle}>Thème sombre</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/language')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🌍</Text>
              <Text style={styles.menuItemTitle}>Langue</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.menuValue}>Français</Text>
              <Text style={styles.menuArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Confidentialité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité et sécurité</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/privacy')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🔐</Text>
              <Text style={styles.menuItemTitle}>Confidentialité</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/security')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🛡️</Text>
              <Text style={styles.menuItemTitle}>Sécurité</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/blocked-accounts')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🚫</Text>
              <Text style={styles.menuItemTitle}>Comptes bloqués</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* À propos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/about')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>ℹ️</Text>
              <Text style={styles.menuItemTitle}>À propos de Weared</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/rate-app')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>⭐</Text>
              <Text style={styles.menuItemTitle}>Noter l'application</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.versionItem}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.dangerItem}
            onPress={() => router.push('/delete-account')}
          >
            <Text style={styles.dangerIcon}>🗑️</Text>
            <Text style={styles.dangerText}>Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#1B9876',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#000000',
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 20,
    color: '#999999',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 15,
    color: '#666666',
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  versionItem: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#999999',
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  dangerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});