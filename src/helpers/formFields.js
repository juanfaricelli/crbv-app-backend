const newMedicalRecordForm = require('./medicalRecordForm');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const genderOptions = [
  { type: 'male', name: 'Hombre' },
  { type: 'female', name: 'Mujer' },
  { type: 'nonbinary', name: 'No Binario' },
  { type: 'transgender', name: 'Transgenero' },
  { type: 'other', name: 'Prefiero no decir/Otros' },
];
const bloodTypeOptions = [
  { name: 'A+' },
  { name: 'A-' },
  { name: 'B+' },
  { name: 'B-' },
  { name: 'AB+' },
  { name: 'AB-' },
  { name: 'O+' },
  { name: 'O-' },
];
const maritalStatusOptions = [
  {
    type: 'single',
    name: 'Soltero/a',
  },
  {
    type: 'married',
    name: 'Casado/a',
  },
  {
    type: 'divorced',
    name: 'Divorciado/a',
  },
  {
    type: 'widowed',
    name: 'Viudo/a',
  },
  {
    type: 'cohabiting',
    name: 'Concubinato',
  },
  {
    type: 'civil_union',
    name: 'Union Civil',
  },
];
const formField = {
  dropdown: ({
    label = 'dropdownLabel',
    placeholder = 'placeholder',
    name = 'dropdownName',
    options = [{}],
    defaulOptionIndex = 0,
    valueKey = 'valueKey',
    valueLabel = 'valueLabel',
  }) => ({
    inputType: 'dropdown',
    label,
    placeholder,
    name,
    options,
    defaulOptionIndex,
    valueKey,
    valueLabel,
  }),
  inputText: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
  }) => ({
    inputType: 'text',
    label,
    placeholder,
    name,
  }),
  inputAreaText: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
    rows = '4',
    cols = '50',
  }) => ({
    inputType: 'textarea',
    label,
    placeholder,
    name,
    rows,
    cols,
  }),
  inputNumber: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
  }) => ({
    inputType: 'number',
    label,
    placeholder,
    name,
  }),
  datepicker: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
  }) => ({
    inputType: 'date',
    label,
    placeholder,
    name,
  }),
};
const patientNewFormFields = ({
  idTypes,
  healthInsurances,
  countries,
  locations,
}) => ({
  id_types: formField.dropdown({
    label: 'Tipo de Documento',
    options: idTypes,
    name: 'id_types',
    defaulOptionIndex: 2,
    placeholder: '',
    valueKey: 'id',
    valueLabel: 'name',
  }),
  id_number: formField.inputNumber({
    label: 'Nº de Documento',
    placeholder: 'Nº de Documento(solo números)',
    name: 'id_number',
  }),
  birthdate: formField.datepicker({
    label: 'Fecha de Nacimiento',
    placeholder: 'Fecha de Nacimiento',
    name: 'birthdate',
  }),
  first_name: formField.inputText({
    label: 'Nombre',
    placeholder: 'Nombre',
    name: 'first_name',
  }),
  last_name: formField.inputText({
    label: 'Apellido',
    placeholder: 'Apellido',
    name: 'last_name',
  }),
  age: formField.inputNumber({
    label: 'Edad',
    placeholder: 'Edad',
    name: 'age',
  }),
  gender: formField.dropdown({
    label: 'Genero',
    options: genderOptions,
    name: 'gender',
    defaulOptionIndex: 4,
    placeholder: 'Genero',
    valueKey: 'name',
    valueLabel: 'name',
  }),
  blood_type: formField.dropdown({
    label: 'Grupo Sanguíneo',
    options: bloodTypeOptions,
    name: 'blood_type',
    defaulOptionIndex: 0,
    placeholder: 'Grupo Sanguíneo',
    valueKey: 'name',
    valueLabel: 'name',
  }),
  health_insurance: formField.dropdown({
    label: 'Obra Social',
    options: healthInsurances,
    name: 'health_insurance',
    defaulOptionIndex: 0,
    placeholder: 'Seleccione Obra Social',
    valueKey: 'id',
    valueLabel: 'name',
  }),
  health_insurance_id: formField.inputText({
    label: 'Nº de Socio',
    placeholder: 'Nº de Socio',
    name: 'health_insurance_id',
  }),
  marital_status: formField.dropdown({
    label: 'Estado Civil',
    options: maritalStatusOptions,
    name: 'marital_status',
    defaulOptionIndex: 0,
    placeholder: 'Seleccione Estado Civil',
    valueKey: 'type',
    valueLabel: 'name',
  }),
  nationality: formField.inputText({
    label: 'Nacionalidad',
    placeholder: 'Nacionalidad',
    name: 'nationality',
  }),
  country: formField.dropdown({
    label: 'País',
    options: countries,
    name: 'country',
    placeholder: 'Seleccione País',
    valueKey: 'id',
    valueLabel: 'name',
  }),
  province: formField.dropdown({
    label: 'Provicia',
    options: locations,
    name: 'province',
    placeholder: 'Seleccione Provicia (Solo Argentina)',
    valueKey: 'id',
    valueLabel: 'name',
  }),
  location: formField.dropdown({
    label: 'Localidad',
    options: locations,
    name: 'location',
    placeholder: 'Seleccione Localidad (Solo Argentina)',
    valueKey: 'id',
    valueLabel: 'name',
  }),
  street: formField.inputText({
    label: 'Calle',
    placeholder: 'Calle',
    name: 'street',
  }),
  street_num: formField.inputText({
    label: 'Numero',
    placeholder: 'Numero',
    name: 'street_num',
  }),
  flat: formField.inputText({
    label: 'Piso',
    placeholder: 'Piso',
    name: 'flat',
  }),
  flat_num: formField.inputText({
    label: 'Depto',
    placeholder: 'Depto',
    name: 'flat_num',
  }),
  phone: formField.inputNumber({
    label: 'Telefono',
    placeholder: 'Telefono(solo números)',
    name: 'phone',
  }),
  email: formField.inputText({
    label: 'Email',
    placeholder: 'Email',
    name: 'email',
  }),
});
const appointmentStates = [
  {
    type: 'absent',
    name: 'Ausente',
  },
  {
    type: 'taken',
    name: 'Turno Gestionado',
  },
  {
    type: 'new-note',
    name: 'Nueva Nota',
  },
];
const medicalRecordNewEntryFields = ({
  patient_name,
  appointment,
  specialities,
  patientConditions,
}) => ({
  patient_name,
  appointment: appointment || 'COMMENT',
  speacialies: appointment
    ? 'get_specialty'
    : formField.dropdown({
        label: 'Especialidad',
        options: specialities,
        name: 'specialities',
        defaulOptionIndex: 2,
        placeholder: 'Seleccione Especialidad',
        valueKey: 'id',
        valueLabel: 'name',
      }),
  patientConditions: formField.dropdown({
    label: 'Estado del Paciente',
    options: patientConditions,
    name: 'patient_conditions',
    defaulOptionIndex: 2,
    placeholder: '',
    valueKey: 'id',
    valueLabel: 'name',
  }),
  appointmentStatus: appointment
    ? formField.dropdown({
        label: 'Gestión del turno',
        options: appointmentStates,
        name: 'appointment_states',
        defaulOptionIndex: 0,
        placeholder: 'Seleccione una Opción',
        valueKey: 'type',
        valueLabel: 'name',
      })
    : appointmentStates[2].name,
  reason: formField.inputText({
    label: 'Motivo',
    placeholder: 'Motivo de Consulta',
    name: 'reason',
  }),
  observations: formField.inputAreaText({
    label: 'Observaciones',
    placeholder: '',
    name: 'observations',
  }),
});
const patientNewObjectCreator = async (
  fieldRefs,
  idTypes,
  healthInsurances,
  countries,
  locations
) => {
  const {
    id_types,
    id_number,
    birthdate,
    first_name,
    last_name,
    age,
    gender,
    blood_type,
    health_insurance,
    health_insurance_id,
    marital_status,
    nationality,
    country,
    province,
    location,
    street_num,
    flat,
    flat_num,
    phone,
    email,
    street,
  } = fieldRefs;

  const getValueObject = (coll, userValue) => {
    return coll
      .map((collItem) => ({
        id: collItem._id.toString(),
        name: collItem.name,
      }))
      .find((collItem) => collItem.id === userValue);
  };
  const getLocation = () => {
    const provinceObj = locations.find((loc) => loc.id === province.id);
    return getValueObject(provinceObj.cities, location.id);
  };

  const newUser = {
    username: email,
    password: {
      value: `${last_name}${123}`,
      default: true,
    },
    user_type: {
      admin: false,
      staff: false,
      doctor: false,
      patient: true,
    },
    user_data: {
      id_type: getValueObject(idTypes, id_types),
      birthdate,
      id_number,
      first_name,
      last_name,
      age,
      gender,
      phone,
      health_insurance: getValueObject(healthInsurances, health_insurance.id),
      health_insurance_id,
      marital_status,
      nationality,
      country: getValueObject(countries, country),
      province: getValueObject(locations, province.id),
      location: getLocation(),
      street,
      street_num,
      flat,
      flat_num,
      blood_type,
      email,
    },
    active_user: true,
  };
  newUser.password.value = await bcrypt.hash(
    newUser.password.value,
    saltRounds
  );
  return newUser;
};

module.exports = {
  patientNewFormFields,
  medicalRecordNewEntryFields,
  newMedicalRecordForm,
  patientNewObjectCreator,
};
