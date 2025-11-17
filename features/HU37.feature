Feature: Recibir notificación de mensaje rápido del paciente
  Como cuidador
  Quiero recibir mensajes rápidos del paciente
  Para asistirlo oportunamente

  Scenario: Recepción de mensaje rápido
    Given que el paciente envió "Tengo Hambre"
    When el cuidador está en cualquier pantalla
    Then aparece un pop-up con el mensaje "Tengo Hambre"

  Scenario: Ver notificación
    Given que el cuidador ve la notificación
    When presiona la notificación
    Then el sistema muestra el mensaje en una pantalla interna
