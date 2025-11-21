import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const transactions = [
  { id: '1', type: 'credit', amount: '2500 fcfa', description: 'Vente - Robe', date: '15 Nov 2024' },
  { id: '2', type: 'debit', amount: '1000 fcfa', description: 'Achat - T-Shirt', date: '14 Nov 2024' },
  { id: '3', type: 'credit', amount: '4000 fcfa', description: 'Vente - Baskets', date: '12 Nov 2024' },
  { id: '4', type: 'withdrawal', amount: '50000 fcfa', description: 'Retrait Mobile Money', date: '10 Nov 2024' },
];

export default function WalletScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Porte-Monnaie</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceAmount}>55 500 fcfa</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Retirer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  transaction.type === 'credit' && styles.transactionIconCredit,
                  transaction.type === 'debit' && styles.transactionIconDebit,
                  transaction.type === 'withdrawal' && styles.transactionIconWithdrawal,
                ]}>
                  <Text style={styles.transactionIconText}>
                    {transaction.type === 'credit' ? '↓' : transaction.type === 'debit' ? '↑' : '💳'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'credit' && styles.transactionAmountCredit,
                transaction.type === 'debit' && styles.transactionAmountDebit,
              ]}>
                {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  balanceCard: {
    backgroundColor: '#1B9876',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B9876',
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
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconCredit: {
    backgroundColor: '#E8F5F1',
  },
  transactionIconDebit: {
    backgroundColor: '#FFE8E8',
  },
  transactionIconWithdrawal: {
    backgroundColor: '#FFF4E6',
  },
  transactionIconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmountCredit: {
    color: '#1B9876',
  },
  transactionAmountDebit: {
    color: '#FF6B6B',
  },
});