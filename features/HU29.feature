Feature: Configurar notificaciones y alertas
  Como paciente
  Quiero gestionar la visibilidad de mis notificaciones
  Para controlar qué información ve mi cuidador

  Scenario: Ocultar historial al cuidador
    Given que el paciente está en "Notificaciones y Alertas"
    And "Mostrar Historial" está activado
    When desactiva "Mostrar Historial"
    And presiona "Guardar cambios"
    Then el cuidador ya no puede ver el historial del paciente

  Scenario: Cancelar cambios
    Given que el paciente está en "Notificaciones y Alertas"
    When desactiva "Mostrar Notificaciones"
    And presiona "Cancelar cambios"
    Then el interruptor vuelve a su estado original
