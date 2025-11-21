import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';

const conversations = [
  {
    id: '1',
    username: 'Marie.kp',
    lastMessage: "Bonjour l'article est-il ...",
    unreadCount: 2,
    isOnline: true,
    isUnread: true,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    username: 'Reine',
    lastMessage: "Merci j'attend le livreur alors",
    unreadCount: 1,
    isOnline: true,
    isUnread: true,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    username: 'Romaric',
    lastMessage: 'Ça me va. On peut se rencontrer...',
    unreadCount: 2,
    isOnline: true,
    isUnread: true,
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '4',
    username: 'Harry',
    lastMessage: 'Super, merci pour les infos',
    unreadCount: 2,
    isOnline: true,
    isUnread: true,
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: '5',
    username: 'Marie.kp',
    lastMessage: 'Ok parfait, à bientôt',
    unreadCount: 0,
    isOnline: false,
    isUnread: false,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '6',
    username: 'Sophie',
    lastMessage: "L'article est toujours disponible ?",
    unreadCount: 0,
    isOnline: false,
    isUnread: false,
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  const handleConversationPress = (username: string) => {
    router.push(`/chat/${username}`);
  };

  const handleSearchToggle = () => {
    console.log('Search button clicked, current state:', showSearch);
    const newState = !showSearch;
    setShowSearch(newState);
    if (newState) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversation = ({ item }: { item: typeof conversations[0] }) => (
    <TouchableOpacity
      style={[styles.conversationCard, item.isUnread && styles.conversationUnread]}
      onPress={() => handleConversationPress(item.username)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.conversationContent}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messagerie</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchToggle}>
          <Text style={styles.searchIcon}>{showSearch ? '✕' : '🔍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchInputIcon}>🔍</Text>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Rechercher une conversation..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          {searchQuery.length > 0 && (
            <Text style={styles.searchResultText}>
              {filteredConversations.length} résultat{filteredConversations.length > 1 ? 's' : ''}
            </Text>
          )}
        </View>
      )}

      {/* Liste des conversations */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Aucune conversation trouvée</Text>
            <Text style={styles.emptySubtext}>
              Essayez avec un autre nom ou message
            </Text>
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  conversationUnread: {
    backgroundColor: '#F0F9F6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1B9876',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1B9876',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#1B9876',
  },
  searchResultText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 8,
    marginLeft: 5,
  },
  searchInputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  clearIcon: {
    fontSize: 18,
    color: '#999999',
    paddingLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
    opacity: 0.3,
  },
  emptyText: {
    fontSize: 18,
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
