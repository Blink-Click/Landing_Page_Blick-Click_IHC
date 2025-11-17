Feature: Consultar historial de uso del paciente
  Como paciente
  Quiero consultar mi historial de uso
  Para revisar mi actividad en la aplicación

  Scenario: Visualización del historial
    Given que el paciente está en el menú de Configuración
    When selecciona "Historial"
    Then la aplicación muestra la pantalla "Historial uso"
    And se muestra un gráfico visual representando la actividad

  Scenario: Exportación exitosa a PDF
    Given que el paciente está en "Historial uso"
    When presiona "Exportar como PDF"
    Then el sistema descarga el archivo PDF
    And muestra la confirmación "Descargado exitosamente"
