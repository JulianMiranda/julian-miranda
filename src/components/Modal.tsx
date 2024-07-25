import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productName: string;
  isProcessing: boolean;
}

export const DeleteModal = ({
  visible,
  onConfirm,
  onCancel,
  productName,
  isProcessing,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalHeader}
            activeOpacity={0.8}
            onPress={onCancel}>
            <Text style={styles.modalHeaderText}>X</Text>
          </TouchableOpacity>
          <ScrollView style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              ¿Estás seguro de eliminar el producto {productName}?
            </Text>
          </ScrollView>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onConfirm}
              disabled={isProcessing}
              activeOpacity={0.8}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isProcessing}
              activeOpacity={0.8}
              style={[styles.modalButton, {backgroundColor: colors.border}]}
              onPress={onCancel}>
              <Text style={[styles.modalButtonText, {color: colors.text}]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalHeader: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginEnd: 10,
  },
  modalHeaderText: {
    margin: 10,
    marginVertical: 5,
    fontSize: 20,
  },
  modalTitleContainer: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderTopColor: '#f3f3f3',
    borderBottomColor: '#f3f3f3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  modalButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#ffc107',
    marginBottom: 15,
  },

  modalButtonText: {
    fontSize: 16,
  },
});
