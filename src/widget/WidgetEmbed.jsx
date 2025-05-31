import { useEffect, useState } from "react";

export default function WidgetEmbed() {
  const [config, setConfig] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const widgetId = urlParams.get("id");

    // Aquí deberías obtener la configuración real del widget desde backend o localStorage
    // Para el ejemplo, agrego logo en base64 o URL (null si no tienes)
    setConfig({
      titulo: "¿Querés que te contacte?",
      descripcion: "Completá el formulario y te escribimos pronto.",
      color: "#ff6600",
      cta: "Abrir",
      logo: null, // pon aquí una URL o base64 para probar, o null
    });
  }, []);

  if (!config) return <div className="text-center p-3">Cargando...</div>;

  return (
    <div className="border p-3 rounded shadow" style={{ backgroundColor: "#fff", fontFamily: "Arial" }}>
      {/* Logo arriba */}
      {config.logo && (
        <div className="text-center mb-3">
          <img src={config.logo} alt="Logo" style={{ maxHeight: 80, objectFit: "contain" }} />
        </div>
      )}

      {!expanded ? (
        <div className="text-center">
          <h5>{config.titulo}</h5>
          <button
            className="btn"
            style={{ backgroundColor: config.color, color: "#fff" }}
            onClick={() => setExpanded(true)}
          >
            {config.cta}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Formulario enviado");
          }}
        >
          <h5 className="mb-3">{config.descripcion}</h5>
          <div className="mb-2"><input className="form-control" placeholder="Nombre" required /></div>
          <div className="mb-2"><input className="form-control" placeholder="Apellido" required /></div>
          <div className="mb-2"><input className="form-control" placeholder="Email" type="email" required /></div>
          <div className="mb-2"><input className="form-control" placeholder="Teléfono" required /></div>
          <div className="mb-2"><input className="form-control" placeholder="Empresa" required /></div>
          <div className="mb-2"><input className="form-control" placeholder="Cargo" required /></div>
          <div className="mb-2"><input className="form-control" placeholder="Ciudad" required /></div>
          <div className="mb-2"><textarea className="form-control" placeholder="Mensaje" required /></div>
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-secondary" onClick={() => setExpanded(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn" style={{ backgroundColor: config.color, color: "#fff" }}>
              Enviar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
