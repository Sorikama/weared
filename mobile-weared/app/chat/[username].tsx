import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Modal, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import EmojiSelector from 'react-native-emoji-selector';

type Message = {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: string;
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: "Bonjour, l'article est-il toujours disponible ?",
    isMine: false,
    timestamp: '10:30',
  },
  {
    id: '2',
    text: 'Oui, il y a la boîte, le chargeur d\'origine et une coque en plus.',
    isMine: true,
    timestamp: '10:32',
  },
  {
    id: '3',
    text: 'Super. Vous êtes ferme sur le prix à 250 € ?',
    isMine: false,
    timestamp: '10:35',
  },
  {
    id: '4',
    text: 'Je peux descendre à 230 €, mais pas plus bas.',
    isMine: true,
    timestamp: '10:37',
  },
  {
    id: '5',
    text: 'Ça me va. On peut se rencontrer cet après-midi ?',
    isMine: false,
    timestamp: '10:40',
  },
];

export default function ChatScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isMine: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputText(inputText + emoji);
  };

  const handlePickImage = async () => {
    setShowAttachMenu(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      // Ajouter l'image aux messages
      const newMessage: Message = {
        id: Date.now().toString(),
        text: '📷 Image envoyée',
        isMine: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handlePickDocument = async () => {
    setShowAttachMenu(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (!result.canceled) {
        const newMessage: Message = {
          id: Date.now().toString(),
          text: '📎 Document envoyé',
          isMine: true,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage]);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.isMine && styles.messageRowMine]}>
      {!item.isMine && (
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.messageAvatar}
        />
      )}
      <View style={[styles.messageBubble, item.isMine ? styles.messageBubbleMine : styles.messageBubbleOther]}>
        <Text style={[styles.messageText, item.isMine && styles.messageTextMine]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{username}</Text>
        <TouchableOpacity style={styles.infoButton} onPress={() => setShowInfoModal(true)}>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      {/* Info Modal */}
      <Modal
        visible={showInfoModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowInfoModal(false)}
        >
          <View style={styles.infoModalContent}>
            <View style={styles.infoModalHeader}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.infoModalAvatar}
              />
              <Text style={styles.infoModalName}>{username}</Text>
            </View>

            <TouchableOpacity style={styles.infoModalItem}>
              <Text style={styles.infoModalIcon}>👤</Text>
              <Text style={styles.infoModalText}>Voir le profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoModalItem}>
              <Text style={styles.infoModalIcon}>🔕</Text>
              <Text style={styles.infoModalText}>Désactiver les notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoModalItem}>
              <Text style={styles.infoModalIcon}>🗑️</Text>
              <Text style={styles.infoModalText}>Supprimer la conversation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.infoModalItem, styles.infoModalItemDanger]}>
              <Text style={styles.infoModalIcon}>🚫</Text>
              <Text style={[styles.infoModalText, styles.infoModalTextDanger]}>Bloquer l'utilisateur</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.infoModalClose}
              onPress={() => setShowInfoModal(false)}
            >
              <Text style={styles.infoModalCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Messages */}
      <View style={styles.chatContainer}>
        <View style={styles.dateLabel}>
          <Text style={styles.dateLabelText}>Aujourd'hui</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <EmojiSelector
            onEmojiSelected={handleEmojiSelect}
            showSearchBar={false}
            showSectionTitles={true}
            showHistory={true}
            columns={8}
            category={undefined}
          />
        </View>
      )}

      {/* Attach Menu */}
      {showAttachMenu && (
        <View style={styles.attachMenuContainer}>
          <TouchableOpacity style={styles.attachMenuItem} onPress={handlePickImage}>
            <View style={styles.attachMenuIconContainer}>
              <Text style={styles.attachMenuIcon}>📷</Text>
            </View>
            <Text style={styles.attachMenuText}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.attachMenuItem} onPress={handlePickDocument}>
            <View style={styles.attachMenuIconContainer}>
              <Text style={styles.attachMenuIcon}>📎</Text>
            </View>
            <Text style={styles.attachMenuText}>Document</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.attachMenuItem}>
            <View style={styles.attachMenuIconContainer}>
              <Text style={styles.attachMenuIcon}>📍</Text>
            </View>
            <Text style={styles.attachMenuText}>Localisation</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={() => {
            setShowAttachMenu(!showAttachMenu);
            setShowEmojiPicker(false);
          }}
        >
          <Text style={styles.attachIcon}>+</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Message ..."
          placeholderTextColor="#999999"
          value={inputText}
          onChangeText={setInputText}
          multiline
          onFocus={() => {
            setShowEmojiPicker(false);
            setShowAttachMenu(false);
          }}
        />

        <TouchableOpacity 
          style={styles.emojiButton}
          onPress={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowAttachMenu(false);
          }}
        >
          <Text style={styles.emojiIcon}>😀</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor: '#E8F5F1',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
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
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 20,
    color: '#1B9876',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -15,
    paddingTop: 20,
  },
  dateLabel: {
    alignSelf: 'center',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateLabelText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  messagesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#E0E0E0',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
  },
  messageBubbleOther: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageBubbleMine: {
    backgroundColor: '#1B9876',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 20,
  },
  messageTextMine: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  attachIcon: {
    fontSize: 24,
    color: '#666666',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000000',
    maxHeight: 100,
  },
  emojiButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emojiIcon: {
    fontSize: 24,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1B9876',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  infoModalHeader: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 15,
  },
  infoModalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  infoModalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoModalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoModalItemDanger: {
    borderBottomWidth: 0,
  },
  infoModalIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  infoModalText: {
    fontSize: 16,
    color: '#000000',
  },
  infoModalTextDanger: {
    color: '#FF6B6B',
  },
  infoModalClose: {
    marginTop: 15,
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  infoModalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  emojiPickerContainer: {
    height: 300,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachMenuContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachMenuItem: {
    alignItems: 'center',
  },
  attachMenuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  attachMenuIcon: {
    fontSize: 28,
  },
  attachMenuText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
});