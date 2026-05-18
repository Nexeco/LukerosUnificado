export function InstitutionalSection() {
  const s = document.createElement('section');
  s.className = 'inst-section';
  s.id = 'beneficios';
  s.innerHTML = `
    <div class="inst__inner">
      <h3>Tu credito con claridad total</h3>
      <p>En <strong>Lukeros</strong> creemos que un credito debe sentirse sencillo y seguro. Por eso mostramos los costos desde el inicio, explicamos cada cargo y te damos una respuesta rapida sin vueltas.</p>
      <div class="inst__cards">
        <div class="inst__card"><h4>Rapido y claro</h4><p>Simula, solicita y entiende tu credito en minutos. Sin letras pequenas y con informacion transparente desde el primer paso.</p></div>
        <div class="inst__card"><h4>Hecho para tu dia a dia</h4><p>Todo el proceso es digital y puedes hacerlo desde tu celular. Tu tiempo es valioso, por eso simplificamos cada etapa.</p></div>
        <div class="inst__card"><h4>Acompanamiento real</h4><p>Si tienes dudas, nuestro equipo responde. Queremos que te sientas seguro antes, durante y despues del credito.</p></div>
      </div>
    </div>`;
  return s;
}
