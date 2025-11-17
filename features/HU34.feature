Feature: Realizar llamadas de emergencia
  Como paciente
  Quiero iniciar una llamada de emergencia
  Para pedir ayuda rápidamente

  Scenario: Realizar una llamada de emergencia
    Given que el paciente está en "Seguridad"
    When selecciona "Llamadas de emergencia"
    And presiona el contacto "Papa"
    Then la aplicación inicia la llamada
    And muestra la pantalla "Llamando..." con la opción "Colgar"

  Scenario: Colgar la llamada
    Given que el paciente está en la pantalla "Llamando..."
    When presiona el botón rojo "Colgar"
    Then la llamada finaliza
    And la app regresa a la lista de contactos
