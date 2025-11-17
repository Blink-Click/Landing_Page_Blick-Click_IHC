Feature: Gestionar configuraciones del paciente desde el cuidador
  Como cuidador
  Quiero gestionar remotamente configuraciones del paciente
  Para brindarle asistencia

  Scenario: Acceso a la configuración remota
    Given que el cuidador tiene un paciente vinculado
    When selecciona "Configuraciones"
    And selecciona "Configuración del paciente"
    Then se muestra el menú con "Historial", "Cursores", "Modo Reposo" y "Descanso visual"

  Scenario: Configurar Modo Reposo del paciente
    Given que el cuidador está en "Configuraciones del paciente"
    When selecciona "Modo Reposo"
    Then se muestra la pantalla para activar o desactivar el modo reposo del paciente

  Scenario: Visualizar historial del paciente
    Given que el cuidador está en "Configuraciones del paciente"
    When selecciona "Historial"
    Then la aplicación muestra el historial del paciente
