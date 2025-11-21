import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function TermsOfServiceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conditions d'utilisation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.updateDate}>Dernière mise à jour : 21 novembre 2024</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptation des conditions</Text>
            <Text style={styles.paragraph}>
              En utilisant Weared, vous acceptez ces conditions d'utilisation. Si vous n'acceptez 
              pas ces conditions, veuillez ne pas utiliser notre service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Description du service</Text>
            <Text style={styles.paragraph}>
              Weared est une plateforme de vente et d'achat de vêtements d'occasion qui met en 
              relation vendeurs et acheteurs. Nous facilitons les transactions mais ne sommes pas 
              partie prenante dans les ventes.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Inscription et compte</Text>
            <Text style={styles.paragraph}>
              Pour utiliser Weared, vous devez :
            </Text>
            <Text style={styles.bulletPoint}>• Avoir au moins 18 ans</Text>
            <Text style={styles.bulletPoint}>• Fournir des informations exactes</Text>
            <Text style={styles.bulletPoint}>• Maintenir la sécurité de votre compte</Text>
            <Text style={styles.bulletPoint}>• Ne pas partager vos identifiants</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Règles de vente</Text>
            <Text style={styles.paragraph}>
              En tant que vendeur, vous vous engagez à :
            </Text>
            <Text style={styles.bulletPoint}>• Publier des articles authentiques</Text>
            <Text style={styles.bulletPoint}>• Fournir des descriptions précises</Text>
            <Text style={styles.bulletPoint}>• Utiliser vos propres photos</Text>
            <Text style={styles.bulletPoint}>• Respecter les délais d'expédition</Text>
            <Text style={styles.bulletPoint}>• Ne pas vendre d'articles contrefaits</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Règles d'achat</Text>
            <Text style={styles.paragraph}>
              En tant qu'acheteur, vous vous engagez à :
            </Text>
            <Text style={styles.bulletPoint}>• Payer les articles achetés</Text>
            <Text style={styles.bulletPoint}>• Communiquer de manière respectueuse</Text>
            <Text style={styles.bulletPoint}>• Confirmer la réception des articles</Text>
            <Text style={styles.bulletPoint}>• Laisser des avis honnêtes</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Paiements et frais</Text>
            <Text style={styles.paragraph}>
              Weared prélève une commission de 10% sur chaque vente. Les paiements sont traités 
              de manière sécurisée via nos partenaires de paiement.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Retours et remboursements</Text>
            <Text style={styles.paragraph}>
              Les retours sont possibles dans les 7 jours suivant la réception si l'article ne 
              correspond pas à la description. Les frais de retour sont à la charge de l'acheteur 
              sauf en cas d'erreur du vendeur.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Contenu interdit</Text>
            <Text style={styles.paragraph}>
              Il est strictement interdit de publier :
            </Text>
            <Text style={styles.bulletPoint}>• Des articles contrefaits</Text>
            <Text style={styles.bulletPoint}>• Du contenu offensant ou illégal</Text>
            <Text style={styles.bulletPoint}>• Des informations trompeuses</Text>
            <Text style={styles.bulletPoint}>• Du spam ou des publicités</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Propriété intellectuelle</Text>
            <Text style={styles.paragraph}>
              Tout le contenu de Weared (logo, design, textes) est protégé par les droits d'auteur. 
              Vous conservez les droits sur le contenu que vous publiez mais nous accordez une 
              licence pour l'afficher sur notre plateforme.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Résiliation</Text>
            <Text style={styles.paragraph}>
              Nous nous réservons le droit de suspendre ou supprimer votre compte en cas de 
              violation de ces conditions, sans préavis ni remboursement.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Limitation de responsabilité</Text>
            <Text style={styles.paragraph}>
              Weared n'est pas responsable des transactions entre utilisateurs. Nous ne garantissons 
              pas la qualité, la sécurité ou la légalité des articles vendus.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Modifications</Text>
            <Text style={styles.paragraph}>
              Nous pouvons modifier ces conditions à tout moment. Les modifications importantes 
              vous seront notifiées. Votre utilisation continue du service constitue votre 
              acceptation des nouvelles conditions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>13. Droit applicable</Text>
            <Text style={styles.paragraph}>
              Ces conditions sont régies par les lois de la Côte d'Ivoire. Tout litige sera 
              soumis aux tribunaux compétents d'Abidjan.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>14. Contact</Text>
            <Text style={styles.paragraph}>
              Pour toute question concernant ces conditions :
            </Text>
            <Text style={styles.contactText}>📧 legal@weared.com</Text>
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
