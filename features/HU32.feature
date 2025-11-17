Feature: Vincular y desvincular cuentas externas
  Como paciente
  Quiero conectar mis cuentas de redes sociales y correo
  Para vincularlas con la aplicación

  Scenario: Vincular cuenta de Facebook
    Given que el paciente está en "Vincular con cuentas"
    And Facebook no está vinculado
    When presiona el botón verde "Vincular"
    Then la aplicación lo redirige al inicio de sesión de Facebook
    And tras ingresar usuario y contraseña
    Then la cuenta queda vinculada
    And el botón cambia a "Desvincular"

  Scenario: Desvincular una cuenta
    Given que el paciente tiene Facebook vinculado
    When presiona el botón rojo "Desvincular"
    Then la cuenta se desconecta
    And el botón vuelve a mostrar "Vincular"
