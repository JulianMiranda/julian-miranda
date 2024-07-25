import * as Yup from 'yup';

const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;

const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
};

export const validationSchema = Yup.object().shape({
  id: Yup.string()
    .min(3, 'ID debe tener al menos 3 caracteres')
    .max(10, 'ID no debe tener más de 10 caracteres')
    .required('ID es requerido'),
  name: Yup.string()
    .min(5, 'Nombre debe tener al menos 5 caracteres')
    .max(100, 'Nombre no debe tener más de 100 caracteres')
    .required('Nombre es requerido'),
  description: Yup.string()
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(200, 'Descripción no debe tener más de 200 caracteres')
    .required('Descripción es requerida'),
  logo: Yup.string().required('Logo es requerido'),
  date_release: Yup.string()
    .matches(dateRegExp, 'Fecha de liberación debe estar en formato yyyy-mm-dd')
    .required('Fecha de liberación es requerida')
    .test('is-valid-date', 'Fecha de liberación no es válida', value => {
      const date = parseDate(value);
      return date instanceof Date && !isNaN(date.getTime());
    })
    .test(
      'is-after-today',
      'Fecha de liberación debe ser después de la fecha actual',
      value => {
        const today = new Date();
        const releaseDate = parseDate(value);
        return releaseDate > today;
      },
    ),
  date_revision: Yup.string()
    .matches(dateRegExp, 'Fecha de revisión debe estar en formato yyyy-mm-dd')
    .required('Fecha de revisión es requerida')
    .test('is-valid-date', 'Fecha de revisión no es válida', value => {
      const date = parseDate(value);
      return date instanceof Date && !isNaN(date.getTime());
    })
    .test(
      'is-after-release',
      'Fecha de revisión debe ser después de la fecha de liberación',
      function (value) {
        const {date_release} = this.parent;
        if (!date_release || !value) return true;
        const releaseDate = parseDate(date_release);
        const revisionDate = parseDate(value);
        return revisionDate > releaseDate;
      },
    )
    .test(
      'is-after-today',
      'Fecha de revisión debe ser después de la fecha actual',
      value => {
        const today = new Date();
        const revisionDate = parseDate(value);
        return revisionDate > today;
      },
    ),
});
