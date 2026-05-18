const API_HOST = process.env.API_HOST ?? '';
const API_KEY = process.env.API_KEY ?? '';

const headers = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

// ── Livres ────────────────────────────────────────────────

export async function getLivres(tous: boolean = false) {
  const url = `${API_HOST}/api/livres${tous ? '?tous=true' : ''}`;
  const res = await fetch(url, { headers });
  const data = await res.json();
  return data.livres ?? [];
}

export async function getLivreDetail(id: number) {
  const res = await fetch(`${API_HOST}/api/livres/${id}`, { headers });
  return res.json();
}

export async function ajouterLivre(titre: string, auteur: string, isbn: string, description: string) {
  const res = await fetch(`${API_HOST}/api/livres`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ titre, auteur, isbn, description }),
  });
  return res.json();
}

export async function modifierLivre(id: number, titre: string, auteur: string, isbn: string, description: string) {
  const res = await fetch(`${API_HOST}/api/livres/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ titre, auteur, isbn, description }),
  });
  return res.json();
}

export async function changerStatutLivre(id: number, disponible: boolean) {
  const res = await fetch(`${API_HOST}/api/livres/${id}/statut`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ disponible }),
  });
  return res.json();
}

export async function supprimerLivre(id: number) {
  const res = await fetch(`${API_HOST}/api/livres/${id}`, {
    method: 'DELETE',
    headers,
  });
  return res.json();
}

// ── Prêts ─────────────────────────────────────────────────

export async function getPretsDuLivre(livreId: number) {
  const res = await fetch(`${API_HOST}/api/livres/${livreId}`, { headers });
  const data = await res.json();
  return data.livre?.prets ?? [];
}

export async function ajouterPret(livreId: number, emprunteur: string, date_debut: string, date_retour: string) {
  const res = await fetch(`${API_HOST}/api/livres/${livreId}/prets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ emprunteur, date_debut, date_retour }),
  });
  return res.json();
}

export async function modifierPret(id: number, emprunteur: string, date_debut: string, date_retour: string) {
  const res = await fetch(`${API_HOST}/api/prets/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ emprunteur, date_debut, date_retour }),
  });
  return res.json();
}

export async function changerStatutPret(id: number, statut: string) {
  const res = await fetch(`${API_HOST}/api/prets/${id}/statut`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ statut }),
  });
  return res.json();
}

export async function supprimerPret(id: number) {
  const res = await fetch(`${API_HOST}/api/prets/${id}`, {
    method: 'DELETE',
    headers,
  });
  return res.json();
}
