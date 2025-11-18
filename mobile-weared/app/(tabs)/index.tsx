import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const categories = ['Homme', 'Femme', 'Enfant', 'Accessoires', 'Chaussures'];

const products = [
  {
    id: '1',
    title: 'T-Shirt',
    size: 'XL',
    condition: 'Très bon état',
    price: '1000 fcfa',
    seller: 'admin2153',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    id: '2',
    title: 'T-Shirt',
    size: 'L',
    condition: 'Très bon état',
    price: '1000 fcfa',
    seller: 'johndoe01',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
  },
  {
    id: '3',
    title: 'T-Shirt',
    size: 'M',
    condition: 'Bon état',
    price: '1000 fcfa',
    seller: 'fashion_lover',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
  },
  {
    id: '4',
    title: 'T-Shirt',
    size: 'XL',
    condition: 'Très bon état',
    price: '1000 fcfa',
    seller: 'style_king',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
  },
  {
    id: '5',
    title: 'T-Shirt',
    size: 'L',
    condition: 'Très bon état',
    price: '1000 fcfa',
    seller: 'weared_shop',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
  },
  {
    id: '6',
    title: 'T-Shirt',
    size: 'M',
    condition: 'Bon état',
    price: '1000 fcfa',
    seller: 'vintage_style',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80',
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Homme');
  const [searchQuery, setSearchQuery] = useState('');

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
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
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
