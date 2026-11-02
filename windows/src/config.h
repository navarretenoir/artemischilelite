/* ARTEMIS Chile Lite para Windows — configuración del anfitrión WebView2 (webhost.c). Desarrollada por Javiera Navarrete. */
#define APP_NOMBRE          L"ARTEMIS Chile Lite"
#define APP_CLASE           L"ArtemisChileLiteJavieraNavarrete"
#define APP_AGENTE          "ARTEMIS-Lite-Windows/1.0 (Javiera Navarrete)"
#define APP_HOST_VIRTUAL    L"artemislite.local"
#define APP_CARPETA_UI      L"ui"
#define APP_INICIO          L"https://artemislite.local/index.html"
#define APP_CARPETA_DATOS   L"ArtemisChileLite"
#define APP_PUENTE          0
#define APP_GUARDAR         0
#define APP_VENTANAS_DENTRO 0
#define APP_MENU_CONTEXTUAL FALSE
#define APP_ANCHO           1040
#define APP_ALTO            800
#define APP_COLOR_FONDO     RGB(0xF8, 0xFA, 0xFD)
#define APP_ACERCA          L"ARTEMIS Chile Lite 1.0 para Windows\n\nVersión simple de ARTEMIS: gestiona un curso con estudiantes, asistencia y notas.\n" \
                            L"Desarrollada por Javiera Navarrete. Para una versión completa, contacta a la desarrolladora.\n\nFunciona sin internet; los datos quedan en este equipo."
static const WCHAR *APP_FUERA[] = {L"http://", L"https://", NULL};
static const WCHAR *APP_PERMITIDOS[] = {NULL};
