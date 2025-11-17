Feature: Navegar por el menú principal del sitio web
  Como visitante
  Quiero navegar por las secciones del sitio
  Para desplazarme fácilmente

  Scenario: Navegación interna
    Given que el visitante está en la página principal
    When selecciona "Características" en el submenú de Inicio
    Then el sitio hace scroll suave hacia la sección "Características"
