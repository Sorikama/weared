import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const languages = ['Français', 'English', 'Español'];

export default function LanguageScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}></Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Langue</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView>
        {languages.map((lang) => (
          <TouchableOpacity key={lang} style={styles.item}>
            <Text style={styles.itemText}>{lang}</Text>
            {lang === 'Français' && <Text style={styles.check}></Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  itemText: { fontSize: 16, color: '#000000' },
  check: { fontSize: 20, color: '#1B9876', fontWeight: 'bold' },
});
