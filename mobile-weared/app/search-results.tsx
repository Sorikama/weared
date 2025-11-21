import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Modal, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// Même liste de produits
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

export default function SearchResultsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Filtrage des produits
  let filteredProducts = products;

  // Filtre par recherche
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filtre par taille
  if (selectedSize) {
    filteredProducts = filteredProducts.filter(product => product.size === selectedSize);
  }

  // Filtre par état
  if (selectedCondition) {
    filteredProducts = filteredProducts.filter(product => product.condition === selectedCondition);
  }

  // Filtre par prix
  if (priceMin) {
    filteredProducts = filteredProducts.filter(product => {
      const price = parseInt(product.price.replace(/\D/g, ''));
      return price >= parseInt(priceMin);
    });
  }
  if (priceMax) {
    filteredProducts = filteredProducts.filter(product => {
      const price = parseInt(product.price.replace(/\D/g, ''));
      return price <= parseInt(priceMax);
    });
  }

  // Tri
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceA - priceB;
    });
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceB - priceA;
    });
  }

  const handleResetFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedSize('');
    setSelectedCondition('');
    setSortBy('recent');
    setShowFilterModal(false);
  };

  const activeFiltersCount = 
    (priceMin ? 1 : 0) + 
    (priceMax ? 1 : 0) + 
    (selectedSize ? 1 : 0) + 
    (selectedCondition ? 1 : 0) + 
    (sortBy !== 'recent' ? 1 : 0);

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

      {/* Modale de filtres */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Prix */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Prix (fcfa)</Text>
                <View style={styles.priceRow}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Min"
                    placeholderTextColor="#999999"
                    value={priceMin}
                    onChangeText={setPriceMin}
                    keyboardType="numeric"
                  />
                  <Text style={styles.priceSeparator}>-</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Max"
                    placeholderTextColor="#999999"
                    value={priceMax}
                    onChangeText={setPriceMax}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Taille */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Taille</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.optionsRow}>
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[styles.optionChip, selectedSize === size && styles.optionChipActive]}
                        onPress={() => setSelectedSize(selectedSize === size ? '' : size)}
                      >
                        <Text style={[styles.optionChipText, selectedSize === size && styles.optionChipTextActive]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* État */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>État</Text>
                {['Très bon état', 'Bon état', 'État correct'].map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[styles.optionRow, selectedCondition === condition && styles.optionRowActive]}
                    onPress={() => setSelectedCondition(selectedCondition === condition ? '' : condition)}
                  >
                    <Text style={[styles.optionRowText, selectedCondition === condition && styles.optionRowTextActive]}>
                      {condition}
                    </Text>
                    {selectedCondition === condition && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Trier par */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Trier par</Text>
                {[
                  { value: 'recent', label: 'Plus récents' },
                  { value: 'price-asc', label: 'Prix croissant' },
                  { value: 'price-desc', label: 'Prix décroissant' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.optionRow, sortBy === option.value && styles.optionRowActive]}
                    onPress={() => setSortBy(option.value)}
                  >
                    <Text style={[styles.optionRowText, sortBy === option.value && styles.optionRowTextActive]}>
                      {option.label}
                    </Text>
                    {sortBy === option.value && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Boutons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilterModal(false)}>
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
            {activeFiltersCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Résultats */}
      {filteredProducts.length > 0 ? (
        <>
          <Text style={styles.resultsCount}>
            {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.productsGrid}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? `Aucun produit ne correspond à "${searchQuery}"` : 'Essayez de modifier vos filtres'}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    gap: 10,
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
  searchContainer: {
    flex: 1,
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
    position: 'relative',
  },
  filterIcon: {
    fontSize: 20,
  },
  filterBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 20,
    marginBottom: 10,
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
  // Styles modale (identiques à l'accueil)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalClose: {
    fontSize: 28,
    color: '#666666',
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#F9F9F9',
  },
  priceSeparator: {
    fontSize: 18,
    color: '#666666',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionChipActive: {
    backgroundColor: '#F0F9F6',
    borderColor: '#1B9876',
  },
  optionChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  optionChipTextActive: {
    color: '#1B9876',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    marginBottom: 8,
  },
  optionRowActive: {
    backgroundColor: '#F0F9F6',
  },
  optionRowText: {
    fontSize: 15,
    color: '#666666',
  },
  optionRowTextActive: {
    color: '#1B9876',
    fontWeight: '600',
  },
  checkIcon: {
    fontSize: 18,
    color: '#1B9876',
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1B9876',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});