import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomModal } from '@/components/custom-modal';

export default function ChangeEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('johndoe@example.com');
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <CustomModal
        visible={showModal}
        onClose={() => { setShowModal(false); router.back(); }}
        title="Email modifié !"
        message="Votre adresse email a été mise à jour"
        type="success"
      />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adresse email</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email actuel</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => setShowModal(true)}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: '#FFFFFF' },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 32, color: '#1B9876', fontWeight: '300' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000000' },
  placeholder: { width: 40 },
  form: { backgroundColor: '#FFFFFF', padding: 20, marginTop: 10 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15, color: '#000000', backgroundColor: '#F9F9F9' },
  saveButton: { backgroundColor: '#1B9876', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});