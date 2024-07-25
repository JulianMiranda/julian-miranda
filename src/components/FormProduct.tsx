/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {validationSchema} from '../utils/validationSchema';
import {addOneYearToDate} from '../utils/addOneYear';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useVerifyId} from '../hooks/useVerifyId';

interface Props {
  initialValues: any;
  onSubmit: (values: any) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
  submitError: string | null;
}

export const FormProduct = ({
  initialValues,
  onSubmit,
  submitButtonText,
  isSubmitting,
  submitError,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [id, setId] = useState('');
  const {isAvailable, error} = useVerifyId(id);

  const getErrorText = (error: any) => {
    if (typeof error === 'string') {
      return error;
    } else if (Array.isArray(error)) {
      return error.join(', ');
    } else if (typeof error === 'object') {
      return JSON.stringify(error);
    }
    return '';
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit: handleFormikSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        resetForm,
        setValues,
      }) => (
        <>
          <View style={styles.formContainer}>
            {submitButtonText === 'Actualizar' ? (
              <>
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
                    <Text style={styles.errorText}>
                      {getErrorText(errors.id)}
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>ID</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.id &&
                      (errors.id || error || isAvailable === false)
                        ? styles.errorInput
                        : null,
                    ]}
                    placeholder="ID"
                    autoCapitalize="none"
                    onChangeText={text => {
                      handleChange('id')(text);
                      setId(text);
                    }}
                    onBlur={handleBlur('id')}
                    value={values.id}
                  />
                  {touched.id && errors.id && (
                    <Text style={styles.errorText}>
                      {getErrorText(errors.id)}
                    </Text>
                  )}
                  {touched.id && error && (
                    <Text style={styles.errorText}>{error}</Text>
                  )}
                  {touched.id && isAvailable === false && (
                    <Text style={styles.errorText}>ID ya existe</Text>
                  )}
                </View>
              </>
            )}

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
                <Text style={styles.errorText}>
                  {getErrorText(errors.name)}
                </Text>
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
                <Text style={styles.errorText}>
                  {getErrorText(errors.description)}
                </Text>
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
                <Text style={styles.errorText}>
                  {getErrorText(errors.logo)}
                </Text>
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
                <Text style={styles.errorText}>
                  {getErrorText(errors.date_release)}
                </Text>
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
                <Text style={styles.errorText}>
                  {getErrorText(errors.date_revision)}
                </Text>
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
              style={[styles.submitButton, {backgroundColor: colors.primary}]}
              onPress={() => handleFormikSubmit()}>
              <Text style={styles.submitButtonText}>{submitButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isSubmitting}
              style={[styles.resetButton, {backgroundColor: colors.border}]}
              onPress={() => {
                submitButtonText === 'Actualizar'
                  ? () => {
                      setValues({
                        id: values.id,
                        name: '',
                        description: '',
                        logo: '',
                        date_release: '',
                        date_revision: '',
                      });
                    }
                  : () => resetForm();
              }}>
              <Text style={[styles.resetButtonText, {color: colors.text}]}>
                Reiniciar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    marginBottom: 20,
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
