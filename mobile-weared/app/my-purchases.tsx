import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const purchases = [
  {
    id: '1',
    title: 'T-Shirt Vintage',
    price: '1000 fcfa',
    status: 'delivered',
    statusText: 'Livré',
    date: '14 Nov 2024',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    id: '2',
    title: 'Jean Slim',
    price: '2000 fcfa',
    status: 'in-transit',
    statusText: 'En cours',
    date: '18 Nov 2024',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  },
];

export default function MyPurchasesScreen() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    if (status === 'delivered') return '#1B9876';
    if (status === 'in-transit') return '#FFA500';
    return '#666666';
  };

  const renderPurchase = ({ item }: { item: typeof purchases[0] }) => (
    <TouchableOpacity style={styles.purchaseCard}>
      <Image source={{ uri: item.image }} style={styles.purchaseImage} />
      <View style={styles.purchaseInfo}>
        <Text style={styles.purchaseTitle}>{item.title}</Text>
        <Text style={styles.purchasePrice}>{item.price}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.statusText}
          </Text>
        </View>
        <Text style={styles.purchaseDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Achats</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={purchases}
        renderItem={renderPurchase}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    padding: 20,
  },
  purchaseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purchaseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  purchaseInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  purchasePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B9876',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  purchaseDate: {
    fontSize: 12,
    color: '#666666',
  },
});