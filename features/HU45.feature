Feature: Ver testimonios de usuarios reales
  Como visitante
  Quiero leer testimonios de personas reales
  Para confiar en el producto

  Scenario: Visualización de testimonios
    Given que el usuario baja a la sección de testimonios
    When la vista se carga
    Then se muestran tres citas de usuarios con foto y rol
