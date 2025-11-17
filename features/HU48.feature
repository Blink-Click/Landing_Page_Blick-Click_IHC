Feature: Visualizar sección de características
  Como visitante
  Quiero ver las funcionalidades principales
  Para entender qué ofrece el producto

  Scenario: Visualización de características
    Given que el visitante se desplaza a "Características"
    When la sección aparece
    Then puede leer las ventajas como accesibilidad, personalización e interacción sin manos
