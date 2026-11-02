// ARTEMIS Chile Lite para macOS e iOS — configuración del anfitrión. Desarrollada por Javiera Navarrete.
import Foundation
extension ConfigApp {
    static let actual = ConfigApp(
        nombre: "ARTEMIS Chile Lite",
        inicio: .local("index.html"),
        puente: .ninguno,
        permitidos: [],
        fuera: ["http://", "https://", "mailto:"],
        ventanasDentro: false,
        activos: [])
}
