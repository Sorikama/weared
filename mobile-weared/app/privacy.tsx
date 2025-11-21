import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function PrivacyScreen() {
  const router = useRouter();
  const [profilePublic, setProfilePublic] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showLastSeen, setShowLastSeen] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confidentialité</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visibilité du profil</Text>
          
          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Profil public</Text>
              <Text style={styles.itemSubtitle}>Tout le monde peut voir votre profil</Text>
            </View>
            <Switch
              value={profilePublic}
              onValueChange={setProfilePublic}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Statut en ligne</Text>
              <Text style={styles.itemSubtitle}>Afficher quand vous êtes en ligne</Text>
            </View>
            <Switch
              value={showOnlineStatus}
              onValueChange={setShowOnlineStatus}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Dernière connexion</Text>
              <Text style={styles.itemSubtitle}>Afficher votre dernière connexion</Text>
            </View>
            <Switch
              value={showLastSeen}
              onValueChange={setShowLastSeen}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Messages</Text>
          
          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>Autoriser les messages</Text>
              <Text style={styles.itemSubtitle}>Recevoir des messages de tous</Text>
            </View>
            <Switch
              value={allowMessages}
              onValueChange={setAllowMessages}
              trackColor={{ false: '#E0E0E0', true: '#1B9876' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Données personnelles</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/download-data')}
          >
            <Text style={styles.menuItemTitle}>Télécharger mes données</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/privacy-policy')}
          >
            <Text style={styles.menuItemTitle}>Politique de confidentialité</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/terms-of-service')}
          >
            <Text style={styles.menuItemTitle}>Conditions d'utilisation</Text>
            <Text style={styles.menuArrow}>›</Text>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#000000',
  },
  menuArrow: {
    fontSize: 20,
    color: '#999999',
  },
});
