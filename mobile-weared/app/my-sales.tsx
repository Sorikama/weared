import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const sales = [
  {
    id: '1',
    title: 'Robe',
    price: '2500 fcfa',
    status: 'sold',
    statusText: 'Vendu',
    date: '15 Nov 2024',
    buyer: 'Marie.kp',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
  },
  {
    id: '2',
    title: 'Jean slim',
    price: '2000 fcfa',
    status: 'active',
    statusText: 'En vente',
    date: '10 Nov 2024',
    buyer: null,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  },
];

export default function MySalesScreen() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    if (status === 'sold') return '#1B9876';
    if (status === 'active') return '#4A90E2';
    return '#666666';
  };

  const renderSale = ({ item }: { item: typeof sales[0] }) => (
    <TouchableOpacity style={styles.saleCard}>
      <Image source={{ uri: item.image }} style={styles.saleImage} />
      <View style={styles.saleInfo}>
        <Text style={styles.saleTitle}>{item.title}</Text>
        <Text style={styles.salePrice}>{item.price}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.statusText}
          </Text>
        </View>
        {item.buyer && (
          <Text style={styles.buyerText}>Acheteur: {item.buyer}</Text>
        )}
        <Text style={styles.saleDate}>{item.date}</Text>
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
        <Text style={styles.headerTitle}>Mes Ventes</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={sales}
        renderItem={renderSale}
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
  saleCard: {
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
  saleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  saleInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  saleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  salePrice: {
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
  buyerText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  saleDate: {
    fontSize: 12,
    color: '#666666',
  },
});