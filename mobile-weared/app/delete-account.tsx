import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomModal } from '@/components/custom-modal';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDeleteRequest = () => {
    if (!password) {
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <CustomModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmer la suppression"
        message="Cette action est irréversible. Toutes vos données seront définitivement supprimées."
        type="error"
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleConfirmDelete}
      />

      <CustomModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.replace('/login');
        }}
        title="Compte supprimé"
        message="Votre compte a été supprimé avec succès. Nous espérons vous revoir bientôt."
        type="success"
        confirmText="OK"
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Supprimer mon compte</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.warningBox}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Attention !</Text>
            <Text style={styles.warningText}>
              La suppression de votre compte est définitive et irréversible.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce qui sera supprimé :</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>👤</Text>
            <Text style={styles.infoText}>Votre profil et informations personnelles</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🛍️</Text>
            <Text style={styles.infoText}>Tous vos articles en vente</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>💬</Text>
            <Text style={styles.infoText}>Vos conversations et messages</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>⭐</Text>
            <Text style={styles.infoText}>Vos avis et évaluations</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>❤️</Text>
            <Text style={styles.infoText}>Vos favoris et recherches sauvegardées</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Mot de passe actuel *</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Raison de la suppression (optionnel)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Dites-nous pourquoi vous partez..."
            placeholderTextColor="#999999"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.hint}>
            Vos commentaires nous aident à améliorer l'application
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.deleteButton, !password && styles.deleteButtonDisabled]}
            onPress={handleDeleteRequest}
            disabled={!password}
          >
            <Text style={styles.deleteButtonText}>Supprimer définitivement mon compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
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
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFE0E0',
  },
  warningIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  infoText: {
    fontSize: 15,
    color: '#666666',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  hint: {
    fontSize: 13,
    color: '#999999',
    marginTop: 8,
  },
  buttonContainer: {
    padding: 20,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButtonDisabled: {
    backgroundColor: '#FFB3B3',
    opacity: 0.5,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
});
