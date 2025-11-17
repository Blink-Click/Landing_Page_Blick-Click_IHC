Feature: Visualizar notificaciones recibidas por el paciente
  Como paciente
  Quiero ver mis notificaciones recientes
  Para mantenerme informado

  Scenario: Visualización de notificaciones
    Given que el paciente abre el menú flotante
    When selecciona "Notificaciones"
    Then se muestra un panel mediano con la lista de notificaciones recientes
    And puede leerlas o descartarlas mediante la mirada

  Scenario: Sin notificaciones disponibles
    Given que el paciente accede al panel de notificaciones
    When la interfaz se carga
    Then la aplicación muestra "No tienes notificaciones pendientes."
