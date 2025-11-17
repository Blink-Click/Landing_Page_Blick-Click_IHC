Feature: Usar submenú del apartado Inicio
  Como visitante
  Quiero acceder a subopciones al pasar el cursor
  Para navegar rápidamente

  Scenario: Acceso a una sección específica
    Given que el usuario pasa el cursor sobre "Inicio"
    When selecciona "Características"
    Then el sitio realiza scroll hacia la sección correspondiente
