# castellanosjonatan.com

Sitio web de **Jonatan Castellanos · Profesor de Idiomas**: clases particulares 1:1 de inglés y español, y packs pedagógicos en PDF para profesores (línea *Teaching Materials*, vendidos vía Hotmart).

## Estructura

```
index.html        Página principal (hero, clases, packs, sobre mí, testimonios, FAQ, contacto)
politicas.html    Privacidad, términos de servicio y cookies
css/styles.css    Estilos (Playfair Display + Lato, paleta azul/dorado)
js/main.js        Menú móvil, animaciones de aparición, año del footer
CNAME             Dominio personalizado para GitHub Pages
```

## Desarrollo local

No requiere build. Abre `index.html` directamente o sirve la carpeta:

```bash
python3 -m http.server 8080
```

## Despliegue

Publicado con **GitHub Pages** desde la rama `main` (raíz). El dominio `castellanosjonatan.com` apunta a GitHub Pages mediante registros DNS en Hostinger (ver documentación de dominio en el panel de GitHub Pages del repositorio).
