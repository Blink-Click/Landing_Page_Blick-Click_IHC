Feature: Consultar tutorial sobre configuraciones
  Como paciente
  Quiero ver un tutorial del menú de configuraciones
  Para entender sus opciones

  Scenario: Consultar el tutorial
    Given que el paciente está en "Bienestar y soporte"
    When selecciona "Guía y ayuda"
    Then se muestra el tutorial visual sobre el menú "Configuraciones"

  Scenario: Salir del tutorial
    Given que el paciente está en el tutorial
    When presiona "Retroceder"
    Then vuelve al menú de "Bienestar y soporte"
