---
description: Este comando realiza commit y push de los cambios siguiendo las convenciones configuradas en el proyecto.
---

# Commit and Push Command

Este comando realiza commit y push de los cambios siguiendo las convenciones configuradas en el proyecto.

## Formato del mensaje de commit

El proyecto usa **Conventional Commits** con las siguientes reglas:

### Estructura
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos permitidos
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, comas, etc.)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento
- `ci`: Cambios en CI/CD
- `release`: Release de versión

### Reglas
- **scope**: Debe estar en kebab-case (opcional)
- **subject**: Máximo 150 caracteres en el header completo
- **body**: Máximo 200 caracteres por línea (opcional)

### Ejemplos
```bash
feat(auth): add login functionality
fix(api-client): resolve connection timeout issue
docs: update README with installation steps
refactor(user-service): simplify validation logic
```

## Pasos para commit y push

1. **Verificar cambios**
```bash
git status
```

2. **Agregar archivos**
```bash
git add .
# o específicos
git add <file1> <file2>
```

3. **Hacer commit** (el hook de commitlint validará el formato)
```bash
git commit -m "type(scope): subject"
```

4. **Push a la rama actual**
```bash
git push
# o si es la primera vez en la rama
git push -u origin <branch-name>
```

## Comando completo
```bash
git add . && git commit -m "type(scope): subject" && git push
```

## Notas importantes
- Usa descripciones claras y concisas
- El scope es opcional pero recomendado para mejor organización

