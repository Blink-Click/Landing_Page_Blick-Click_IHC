Feature: Mostrar hero de bienvenida con llamado a la acción
  Como visitante
  Quiero ver el propósito del producto y un botón de descarga
  Para motivarme a usar la aplicación

  Scenario: Descarga de aplicación
    Given que el visitante entra a la página
    When hace clic en "¡Descarga ya!"
    Then es redirigido al formulario de registro o descarga
