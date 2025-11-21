import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const favoriteProducts = [
  {
    id: '4',
    title: 'Robe',
    size: 'M',
    condition: 'Très bon état',
    price: '2500 fcfa',
    seller: 'style_queen',
    category: 'Femme',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
  },
  {
    id: '9',
    title: 'Sac à main',
    size: 'Unique',
    condition: 'Très bon état',
    price: '3000 fcfa',
    seller: 'accessories_pro',
    category: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80',
  },
  {
    id: '11',
    title: 'Baskets',
    size: '42',
    condition: 'Très bon état',
    price: '4000 fcfa',
    seller: 'sneaker_head',
    category: 'Chaussures',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  },
];

export default function FavoritesScreen() {
  const router = useRouter();

  const renderProduct = ({ item }: { item: typeof favoriteProducts[0] }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}` as any)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeIcon}>✕</Text>
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDetails}>
          Taille {item.size} - {item.condition}
        </Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <View style={styles.sellerContainer}>
          <View style={styles.sellerAvatar}>
            <Text style={styles.sellerAvatarText}>{item.seller[0].toUpperCase()}</Text>
          </View>
          <Text style={styles.sellerName}>{item.seller}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
        <View style={styles.placeholder} />
      </View>

      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
          <Text style={styles.emptySubtext}>
            Ajoutez des articles à vos favoris pour les retrouver facilement
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  productsGrid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B9876',
    marginBottom: 10,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1B9876',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sellerAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sellerName: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
});