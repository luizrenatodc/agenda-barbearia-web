import { SERVICOS, horariosLivres } from "./regras.js";

const $ = (id) => document.getElementById(id);
const CHAVE = "navalha-reservas";
const carregar = () => {
  try { return JSON.parse(localStorage.getItem(CHAVE)) ?? []; } catch { return []; }
};
let reservas = carregar();
let hora = null;

SERVICOS.forEach((s, i) => $("servico").add(new Option(`${s.nome} (${s.minutos} min)`, i)));
$("dia").min = $("dia").value = new Date().toLocaleDateString("en-CA");

function desenhar() {
  const s = SERVICOS[$("servico").value];
  const livres = horariosLivres($("dia").value, s.minutos, reservas);
  $("horarios").replaceChildren(...livres.map((h) => {
    const b = document.createElement("button");
    b.textContent = h;
    b.className = h === hora ? "ativo" : "";
    b.onclick = () => { hora = h; desenhar(); };
    return b;
  }));
  if (!livres.includes(hora)) hora = null;
  $("confirmar").disabled = !hora || !$("nome").value.trim();
  $("lista").replaceChildren(...reservas.map((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.dia} às ${r.hora}: ${r.servico} (${r.nome})`;
    return li;
  }));
}

$("confirmar").onclick = () => {
  const s = SERVICOS[$("servico").value];
  reservas.push({ dia: $("dia").value, hora, minutos: s.minutos, servico: s.nome, nome: $("nome").value.trim() });
  localStorage.setItem(CHAVE, JSON.stringify(reservas));
  $("aviso").textContent = `Horário confirmado às ${hora}.`;
  hora = null;
  desenhar();
};
["servico", "dia", "nome"].forEach((id) => $(id).addEventListener("input", desenhar));
desenhar();
