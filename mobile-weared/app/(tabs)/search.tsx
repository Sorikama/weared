import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const categories = [
  { id: '1', name: 'Femme', icon: '👗', key: 'Femme' },
  { id: '2', name: 'Homme', icon: '👔', key: 'Homme' },
  { id: '3', name: 'Enfant', icon: '👶', key: 'Enfant' },
  { id: '4', name: 'Accessoires', icon: '👜', key: 'Accessoires' },
  { id: '5', name: 'Chaussures', icon: '👟', key: 'Chaussures' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleCategoryPress = (categoryKey: string) => {
    router.push(`/category/${categoryKey}` as any);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push('/search-results');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header avec barre de recherche */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recherche</Text>
        
        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={() => router.push('/search-results')}
          activeOpacity={0.7}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Rechercher une robe, t-shirt...</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des catégories */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Catégories</Text>
        
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.key)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryLeft}>
              <View style={styles.iconContainer}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
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
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999999',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    marginTop: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F9F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  arrowIcon: {
    fontSize: 32,
    color: '#1B9876',
    fontWeight: '300',
  },
});
