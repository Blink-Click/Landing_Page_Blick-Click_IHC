Feature: Configurar volumen y modo silencio
  Como paciente
  Quiero ajustar el sonido del dispositivo
  Para adaptarlo a mis preferencias

  Scenario: Ajustar volumen y guardar
    Given que el paciente está en "Accesibilidad"
    When selecciona "Sonido"
    And baja "Tono de llamada"
    And activa "Modo Silencio"
    And presiona "Guardar cambios"
    Then los nuevos ajustes se aplican
    And la app regresa a "Accesibilidad"

  Scenario: Ajustar volumen y cancelar
    Given que el paciente está en la pantalla "Volumen"
    When sube el deslizador de "Multimedia"
    And presiona "Cancelar cambios"
    Then el volumen de multimedia no se modifica
    And la app regresa a "Accesibilidad"
