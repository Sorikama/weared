import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Même liste de produits que sur la page d'accueil
const products = [
  {
    id: '1',
    title: 'T-Shirt',
    size: 'XL',
    condition: 'Très bon état',
    price: '1000 fcfa',
    seller: 'admin2153',
    category: 'Homme',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    id: '2',
    title: 'Chemise',
    size: 'L',
    condition: 'Très bon état',
    price: '1500 fcfa',
    seller: 'johndoe01',
    category: 'Homme',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
  },
  {
    id: '3',
    title: 'Jean',
    size: 'M',
    condition: 'Bon état',
    price: '2000 fcfa',
    seller: 'fashion_lover',
    category: 'Homme',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  },
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
    id: '5',
    title: 'Jupe',
    size: 'S',
    condition: 'Très bon état',
    price: '1200 fcfa',
    seller: 'weared_shop',
    category: 'Femme',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80',
  },
  {
    id: '6',
    title: 'Blouse',
    size: 'M',
    condition: 'Bon état',
    price: '1800 fcfa',
    seller: 'vintage_style',
    category: 'Femme',
    image: 'https://images.unsplash.com/photo-1564257577-d18b7c1a4095?w=400&q=80',
  },
  {
    id: '7',
    title: 'T-Shirt Enfant',
    size: '8 ans',
    condition: 'Très bon état',
    price: '800 fcfa',
    seller: 'kids_fashion',
    category: 'Enfant',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80',
  },
  {
    id: '8',
    title: 'Short Enfant',
    size: '10 ans',
    condition: 'Bon état',
    price: '600 fcfa',
    seller: 'baby_store',
    category: 'Enfant',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80',
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
    id: '10',
    title: 'Ceinture',
    size: 'Ajustable',
    condition: 'Bon état',
    price: '500 fcfa',
    seller: 'style_king',
    category: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&q=80',
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
  {
    id: '12',
    title: 'Sandales',
    size: '38',
    condition: 'Bon état',
    price: '1500 fcfa',
    seller: 'shoe_store',
    category: 'Chaussures',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80',
  },
];

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  // Filtrer les produits par catégorie
  const filteredProducts = products.filter(product => product.category === name);

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}` as any)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
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
      
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Grille de produits */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyText}>Aucun produit dans cette catégorie</Text>
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
    paddingBottom: 100,
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
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
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
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
});