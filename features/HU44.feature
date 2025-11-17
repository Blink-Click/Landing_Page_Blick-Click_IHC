Feature: Visualizar mockups de la aplicación
  Como visitante
  Quiero ver la interfaz de la app
  Para conocer su apariencia

  Scenario: Carga visual
    Given que el usuario está en la portada
    When el sitio carga correctamente
    Then se muestran dos teléfonos con la interfaz de Blink & Click
