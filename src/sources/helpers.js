const { newMedicalRecordForm } = require('./medicalRecordForm');

const genderOptions = [
  { name: 'male' },
  { name: 'female' },
  { name: 'nonbinary' },
  { name: 'transgender' },
  { name: 'other' },
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
  idTypes: formField.dropdown({
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
  born_date: formField.datepicker({
    label: 'Fecha de Nacimiento',
    placeholder: 'Fecha de Nacimiento',
    name: 'born_date',
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
  health_insurance_id: formField.inputNumber({
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
  Email: formField.inputText({
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

module.exports = {
  patientNewFormFields,
  medicalRecordNewEntryFields,
  newMedicalRecordForm,
};
