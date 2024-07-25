import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import {validationSchema} from '../utils/validationSchema';
import {ThemeContext} from '../context/theme/ThemeContext';
import axios from '../api/axios';
import {addOneYearToDate} from '../utils/addOneYear';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../routes/StackNavigator';
import {formatDate} from '../utils/formatDate';

type Props = StackScreenProps<RootStackParams, 'EditScreen'>;

export const EditScreen = ({route, navigation}: Props) => {
  const {item} = route.params;
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => {
        setSubmitError(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const handleFormSubmit = (values: any) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      axios
        .put(`/bp/products?id=${item.id}`, values)
        .then(response => {
          console.log(response);
          navigation.navigate('HomeScreen');
        })
        .catch(err => {
          console.log('Error catch', err);
          setSubmitError(
            'Error al actualizar el producto. Inténtalo de nuevo.',
          );
        });
    } catch (errorCatch) {
      setSubmitError('Error al actualizar el producto. Inténtalo de nuevo.');
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
        <Formik
          initialValues={{
            id: item.id,
            name: item.name,
            description: item.description,
            logo: item.logo,
            date_release: formatDate(item.date_release),
            date_revision: formatDate(item.date_revision),
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit: handleFormikSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setValues,
          }) => (
            <>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>ID</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {backgroundColor: colors.card, color: '#ccc'},
                      touched.id && errors.id ? styles.errorInput : null,
                    ]}
                    placeholder="ID"
                    value={values.id}
                    editable={false}
                  />
                  {touched.id && errors.id && (
                    <Text style={styles.errorText}>{errors.id}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nombre</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.name && errors.name ? styles.errorInput : null,
                    ]}
                    autoCapitalize="none"
                    placeholder="Nombre"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Descripción</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.description && errors.description
                        ? styles.errorInput
                        : null,
                    ]}
                    placeholder="Descripción"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.errorText}>{errors.description}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Logo</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.logo && errors.logo ? styles.errorInput : null,
                    ]}
                    autoCapitalize="none"
                    placeholder="Logo"
                    onChangeText={handleChange('logo')}
                    onBlur={handleBlur('logo')}
                    value={values.logo}
                  />
                  {touched.logo && errors.logo && (
                    <Text style={styles.errorText}>{errors.logo}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Fecha Liberación</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.date_release && errors.date_release
                        ? styles.errorInput
                        : null,
                    ]}
                    placeholder="yyyy-mm-dd"
                    onChangeText={text => {
                      handleChange('date_release')(text);
                      const revisionDate = addOneYearToDate(text);
                      setFieldValue('date_revision', revisionDate);
                    }}
                    onBlur={handleBlur('date_release')}
                    value={values.date_release}
                  />
                  {touched.date_release && errors.date_release && (
                    <Text style={styles.errorText}>{errors.date_release}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Fecha Revisión</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {backgroundColor: colors.card, color: '#ccc'},
                      touched.date_revision && errors.date_revision
                        ? styles.errorInput
                        : null,
                    ]}
                    placeholder="yyyy-mm-dd"
                    value={values.date_revision}
                    editable={false}
                  />
                  {touched.date_revision && errors.date_revision && (
                    <Text style={styles.errorText}>{errors.date_revision}</Text>
                  )}
                </View>
              </View>
              {submitError && (
                <View style={styles.submitErrorContainer}>
                  <Text style={styles.submitErrorText}>{submitError}</Text>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={isSubmitting}
                  style={[
                    styles.submitButton,
                    {backgroundColor: colors.primary},
                  ]}
                  onPress={() => handleFormikSubmit()}>
                  <Text style={styles.submitButtonText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={isSubmitting}
                  style={[styles.resetButton, {backgroundColor: colors.border}]}
                  onPress={() => {
                    setValues({
                      id: values.id,
                      name: '',
                      description: '',
                      logo: '',
                      date_release: '',
                      date_revision: '',
                    });
                  }}>
                  <Text style={[styles.resetButtonText, {color: colors.text}]}>
                    Reiniciar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
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
  formContainer: {
    flexGrow: 1,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  errorInput: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    marginTop: 4,
    fontSize: 12,
  },
  submitErrorContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderRadius: 8,
  },
  submitErrorText: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 99,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
  },
  submitButton: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  resetButtonText: {
    fontWeight: 'bold',
  },
});
