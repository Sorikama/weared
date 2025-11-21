import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SecurityScreen() {
  const router = useRouter();
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sécurité</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentification</Text>
          
          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Authentification à deux facteurs</Text>
              <Text style={styles.itemSubtitle}>Sécurité renforcée avec code SMS</Text>
            </View>
            <Switch
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Authentification biométrique</Text>
              <Text style={styles.itemSubtitle}>Empreinte digitale ou Face ID</Text>
            </View>
            <Switch
              value={biometricAuth}
              onValueChange={setBiometricAuth}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mot de passe</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/change-password')}
          >
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Changer le mot de passe</Text>
              <Text style={styles.itemSubtitle}>Dernière modification il y a 3 mois</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sessions actives</Text>
          
          <View style={styles.sessionCard}>
            <View style={styles.sessionIcon}>
              <Text style={styles.sessionIconText}>📱</Text>
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionDevice}>iPhone 14 Pro</Text>
              <Text style={styles.sessionLocation}>Abidjan, Côte d'Ivoire</Text>
              <Text style={styles.sessionTime}>Actif maintenant</Text>
            </View>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Actuel</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutAllButton}>
            <Text style={styles.logoutAllText}>Déconnecter tous les appareils</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique de connexion</Text>
          
          <View style={styles.loginItem}>
            <Text style={styles.loginDate}>21 Nov 2024, 14:30</Text>
            <Text style={styles.loginLocation}>Abidjan, Côte d'Ivoire</Text>
          </View>

          <View style={styles.loginItem}>
            <Text style={styles.loginDate}>20 Nov 2024, 09:15</Text>
            <Text style={styles.loginLocation}>Abidjan, Côte d'Ivoire</Text>
          </View>

          <View style={styles.loginItem}>
            <Text style={styles.loginDate}>19 Nov 2024, 18:45</Text>
            <Text style={styles.loginLocation}>Abidjan, Côte d'Ivoire</Text>
          </View>
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
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemLeft: {
    flex: 1,
    marginRight: 15,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuArrow: {
    fontSize: 20,
    color: '#999999',
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  sessionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionIconText: {
    fontSize: 24,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDevice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  sessionLocation: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: 13,
    color: '#1B9876',
    fontWeight: '600',
  },
  currentBadge: {
    backgroundColor: '#E8F5F1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: 12,
    color: '#1B9876',
    fontWeight: '600',
  },
  logoutAllButton: {
    backgroundColor: '#FFF5F5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutAllText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  loginItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  loginDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  loginLocation: {
    fontSize: 13,
    color: '#666666',
  },
});
