import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const myArticles = [
  {
    id: '1',
    title: 'Robe d\'été',
    price: '2500 fcfa',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
    sold: false,
  },
  {
    id: '2',
    title: 'Jean slim',
    price: '2000 fcfa',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
    sold: false,
  },
  {
    id: '3',
    title: 'Sac à main',
    price: '3000 fcfa',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80',
    sold: true,
  },
  {
    id: '4',
    title: 'Baskets',
    price: '4000 fcfa',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    sold: false,
  },
  {
    id: '5',
    title: 'Veste en cuir',
    price: '5500 fcfa',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    sold: false,
  },
  {
    id: '6',
    title: 'Chemise blanche',
    price: '1800 fcfa',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    sold: true,
  },
  {
    id: '7',
    title: 'Pantalon chino',
    price: '2200 fcfa',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',
    sold: false,
  },
  {
    id: '8',
    title: 'Lunettes de soleil',
    price: '1500 fcfa',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
    sold: false,
  },
];

type FilterType = 'all' | 'available' | 'sold';

export default function ProfileScreen() {
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [showAllArticles, setShowAllArticles] = useState(false);

  const filteredArticles = myArticles.filter(article => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'available') return !article.sold;
    if (selectedFilter === 'sold') return article.sold;
    return true;
  });

  const displayedArticles = showAllArticles ? filteredArticles : filteredArticles.slice(0, 4);
  const hasMoreArticles = filteredArticles.length > 4;

  const getFilterLabel = () => {
    switch (selectedFilter) {
      case 'all': return 'Tous';
      case 'available': return 'En vente';
      case 'sold': return 'Vendus';
      default: return 'Tous';
    }
  };

  const handleFilterSelect = (filter: FilterType) => {
    setSelectedFilter(filter);
    setShowFilterModal(false);
    setShowAllArticles(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header avec paramètres */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Section Identité */}
        <View style={styles.identitySection}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
              style={styles.avatar}
            />
            <View style={styles.editAvatarBadge}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.username}>@johndoe</Text>
          <Text style={styles.memberSince}>Membre depuis Janvier 2024</Text>
          <Text style={styles.location}>📍 Abidjan, Côte d'Ivoire</Text>
        </View>

        {/* Badges de Confiance */}
        <View style={styles.badgesSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>✓</Text>
            <Text style={styles.badgeText}>Email vérifié</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🏆</Text>
            <Text style={styles.badgeText}>Vendeur fiable</Text>
          </View>
        </View>

        {/* Bio / Description */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.bioText}>
            Fan de mode vintage et de marques éco-responsables. Je vends des pièces uniques et de qualité. N'hésitez pas à me contacter ! 💚
          </Text>
        </View>

        {/* Gestion du Compte */}
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Mon compte</Text>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/wallet')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>💰</Text>
              <View>
                <Text style={styles.menuItemTitle}>Mon Porte-Monnaie</Text>
                <Text style={styles.menuItemSubtitle}>Solde : 55 500 fcfa</Text>
              </View>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/my-purchases')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>📦</Text>
              <Text style={styles.menuItemTitle}>Mes Achats</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/my-sales')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>🏷️</Text>
              <Text style={styles.menuItemTitle}>Mes Ventes</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/favorites')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>❤️</Text>
              <Text style={styles.menuItemTitle}>Mes Favoris</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/help')}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.menuItemTitle}>Aide & Support</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Mes Articles en Vente */}
        <View style={styles.articlesSection}>
          <View style={styles.articlesSectionHeader}>
            <Text style={styles.sectionTitle}>Mes Articles ({filteredArticles.length})</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(true)}>
              <View style={styles.filterButtonContainer}>
                <Text style={styles.filterButton}>{getFilterLabel()}</Text>
                <Text style={styles.filterIcon}>▼</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.articlesGrid}>
            {displayedArticles.map((article) => (
              <TouchableOpacity key={article.id} style={styles.articleCard}>
                <Image source={{ uri: article.image }} style={styles.articleImage} />
                {article.sold && (
                  <View style={styles.soldBadge}>
                    <Text style={styles.soldBadgeText}>VENDU</Text>
                  </View>
                )}
                <View style={styles.articleInfo}>
                  <Text style={styles.articleTitle} numberOfLines={1}>
                    {article.title}
                  </Text>
                  <Text style={styles.articlePrice}>{article.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {hasMoreArticles && !showAllArticles && (
            <TouchableOpacity 
              style={styles.seeMoreButton}
              onPress={() => setShowAllArticles(true)}
            >
              <Text style={styles.seeMoreText}>Voir plus ({filteredArticles.length - 4} articles)</Text>
              <Text style={styles.seeMoreIcon}>↓</Text>
            </TouchableOpacity>
          )}

          {showAllArticles && hasMoreArticles && (
            <TouchableOpacity 
              style={styles.seeMoreButton}
              onPress={() => setShowAllArticles(false)}
            >
              <Text style={styles.seeMoreText}>Voir moins</Text>
              <Text style={styles.seeMoreIcon}>↑</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Modal */}
        <Modal
          visible={showFilterModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowFilterModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowFilterModal(false)}
          >
            <View style={styles.filterModalContent}>
              <Text style={styles.filterModalTitle}>Filtrer mes articles</Text>

              <TouchableOpacity 
                style={[styles.filterOption, selectedFilter === 'all' && styles.filterOptionSelected]}
                onPress={() => handleFilterSelect('all')}
              >
                <Text style={styles.filterOptionIcon}>📦</Text>
                <View style={styles.filterOptionTextContainer}>
                  <Text style={[styles.filterOptionText, selectedFilter === 'all' && styles.filterOptionTextSelected]}>
                    Tous les articles
                  </Text>
                  <Text style={styles.filterOptionCount}>{myArticles.length} articles</Text>
                </View>
                {selectedFilter === 'all' && <Text style={styles.filterCheckmark}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterOption, selectedFilter === 'available' && styles.filterOptionSelected]}
                onPress={() => handleFilterSelect('available')}
              >
                <Text style={styles.filterOptionIcon}>🏷️</Text>
                <View style={styles.filterOptionTextContainer}>
                  <Text style={[styles.filterOptionText, selectedFilter === 'available' && styles.filterOptionTextSelected]}>
                    En vente
                  </Text>
                  <Text style={styles.filterOptionCount}>
                    {myArticles.filter(a => !a.sold).length} articles
                  </Text>
                </View>
                {selectedFilter === 'available' && <Text style={styles.filterCheckmark}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterOption, selectedFilter === 'sold' && styles.filterOptionSelected]}
                onPress={() => handleFilterSelect('sold')}
              >
                <Text style={styles.filterOptionIcon}>✅</Text>
                <View style={styles.filterOptionTextContainer}>
                  <Text style={[styles.filterOptionText, selectedFilter === 'sold' && styles.filterOptionTextSelected]}>
                    Vendus
                  </Text>
                  <Text style={styles.filterOptionCount}>
                    {myArticles.filter(a => a.sold).length} articles
                  </Text>
                </View>
                {selectedFilter === 'sold' && <Text style={styles.filterCheckmark}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.filterModalClose}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.filterModalCloseText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Bouton Déconnexion */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  identitySection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    borderWidth: 3,
    borderColor: '#1B9876',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B9876',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editAvatarIcon: {
    fontSize: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: '#666666',
  },
  badgesSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1B9876',
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 13,
    color: '#1B9876',
    fontWeight: '600',
  },
  bioSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  accountSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#1B9876',
    fontWeight: '600',
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: '#999999',
  },
  articlesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  articlesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1B9876',
  },
  filterButton: {
    fontSize: 14,
    color: '#1B9876',
    fontWeight: '600',
    marginRight: 5,
  },
  filterIcon: {
    fontSize: 10,
    color: '#1B9876',
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  articleCard: {
    width: '48%',
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
  articleImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F5F5F5',
  },
  soldBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  soldBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  articleInfo: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  articlePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  logoutButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#F0F9F6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1B9876',
  },
  seeMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B9876',
    marginRight: 8,
  },
  seeMoreIcon: {
    fontSize: 16,
    color: '#1B9876',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterOptionSelected: {
    backgroundColor: '#F0F9F6',
    borderColor: '#1B9876',
  },
  filterOptionIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  filterOptionTextContainer: {
    flex: 1,
  },
  filterOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  filterOptionTextSelected: {
    color: '#1B9876',
  },
  filterOptionCount: {
    fontSize: 13,
    color: '#666666',
  },
  filterCheckmark: {
    fontSize: 20,
    color: '#1B9876',
    fontWeight: 'bold',
  },
  filterModalClose: {
    marginTop: 15,
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  filterModalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
});
