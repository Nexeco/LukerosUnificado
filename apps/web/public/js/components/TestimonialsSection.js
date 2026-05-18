const testimonials = [
  { text: 'Lo que mas me gusto fue la claridad. Vi el total antes de aceptar y en menos de una hora ya tenia respuesta.', stars: 5 },
  { text: 'Proceso sencillo y sin papeleo. Pude hacer todo desde el celular y el soporte resolvio mis dudas rapido.', stars: 5 },
  { text: 'La calculadora es muy util, todo queda claro. Me dio confianza para pedir el credito sin sorpresas.', stars: 5 },
  { text: 'Rapido, transparente y con buen acompanamiento. Volveria a usarlo cuando lo necesite.', stars: 5 },
];

export function TestimonialsSection() {
  const s = document.createElement('section');
  s.className = 'testi-section';
  s.innerHTML = `
    <div class="testi__inner">
      <h3>Historias reales, confianza real</h3>
      <p class="testi__subtitle">Clientes que eligieron claridad y rapidez para resolver su credito.</p>
      <div class="testi__grid"></div>
    </div>`;
  const grid = s.querySelector('.testi__grid');
  const renderStars = (n=5) => '★'.repeat(Math.max(0, Math.min(5, n))) + '☆'.repeat(Math.max(0, 5-n));
  testimonials.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testi__card';
    const stars = renderStars(t.stars);
    card.innerHTML = `<div class="testi__stars" aria-label="${t.stars} de 5">${stars}</div><p>“${t.text}”</p>`;
    grid.appendChild(card);
  });
  return s;
}
