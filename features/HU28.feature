Feature: Ajustar tamaño de elementos
  Como paciente
  Quiero ajustar tamaños de texto e íconos
  Para mejorar la legibilidad

  Scenario: Agrandar la fuente y guardar
    Given que el paciente está en "Accesibilidad"
    When selecciona "Tamaño de elementos"
    And selecciona "Ajustes de Fuente"
    And mueve el deslizador hacia la A grande
    And presiona "Guardar cambios"
    Then el texto aumenta su tamaño
    And la app regresa a "Tamaño de elementos"

  Scenario: Achicar íconos y cancelar
    Given que el paciente está en "Tamaño de elementos"
    When selecciona "Ajustes de icono"
    And mueve el deslizador hacia tamaños menores
    And presiona "Cancelar cambios"
    Then los íconos no cambian
    And la app regresa a "Tamaño de elementos"
