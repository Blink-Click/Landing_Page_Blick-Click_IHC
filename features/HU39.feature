Feature: Recibir alerta SOS del paciente
  Como cuidador
  Quiero recibir una notificación SOS del paciente
  Para responder rápidamente a una emergencia

  Scenario: Recepción de alerta SOS
    Given que el paciente presionó "Confirmar" en su SOS
    When el cuidador está usando la app
    Then aparece un pop-up con el mensaje "ALERTA SOS"
    And el ícono de advertencia
