import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { CustomModal } from '@/components/custom-modal';

const categories = ['Femme', 'Homme', 'Enfant', 'Accessoires', 'Chaussures'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unique', '6 ans', '8 ans', '10 ans', '12 ans', '36', '38', '40', '42', '44', '46'];
const conditions = ['Neuf avec étiquette', 'Très bon état', 'Bon état', 'État correct'];

export default function AddScreen() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [showConditionPicker, setShowConditionPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      setModalConfig({
        title: 'Permission requise',
        message: 'Nous avons besoin de la permission pour accéder à vos photos',
        type: 'warning',
      });
      setShowModal(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    // Validation
    if (!title.trim()) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez entrer un titre',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (!description.trim()) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez entrer une description',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez entrer un prix valide',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (!selectedCategory) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez sélectionner une catégorie',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (!selectedSize) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez sélectionner une taille',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (!selectedCondition) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez sélectionner un état',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (images.length === 0) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez ajouter au moins une photo',
        type: 'error',
      });
      setShowModal(true);
      return;
    }

    // Créer le nouveau produit
    const newProduct = {
      id: Date.now().toString(),
      title,
      description,
      price: `${price} fcfa`,
      category: selectedCategory,
      size: selectedSize,
      condition: selectedCondition,
      image: images[0],
      seller: 'Vous',
    };

    // TODO: Ajouter le produit à une base de données ou state global
    console.log('Nouveau produit:', newProduct);

    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setPrice('');
    setSelectedCategory('');
    setSelectedSize('');
    setSelectedCondition('');
    setImages([]);

    setModalConfig({
      title: 'Succès ! 🎉',
      message: 'Votre article a été publié avec succès',
      type: 'success',
    });
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Modal personnalisée */}
      <CustomModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          if (modalConfig.type === 'success') {
            router.push('/(tabs)');
          }
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText="OK"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vendre un article</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Ajout de Média */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.imagesContainer}>
              {/* Bouton Ajouter */}
              <TouchableOpacity 
                style={styles.addImageBox}
                onPress={pickImage}
              >
                <View style={styles.addImageIcon}>
                  <Text style={styles.addImageIconText}>🖼️</Text>
                  <Text style={styles.plusIcon}>+</Text>
                </View>
                <Text style={styles.addImageText}>Ajouter</Text>
              </TouchableOpacity>

              {/* Images ajoutées */}
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri }} style={styles.previewImage} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeImageText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Titre */}
        <View style={styles.section}>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Robe d'été fleurie"
            placeholderTextColor="#999999"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Décris ton article en détail..."
            placeholderTextColor="#999999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Prix */}
        <View style={styles.section}>
          <Text style={styles.label}>Prix</Text>
          <View style={styles.priceContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="0"
              placeholderTextColor="#999999"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <Text style={styles.currency}>FCFA</Text>
          </View>
        </View>

        {/* Catégorie */}
        <View style={styles.section}>
          <Text style={styles.label}>Catégorie</Text>
          <TouchableOpacity 
            style={styles.picker}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={[styles.pickerText, !selectedCategory && styles.placeholder]}>
              {selectedCategory || 'Sélectionner une catégorie'}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          
          {showCategoryPicker && (
            <View style={styles.pickerOptions}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.pickerOption}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.pickerOptionText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Taille */}
        <View style={styles.section}>
          <Text style={styles.label}>Taille</Text>
          <TouchableOpacity 
            style={styles.picker}
            onPress={() => setShowSizePicker(!showSizePicker)}
          >
            <Text style={[styles.pickerText, !selectedSize && styles.placeholder]}>
              {selectedSize || 'Sélectionner une taille'}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          
          {showSizePicker && (
            <View style={styles.pickerOptions}>
              <ScrollView style={styles.pickerScroll} nestedScrollEnabled>
                {sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={styles.pickerOption}
                    onPress={() => {
                      setSelectedSize(size);
                      setShowSizePicker(false);
                    }}
                  >
                    <Text style={styles.pickerOptionText}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* État */}
        <View style={styles.section}>
          <Text style={styles.label}>État</Text>
          <TouchableOpacity 
            style={styles.picker}
            onPress={() => setShowConditionPicker(!showConditionPicker)}
          >
            <Text style={[styles.pickerText, !selectedCondition && styles.placeholder]}>
              {selectedCondition || "Sélectionner l'état"}
            </Text>
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
          
          {showConditionPicker && (
            <View style={styles.pickerOptions}>
              {conditions.map((cond) => (
                <TouchableOpacity
                  key={cond}
                  style={styles.pickerOption}
                  onPress={() => {
                    setSelectedCondition(cond);
                    setShowConditionPicker(false);
                  }}
                >
                  <Text style={styles.pickerOptionText}>{cond}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Bouton Publier */}
        <TouchableOpacity 
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <Text style={styles.publishButtonText}>Publier l'article</Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  addImageBox: {
    width: 120,
    height: 150,
    borderWidth: 2,
    borderColor: '#1B9876',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FFFD',
  },
  addImageIcon: {
    alignItems: 'center',
    marginBottom: 10,
  },
  addImageIconText: {
    fontSize: 40,
  },
  plusIcon: {
    fontSize: 24,
    color: '#1B9876',
    fontWeight: 'bold',
    marginTop: -10,
  },
  addImageText: {
    fontSize: 14,
    color: '#1B9876',
    fontWeight: '600',
  },
  imagePreview: {
    width: 120,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    paddingRight: 15,
  },
  priceInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: '#F9F9F9',
  },
  pickerText: {
    fontSize: 16,
    color: '#000000',
  },
  placeholder: {
    color: '#999999',
  },
  pickerArrow: {
    fontSize: 12,
    color: '#666666',
  },
  pickerOptions: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerOption: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  publishButton: {
    backgroundColor: '#1B9876',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
