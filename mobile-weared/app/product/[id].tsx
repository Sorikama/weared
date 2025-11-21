import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomModal } from '@/components/custom-modal';

const { width } = Dimensions.get('window');

// Mock data - en production, tu récupérerais ça depuis une API
const productDetails = {
  id: '1',
  title: 'T-Shirt Vintage',
  price: '1000 fcfa',
  description: 'Magnifique t-shirt vintage en excellent état. Porté seulement 2 fois. Matière 100% coton de qualité supérieure. Coupe moderne et confortable.',
  size: 'XL',
  condition: 'Très bon état',
  category: 'Homme',
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
  ],
  seller: {
    name: 'admin2153',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.8,
    reviews: 125,
  },
};

const similarProducts = [
  {
    id: '2',
    title: 'Chemise',
    price: '1500 fcfa',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
  },
  {
    id: '3',
    title: 'Jean',
    price: '2000 fcfa',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleBuyNow = () => {
    router.push(`/checkout/${id}`);
  };

  const handleContactSeller = () => {
    router.push(`/chat/${productDetails.seller.name}`);
  };

  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    setModalConfig({
      title: newFavoriteState ? 'Ajouté aux favoris ❤️' : 'Retiré des favoris',
      message: newFavoriteState 
        ? 'Article ajouté à vos favoris avec succès' 
        : 'Article retiré de vos favoris',
      type: newFavoriteState ? 'success' : 'info',
    });
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Modal personnalisée */}
      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText="OK"
      />

      {/* Header fixe */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Galerie d'images */}
        <View style={styles.imageGallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {productDetails.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>

          {/* Indicateurs de pagination */}
          <View style={styles.pagination}>
            {productDetails.images.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, currentImageIndex === index && styles.paginationDotActive]}
              />
            ))}
          </View>
        </View>

        {/* Informations produit */}
        <View style={styles.contentSection}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{productDetails.price}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{productDetails.category}</Text>
            </View>
          </View>

          <Text style={styles.title}>{productDetails.title}</Text>

          {/* Détails rapides */}
          <View style={styles.quickDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Taille</Text>
              <Text style={styles.detailValue}>{productDetails.size}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>État</Text>
              <Text style={styles.detailValue}>{productDetails.condition}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{productDetails.description}</Text>
          </View>

          {/* Profil du vendeur */}
          <View style={styles.sellerSection}>
            <Text style={styles.sectionTitle}>Vendeur</Text>
            <TouchableOpacity style={styles.sellerCard}>
              <Image source={{ uri: productDetails.seller.avatar }} style={styles.sellerAvatar} />
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>{productDetails.seller.name}</Text>
                <View style={styles.sellerRating}>
                  <Text style={styles.ratingStars}>⭐ {productDetails.seller.rating}</Text>
                  <Text style={styles.ratingCount}>({productDetails.seller.reviews} avis)</Text>
                </View>
              </View>
              <Text style={styles.sellerArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Articles similaires */}
          <View style={styles.similarSection}>
            <Text style={styles.sectionTitle}>Articles similaires</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.similarProducts}>
                {similarProducts.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.similarCard}
                    onPress={() => router.push(`/product/${product.id}`)}
                  >
                    <Image source={{ uri: product.image }} style={styles.similarImage} />
                    <Text style={styles.similarTitle} numberOfLines={1}>
                      {product.title}
                    </Text>
                    <Text style={styles.similarPrice}>{product.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Footer fixe avec boutons d'action */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactSeller}>
          <Text style={styles.contactButtonText}>💬 Contacter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Acheter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 32,
    color: '#1B9876',
    fontWeight: '300',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  imageGallery: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: width * 1.2,
    backgroundColor: '#F5F5F5',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  contentSection: {
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  categoryBadge: {
    backgroundColor: '#F0F9F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryBadgeText: {
    fontSize: 13,
    color: '#1B9876',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  quickDetails: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25,
  },
  detailItem: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  descriptionSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  sellerSection: {
    marginBottom: 25,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingStars: {
    fontSize: 14,
    color: '#000000',
  },
  ratingCount: {
    fontSize: 13,
    color: '#666666',
  },
  sellerArrow: {
    fontSize: 24,
    color: '#999999',
  },
  similarSection: {
    marginBottom: 20,
  },
  similarProducts: {
    flexDirection: 'row',
    gap: 12,
  },
  similarCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  similarImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  similarTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    padding: 10,
    paddingBottom: 5,
  },
  similarPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B9876',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#F0F9F6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B9876',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#1B9876',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});