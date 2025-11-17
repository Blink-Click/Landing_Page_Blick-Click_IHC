Feature: Visualizar sección Misión
  Como visitante
  Quiero leer la misión del proyecto
  Para entender su propósito

  Scenario: Lectura de misión
    Given que el visitante se desplaza a "Misión"
    When la sección aparece
    Then puede leer el texto explicativo junto a su imagen
