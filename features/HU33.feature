Feature: Gestionar lista de contactos de seguridad
  Como paciente
  Quiero gestionar mi lista de contactos de seguridad
  Para mantenerla actualizada

  Scenario: Agregar un nuevo contacto
    Given que el paciente está en "Seguridad"
    When selecciona "Lista de contactos"
    And presiona "Agregar +"
    And completa "Nombre" = Victor, "Apellido" = González, "Número"
    And presiona "Agregar"
    Then el contacto aparece en la lista de contactos

  Scenario: Eliminar un contacto
    Given que el paciente está en la "lista de contactos"
    When presiona "Eliminar -"
    And selecciona "Papa"
    Then el contacto "Papa" desaparece de la lista

  Scenario: Cancelar adición de contacto
    Given que el paciente está en el formulario "Agregar"
    When presiona "Cancelar"
    Then vuelve a la lista de contactos sin guardar cambios
