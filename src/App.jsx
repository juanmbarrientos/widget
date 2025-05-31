import "./Style.css";
import { useEffect, useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

export default function WidgetEditor() {
  const [enabled, setEnabled] = useState(true);
  const [titulo, setTitulo] = useState("¿Querés saber más?");
  const [descripcion, setDescripcion] = useState(
    "Completá el formulario y te contactamos"
  );
  const [cta, setCta] = useState("Abrir");
  const [colorBtn, setColorBtn] = useState("#ff6600");
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorInput, setColorInput] = useState("#f8f9fa");
  const [logo, setLogo] = useState(null);
  const [iframeCode, setIframeCode] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [expandedPC, setExpandedPC] = useState(false);
  const [formSubmittedPC, setFormSubmittedPC] = useState(false);

  const widgetId = "widget123";

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generateCode = () => {
    const code = `<iframe src="http://localhost:5173/widget?id=${widgetId}" width="350" height="600" style="border:none;" allowtransparency="true"></iframe>`;
    setIframeCode(code);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  useEffect(() => {
    if (enabled) generateCode();
  }, [titulo, descripcion, cta, colorBtn, colorFondo, colorTexto, colorInput]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode);
  };

  const disabledProps = !enabled
    ? { disabled: true, style: { opacity: 0.6 } }
    : {};

  return (
    <div className="container-fluid container-panel">
      <div className="row gap-4 justify-content-center">
        <div className="col-md-4 col-editor">
          <h3>Editor de Widget</h3>

          <Form.Check
            type="switch"
            label={enabled ? "Widget activo" : "Widget inactivo"}
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            className="my-3"
          />

          <Form.Group className="mb-3">
            <Form.Label className="label_input">Título</Form.Label>
            <Form.Control
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              {...disabledProps}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="label_input">Descripción</Form.Label>
            <Form.Control
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              {...disabledProps}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="label_input">Texto del botón</Form.Label>
            <Form.Control
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              {...disabledProps}
            />
          </Form.Group>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="label_input">Botón</Form.Label>
                <Form.Control
                  type="color"
                  value={colorBtn}
                  onChange={(e) => setColorBtn(e.target.value)}
                  {...disabledProps}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="label_input">Fondo</Form.Label>
                <Form.Control
                  type="color"
                  value={colorFondo}
                  onChange={(e) => setColorFondo(e.target.value)}
                  {...disabledProps}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="label_input">Texto</Form.Label>
                <Form.Control
                  type="color"
                  value={colorTexto}
                  onChange={(e) => setColorTexto(e.target.value)}
                  {...disabledProps}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="label_input">Inputs</Form.Label>
                <Form.Control
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  {...disabledProps}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="label_input">Logo de la empresa</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              {...disabledProps}
            />
            {logo && <img className="img-logo" src={logo} alt="Logo Preview" />}
          </Form.Group>

          <Button
            variant="primary"
            onClick={copyToClipboard}
            disabled={!iframeCode}
          >
            📋 Copiar código
          </Button>

          {showAlert && (
            <Alert variant="success" className="mt-3">
              Código actualizado correctamente ✅
            </Alert>
          )}

          <Form.Group className="mt-3">
            <Form.Label>Código iframe</Form.Label>
            <Form.Control as="textarea" rows={3} readOnly value={iframeCode} />
          </Form.Group>
        </div>

        <div className="col-md-7 col-preview d-flex flex-wrap justify-content-between">
          <div className="col-12 col-lg-6 mb-4">
            <h5 className="mb-3">🔍 Vista previa PC</h5>

            <div
              className="p-3 border rounded"
              style={{
                backgroundColor: colorFondo,
                color: colorTexto,
                minHeight: expandedPC ? "650px" : "auto",
                overflow: "hidden",
                transition: "all 0.5s ease",
                cursor: expandedPC ? "default" : "pointer",
              }}
              onClick={() => {
                if (!expandedPC) {
                  setExpandedPC(true);
                  setFormSubmittedPC(false);
                }
              }}
              aria-expanded={expandedPC}
            >
              {logo && (
                <div className="text-center mb-3">
                  <img
                    className="img-logo"
                    src={logo}
                    alt="Logo"
                    style={{ maxHeight: 80, objectFit: "contain" }}
                  />
                </div>
              )}

              {!expandedPC ? (
                <>
                  <h5>{titulo}</h5>
                  <button
                    type="button"
                    style={{
                      backgroundColor: colorBtn,
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "10px 20px",
                      fontWeight: "600",
                      width: "100%",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => {
                      setExpandedPC(true);
                      setFormSubmittedPC(false);
                    }}
                  >
                    {cta}
                  </button>
                </>
              ) : formSubmittedPC ? (
                <div
                  className="p-4 text-white text-center rounded"
                  style={{
                    backgroundColor: "#28a745",
                    transition: "all 0.5s ease",
                  }}
                >
                  <h5>Formulario enviado exitosamente ✅</h5>
                </div>
              ) : (
                <form
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmittedPC(true);
                    setTimeout(() => setExpandedPC(false), 2500);
                  }}
                >
                  <h5 className="mb-3">{descripcion}</h5>

                  <Form.Group className="mb-3">
                    <Form.Label className="label_input">
                      Tipo de inmueble
                    </Form.Label>
                    <Form.Select
                      required
                      style={{ backgroundColor: colorInput, color: colorTexto }}
                      {...disabledProps}
                    >
                      <option value="">Seleccioná...</option>
                      <option value="Piso">Piso</option>
                      <option value="Casa">Casa</option>
                      <option value="Casa rústica">Casa rústica</option>
                      <option value="Duplex">Duplex</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="label_input">Subtipo</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Subtipo"
                      style={{ backgroundColor: colorInput, color: colorTexto }}
                      {...disabledProps}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="label_input">Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Calle, número, ciudad..."
                      style={{ backgroundColor: colorInput, color: colorTexto }}
                      {...disabledProps}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Label className="label_input">
                        N° Habitaciones
                      </Form.Label>
                      <Form.Select
                        required
                        style={{
                          backgroundColor: colorInput,
                          color: colorTexto,
                        }}
                        {...disabledProps}
                      >
                        <option value="">Seleccioná...</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                        <option value="+5">+5</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Label className="label_input">N° Baños</Form.Label>
                      <Form.Select
                        required
                        style={{
                          backgroundColor: colorInput,
                          color: colorTexto,
                        }}
                        {...disabledProps}
                      >
                        <option value="">Seleccioná...</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                        <option value="+5">+5</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="¿Tiene ascensor?"
                      {...disabledProps}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="label_input">Comentarios</Form.Label>
                    <Form.Control
                      as="textarea"
                      maxLength={60}
                      rows={2}
                      style={{ backgroundColor: colorInput, color: colorTexto }}
                      {...disabledProps}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="label_input">Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      required
                      placeholder="+54 9 341 1234567"
                      pattern="^\+?[\d\s\-]+$"
                      style={{ backgroundColor: colorInput, color: colorTexto }}
                      {...disabledProps}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="label_input">Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="ejemplo@mail.com"
                      style={{ backgroundColor: colorInput, color: colorTexto }}
                      {...disabledProps}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between container-btn">
                    <Button
                      variant="secondary"
                      onClick={() => setExpandedPC(false)}
                    >
                      Cerrar
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: colorBtn, border: "none" }}
                      disabled={!enabled}
                    >
                      Enviar
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
