import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useData } from '../Utils/DataContext';

export default function ExpenseList() {
  const { expenses, deleteExpense, editExpense, categories } = useData();
  const [editingExpense, setEditingExpense] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('Food');
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteExpense(id);
            Alert.alert("Success", "Expense deleted successfully!");
          }
        }
      ]
    );
  };

  const handleEdit = (item) => {
    setEditingExpense(item);
    setEditDescription(item.desc);
    setEditAmount(item.amount.toString());
    setEditCategory(item.category);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editDescription.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    
    if (!editAmount || parseFloat(editAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const updatedExpense = {
      desc: editDescription,
      amount: parseFloat(editAmount),
      category: editCategory,
      emoji: categories.find(cat => cat.name === editCategory)?.emoji || '📦'
    };

    editExpense(editingExpense.id, updatedExpense);
    
    Alert.alert('Success', 'Expense updated successfully!');
    setShowEditModal(false);
    setEditingExpense(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingExpense(null);
    setEditDescription('');
    setEditAmount('');
    setEditCategory('Food');
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 All Expenses</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${totalExpenses.toFixed(2)}</Text>
        </View>
      </View>
      
      {expenses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>No expenses yet</Text>
          <Text style={styles.emptySubtext}>Add your first expense to see it here</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseCard}>
              <View style={styles.expenseLeft}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <View style={styles.expenseInfo}>
                  <Text style={styles.expenseDesc}>{item.desc}</Text>
                  <Text style={styles.expenseDate}>{item.date} • {item.category}</Text>
                </View>
              </View>
              
              <View style={styles.expenseRight}>
                <Text style={styles.expenseAmount}>-${item.amount.toFixed(2)}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={styles.editBtn}>✏️ Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteBtn}>🗑️ Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Edit Expense Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelEdit}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>✏️ Edit Expense</Text>
              
              <Text style={styles.modalLabel}>Description</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter description"
                value={editDescription}
                onChangeText={setEditDescription}
              />
              
              <Text style={styles.modalLabel}>Amount ($)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="0.00"
                value={editAmount}
                onChangeText={setEditAmount}
                keyboardType="decimal-pad"
              />
              
              <Text style={styles.modalLabel}>Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.categoryOption,
                      editCategory === category.name && styles.categoryOptionSelected
                    ]}
                    onPress={() => setEditCategory(category.name)}
                  >
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                    <Text style={[
                      styles.categoryText,
                      editCategory === category.name && styles.categoryTextSelected
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f7', 
    padding: 15 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalLabel: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  totalAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseCard: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  emoji: { 
    fontSize: 24, 
    marginRight: 12 
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDesc: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  expenseDate: { 
    fontSize: 12, 
    color: '#888' 
  },
  expenseRight: { 
    alignItems: 'flex-end' 
  },
  expenseAmount: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#F44336', 
    marginBottom: 8 
  },
  actions: { 
    flexDirection: 'row' 
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 5,
  },
  editBtn: { 
    fontSize: 14, 
    color: '#2196F3',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  deleteBtn: { 
    fontSize: 14, 
    color: '#F44336',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 5,
  },
  categoryScroll: {
    marginVertical: 10,
  },
  categoryOption: {
    alignItems: 'center',
    marginRight: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    minWidth: 70,
  },
  categoryOptionSelected: {
    backgroundColor: '#2196F3',
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  categoryTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});