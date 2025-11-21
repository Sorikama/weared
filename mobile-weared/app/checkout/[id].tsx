import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { CustomModal } from '@/components/custom-modal';

const deliveryMethods = [
  { id: '1', name: 'Livraison à domicile', price: '2000 fcfa', time: '2-3 jours' },
  { id: '2', name: 'Point de retrait', price: '1000 fcfa', time: '1-2 jours' },
  { id: '3', name: 'Rencontre en personne', price: 'Gratuit', time: 'À convenir' },
];

const paymentMethods = [
  { id: '1', name: 'Mobile Money', icon: '📱' },
  { id: '2', name: 'Carte bancaire', icon: '💳' },
  { id: '3', name: 'Paiement à la livraison', icon: '💵' },
];

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selectedDelivery, setSelectedDelivery] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('1');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // Mock product data
  const product = {
    title: 'T-Shirt Vintage',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    seller: 'admin2153',
  };

  const deliveryPrice = selectedDelivery === '1' ? 2000 : selectedDelivery === '2' ? 1000 : 0;
  const total = product.price + deliveryPrice;

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez entrer votre adresse de livraison',
        type: 'error',
      });
      setShowModal(true);
      return;
    }
    if (!phone.trim()) {
      setModalConfig({
        title: 'Erreur',
        message: 'Veuillez entrer votre numéro de téléphone',
        type: 'error',
      });
      setShowModal(true);
      return;
    }

    setModalConfig({
      title: 'Commande confirmée ! 🎉',
      message: `Votre commande a été passée avec succès.\n\nTotal: ${total} fcfa\n\nVous recevrez une confirmation par SMS.`,
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Récapitulatif produit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article</Text>
          <View style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productSeller}>Vendu par {product.seller}</Text>
              <Text style={styles.productPrice}>{product.price} fcfa</Text>
            </View>
          </View>
        </View>

        {/* Adresse de livraison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse de livraison</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre adresse complète"
            placeholderTextColor="#999999"
            value={address}
            onChangeText={setAddress}
            multiline
          />
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder="Numéro de téléphone"
            placeholderTextColor="#999999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Mode de livraison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de livraison</Text>
          {deliveryMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.optionCard, selectedDelivery === method.id && styles.optionCardSelected]}
              onPress={() => setSelectedDelivery(method.id)}
            >
              <View style={styles.radioButton}>
                {selectedDelivery === method.id && <View style={styles.radioButtonInner} />}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionName}>{method.name}</Text>
                <Text style={styles.optionTime}>{method.time}</Text>
              </View>
              <Text style={styles.optionPrice}>{method.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mode de paiement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.optionCard, selectedPayment === method.id && styles.optionCardSelected]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.radioButton}>
                {selectedPayment === method.id && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentIcon}>{method.icon}</Text>
              <Text style={styles.optionName}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Récapitulatif des prix */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récapitulatif</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Prix de l'article</Text>
              <Text style={styles.summaryValue}>{product.price} fcfa</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frais de livraison</Text>
              <Text style={styles.summaryValue}>{deliveryPrice} fcfa</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelTotal}>Total</Text>
              <Text style={styles.summaryValueTotal}>{total} fcfa</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer avec bouton de confirmation */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total à payer</Text>
          <Text style={styles.footerTotalValue}>{total} fcfa</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirmer la commande</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  productSeller: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#F9F9F9',
  },
  inputMargin: {
    marginTop: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#1B9876',
    backgroundColor: '#F0F9F6',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1B9876',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1B9876',
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  optionTime: {
    fontSize: 13,
    color: '#666666',
  },
  optionPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  summaryCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  summaryLabelTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  summaryValueTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  footerTotalLabel: {
    fontSize: 16,
    color: '#666666',
  },
  footerTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B9876',
  },
  confirmButton: {
    backgroundColor: '#1B9876',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});