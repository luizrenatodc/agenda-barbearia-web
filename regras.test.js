import test from "node:test";
import assert from "node:assert/strict";
import { horariosLivres } from "./regras.js";

test("não abre no domingo", () => assert.deepEqual(horariosLivres("2030-01-06", 30, []), []));
test("tira o horário reservado", () => {
  const h = horariosLivres("2030-01-07", 30, [{ dia: "2030-01-07", hora: "10:00", minutos: 60 }]);
  assert.ok(!h.includes("10:00") && !h.includes("10:30") && h.includes("11:00"));
});
test("serviço longo não cabe no último horário", () => assert.equal(horariosLivres("2030-01-07", 60, []).at(-1), "18:00"));
