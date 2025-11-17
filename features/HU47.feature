Feature: Visualizar sección Visión
  Como visitante
  Quiero conocer la visión del proyecto
  Para entender su enfoque futuro

  Scenario: Lectura de visión
    Given que el visitante baja a la sección "Visión"
    When la sección se muestra
    Then visualiza el texto y su imagen complementaria
