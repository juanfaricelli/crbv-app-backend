const mongoose = require('mongoose');

const newMedicalRecordForm = {
  _id: mongoose.Types.ObjectId(),
  title: 'historia clinica',
  name: 'medical-record-form',
  sections: [
    {
      _id: mongoose.Types.ObjectId(),
      title: 'General',
      name: 'general',
      questions: [
        {
          _id: mongoose.Types.ObjectId(),
          question: '¿Tiene usted buena salud general?',
          input_type: 'boolean',
        },
        {
          _id: mongoose.Types.ObjectId(),
          question: '¿Ha experimentado su salud algún cambio en el último año?',
          input_type: 'boolean',
        },
        {
          _id: mongoose.Types.ObjectId(),
          question: 'Mi último reconocmtento médico fué en (fecha aprox)',
          input_type: 'text',
        },
        {
          _id: mongoose.Types.ObjectId(),
          question: '¿Está siendo atendido por algún médico?',
          input_type: 'boolean',
          questions: [
            {
              _id: mongoose.Types.ObjectId(),
              question: 'En caso afirmativo, ¿por qué enfermedad?',
              input_type: 'text',
            },
            {
              _id: mongoose.Types.ObjectId(),
              question: 'El nombre y la dirección de su médico es',
              input_type: 'text',
            },
          ],
        },
        {
          _id: mongoose.Types.ObjectId(),
          question: '¿Ha sufrido alguna enfermedad u operación de gravedad?',
          input_type: 'boolean',
          questions: [
            {
              _id: mongoose.Types.ObjectId(),
              question: 'En caso afirmativo, explíquelo',
              input_type: 'text',
            },
          ],
        },
        {
          question:
            '¿Ha sido hospitalizado o ha sufrido algún trastorno grave en los últimos 5 años?',
          input_type: 'boolean',
          questions: [
            {
              _id: mongoose.Types.ObjectId(),
              question: 'En caso afirmativo, explíquelo',
              input_type: 'text',
            },
          ],
        },
      ],
    },
  ],
};

module.exports = newMedicalRecordForm;
