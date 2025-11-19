import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const categories = ['Tous', 'Homme', 'Femme', 'Enfant', 'Accessoires', 'Chaussures'];

const products = [
  // Homme
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
  // Femme
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
  // Enfant
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
  // Accessoires
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
  // Chaussures
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

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity style={styles.productCard}>
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
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une robe, t-shirt..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
        key={selectedCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  filterButton: {
    padding: 5,
  },
  filterIcon: {
    fontSize: 20,
  },
  categoriesSection: {
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#1B9876',
  },
  categoryText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
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
});
