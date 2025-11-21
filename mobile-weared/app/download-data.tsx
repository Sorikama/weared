import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomModal } from '@/components/custom-modal';

export default function DownloadDataScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDownloadRequest = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <CustomModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          router.back();
        }}
        title="Demande envoyée ✓"
        message="Vous recevrez un email avec vos données dans les 48 heures"
        type="success"
        confirmText="OK"
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Télécharger mes données</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>📦</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Vos données personnelles</Text>
            <Text style={styles.infoText}>
              Vous pouvez télécharger une copie de toutes vos données stockées sur Weared
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce qui sera inclus :</Text>
          
          <View style={styles.dataItem}>
            <Text style={styles.dataIcon}>👤</Text>
            <View style={styles.dataContent}>
              <Text style={styles.dataTitle}>Informations de profil</Text>
              <Text style={styles.dataDescription}>
                Nom, email, photo de profil, bio, localisation
              </Text>
            </View>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataIcon}>🛍️</Text>
            <View style={styles.dataContent}>
              <Text style={styles.dataTitle}>Articles</Text>
              <Text style={styles.dataDescription}>
                Tous vos articles publiés avec photos et descriptions
              </Text>
            </View>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataIcon}>💬</Text>
            <View style={styles.dataContent}>
              <Text style={styles.dataTitle}>Messages</Text>
              <Text style={styles.dataDescription}>
                Historique de vos conversations
              </Text>
            </View>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataIcon}>🛒</Text>
            <View style={styles.dataContent}>
              <Text style={styles.dataTitle}>Achats et ventes</Text>
              <Text style={styles.dataDescription}>
                Historique de vos transactions
              </Text>
            </View>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataIcon}>❤️</Text>
            <View style={styles.dataContent}>
              <Text style={styles.dataTitle}>Favoris</Text>
              <Text style={styles.dataDescription}>
                Articles que vous avez mis en favoris
              </Text>
            </View>
          </View>

          <View style={styles.dataItem}>
            <Text style={styles.dataIcon}>⭐</Text>
            <View style={styles.dataContent}>
              <Text style={styles.dataTitle}>Avis et évaluations</Text>
              <Text style={styles.dataDescription}>
                Vos avis donnés et reçus
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Format et délai</Text>
          
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Format</Text>
            <Text style={styles.detailValue}>Fichier ZIP contenant des fichiers JSON</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Délai de traitement</Text>
            <Text style={styles.detailValue}>Jusqu'à 48 heures</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Livraison</Text>
            <Text style={styles.detailValue}>Par email à votre adresse enregistrée</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadRequest}
          >
            <Text style={styles.downloadButtonText}>Demander mes données</Text>
          </TouchableOpacity>

          <Text style={styles.note}>
            Vous recevrez un email de confirmation une fois votre demande traitée
          </Text>
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5F1',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6DD',
  },
  infoIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B9876',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
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
  dataItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dataIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  dataContent: {
    flex: 1,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  dataDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  detailCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 15,
    color: '#000000',
  },
  buttonContainer: {
    padding: 20,
  },
  downloadButton: {
    backgroundColor: '#1B9876',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  note: {
    fontSize: 13,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
