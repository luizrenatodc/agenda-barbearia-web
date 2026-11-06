// Regras puras: sem DOM, para testar sem navegador.
export const SERVICOS = [
  { nome: "Corte", minutos: 30 },
  { nome: "Barba", minutos: 30 },
  { nome: "Corte e barba", minutos: 60 },
];

const emMinutos = (h) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3));
const emHora = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function horariosLivres(dia, minutos, reservas, abre = 540, fecha = 1140) {
  if (new Date(`${dia}T12:00:00`).getDay() === 0) return []; // fechado no domingo
  const doDia = reservas.filter((r) => r.dia === dia);
  const livres = [];
  for (let m = abre; m + minutos <= fecha; m += 30) {
    const bate = doDia.some((r) => m < emMinutos(r.hora) + r.minutos && emMinutos(r.hora) < m + minutos);
    if (!bate) livres.push(emHora(m));
  }
  return livres;
}
