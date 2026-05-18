export function HeroHeading() {
  const box = document.createElement('section');
  box.className = 'hero';
  box.innerHTML = `
    <div class="hero__grid">
      <div class="hero__copy">
        <span class="hero__badge">Respuesta en minutos • 100% digital</span>
        <h1 class="hero__title">Credito claro y rapido para impulsar tu dia.</h1>
        <p class="hero__lead">Simula tu cuota al instante, conoce el total antes de aceptar y solicita desde tu celular. Transparencia real para que decidas con seguridad.</p>
        <div class="hero__actions">
          <a class="btn btn-primary hero__cta" href="#calculadora">Calcular mi credito</a>
          <a class="btn btn-ghost" href="#beneficios">Como funciona</a>
        </div>
        <div class="hero__trust">
          <div class="trust-item">
            <span class="trust-kicker">Aprobacion</span>
            <strong>Rapida</strong>
          </div>
          <div class="trust-item">
            <span class="trust-kicker">Proceso</span>
            <strong>Sin papeleo</strong>
          </div>
          <div class="trust-item">
            <span class="trust-kicker">Soporte</span>
            <strong>Humano</strong>
          </div>
        </div>
      </div>
      <div class="hero__card">
        <div class="hero__card-head">
          <span class="pill">Transparencia total</span>
          <h3>Tu credito con costos visibles desde el inicio</h3>
        </div>
        <ul class="hero__list">
          <li>Simulacion en segundos y sin registro.</li>
          <li>Cuota estimada y total a pagar claros.</li>
          <li>Seguimiento del estado en tiempo real.</li>
        </ul>
        <div class="hero__card-footer">
          <span class="hero__note">Decide con calma, nosotros te acompanamos.</span>
        </div>
      </div>
    </div>
  `;
  return box;
}
