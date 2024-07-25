import React, {useContext, useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {FormProduct} from '../components/FormProduct';
import axios from '../api/axios';
import axiosOrig from 'axios';
import {formatDate} from '../utils/formatDate';
import {RootStackParams} from '../routes/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParams, 'EditScreen'>;
export const EditScreen = ({route, navigation}: Props) => {
  const {item} = route.params;
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => {
        setSubmitError(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await axios.put(`/bp/products?id=${item.id}`, values);
      navigation.navigate('HomeScreen');
    } catch (err) {
      if (axiosOrig.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setSubmitError(
            'Error: El encabezado `authorId` falta en la solicitud.',
          );
        } else if (err.response?.status === 206) {
          setSubmitError(
            'Error: Faltan propiedades requeridas en la solicitud.',
          );
        } else {
          setSubmitError('Error al crear el producto. Inténtalo de nuevo.');
        }
      } else {
        setSubmitError('Error al crear el producto. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Editar Producto</Text>
        <FormProduct
          initialValues={{
            id: item.id,
            name: item.name,
            description: item.description,
            logo: item.logo,
            date_release: formatDate(item.date_release),
            date_revision: formatDate(item.date_revision),
          }}
          onSubmit={handleFormSubmit}
          submitButtonText="Actualizar"
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
});
