Feature: Notificar al cuidador cuando el historial está desactivado
  Como cuidador
  Quiero saber si el historial del paciente está oculto
  Para entender por qué no puedo verlo

  Scenario: Acceso a historial denegado
    Given que el paciente desactivó "Mostrar Historial"
    When el cuidador selecciona "Historial"
    Then se muestra "Historial uso"
    And aparece el mensaje "El paciente desactivo la visibilidad del historial"

  Scenario: Acceso permitido al historial
    Given que el paciente tiene activada la opción "Mostrar Historial"
    When el cuidador selecciona "Historial"
    Then se muestra el gráfico del historial de uso
