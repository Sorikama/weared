import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Politique de confidentialité</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.updateDate}>Dernière mise à jour : 21 novembre 2024</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.paragraph}>
              Weared s'engage à protéger votre vie privée. Cette politique de confidentialité 
              explique comment nous collectons, utilisons et protégeons vos informations personnelles.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Informations collectées</Text>
            <Text style={styles.paragraph}>
              Nous collectons les informations suivantes :
            </Text>
            <Text style={styles.bulletPoint}>• Informations de profil (nom, email, photo)</Text>
            <Text style={styles.bulletPoint}>• Informations de localisation</Text>
            <Text style={styles.bulletPoint}>• Historique d'achats et de ventes</Text>
            <Text style={styles.bulletPoint}>• Messages et communications</Text>
            <Text style={styles.bulletPoint}>• Données d'utilisation de l'application</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Utilisation des données</Text>
            <Text style={styles.paragraph}>
              Vos données sont utilisées pour :
            </Text>
            <Text style={styles.bulletPoint}>• Fournir et améliorer nos services</Text>
            <Text style={styles.bulletPoint}>• Faciliter les transactions entre utilisateurs</Text>
            <Text style={styles.bulletPoint}>• Personnaliser votre expérience</Text>
            <Text style={styles.bulletPoint}>• Assurer la sécurité de la plateforme</Text>
            <Text style={styles.bulletPoint}>• Vous envoyer des notifications importantes</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Partage des données</Text>
            <Text style={styles.paragraph}>
              Nous ne vendons jamais vos données personnelles. Vos informations peuvent être 
              partagées uniquement dans les cas suivants :
            </Text>
            <Text style={styles.bulletPoint}>• Avec d'autres utilisateurs lors de transactions</Text>
            <Text style={styles.bulletPoint}>• Avec nos prestataires de services (paiement, livraison)</Text>
            <Text style={styles.bulletPoint}>• Si requis par la loi</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Sécurité des données</Text>
            <Text style={styles.paragraph}>
              Nous utilisons des mesures de sécurité techniques et organisationnelles pour 
              protéger vos données contre tout accès non autorisé, perte ou altération.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Vos droits</Text>
            <Text style={styles.paragraph}>
              Vous avez le droit de :
            </Text>
            <Text style={styles.bulletPoint}>• Accéder à vos données personnelles</Text>
            <Text style={styles.bulletPoint}>• Corriger vos informations</Text>
            <Text style={styles.bulletPoint}>• Supprimer votre compte</Text>
            <Text style={styles.bulletPoint}>• Télécharger vos données</Text>
            <Text style={styles.bulletPoint}>• Vous opposer au traitement de vos données</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Cookies et technologies similaires</Text>
            <Text style={styles.paragraph}>
              Nous utilisons des cookies et technologies similaires pour améliorer votre 
              expérience et analyser l'utilisation de notre application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Conservation des données</Text>
            <Text style={styles.paragraph}>
              Nous conservons vos données aussi longtemps que nécessaire pour fournir nos 
              services ou conformément aux obligations légales.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Modifications</Text>
            <Text style={styles.paragraph}>
              Nous pouvons modifier cette politique de confidentialité. Les modifications 
              importantes vous seront notifiées par email ou via l'application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Contact</Text>
            <Text style={styles.paragraph}>
              Pour toute question concernant cette politique, contactez-nous à :
            </Text>
            <Text style={styles.contactText}>📧 privacy@weared.com</Text>
            <Text style={styles.contactText}>📱 +225 XX XX XX XX XX</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2024 Weared. Tous droits réservés.</Text>
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
  content: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 10,
    borderRadius: 12,
  },
  updateDate: {
    fontSize: 13,
    color: '#999999',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B9876',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 24,
    paddingLeft: 10,
  },
  contactText: {
    fontSize: 15,
    color: '#1B9876',
    lineHeight: 24,
    paddingLeft: 10,
  },
  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#999999',
  },
});
