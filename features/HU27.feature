Feature: Ajustar brillo y contraste
  Como paciente
  Quiero ajustar las ayudas visuales
  Para adaptar la pantalla a mis necesidades

  Scenario: Ajustar y guardar el brillo
    Given que el paciente está en "Accesibilidad"
    When selecciona "Ayudas Visuales"
    And selecciona "Brillo"
    And ajusta el brillo a un nivel más alto
    And presiona "Guardar cambios"
    Then el brillo se aplica
    And la app regresa a "Ayudas Visuales"

  Scenario: Ajustar y cancelar el contraste
    Given que el paciente está en "Ayudas Visuales"
    When selecciona "Contraste"
    And ajusta el contraste
    And presiona "Cancelar"
    Then los cambios no se aplican
    And la app regresa a "Ayudas Visuales"
