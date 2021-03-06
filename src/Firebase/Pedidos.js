//EDIFICIOS
export const fetchEdificioList = () =>
  fetch(`http://localhost:3001/edificios`)
    .then(response => response.json())

export const fetchEdificio = ( id ) =>
  fetch(`http://localhost:3001/edificio/building/${id}`)
    .then(response => response.json())

export const fetchEdificioForPerfil = ( userId ) =>
  fetch(`http://localhost:3001/edificio/profile/${userId}`)
    .then(response => response.json())


export const createEdificio = (token, userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo, domain, user) =>
  fetch(`http://localhost:3001/edificios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo, domain, user })
  }).then(response => response.json());

  export const updateEdificio = (token, docID, userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo) =>
  fetch(`http://localhost:3001/edificio/${docID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, date, nomeEdificio, descricao, fotos, localizacao, degradacao, acesso, seguranca, vandalismo })
  }).then(response => response.json());

export const deleteEdificio = (token, id) =>
  fetch(`http://localhost:3001/edificio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


//UTILIZADORES

export const fetchUtilizadoresList = () =>
  fetch(`http://localhost:3001/utilizadores`)
    .then(response => response.json())

export const fetchUtilizadorById = (userId) =>
  fetch(`http://localhost:3001/utilizador/geral/${userId}`)
    .then(response => response.json())

export const fetchUtilizadorForPerfil = (userId) =>
  fetch(`http://localhost:3001/utilizador/perfil/${userId}`)
    .then(response => response.json())
    
export const updateUtilizador = (token, docID, userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa, role, active) =>
  fetch(`http://localhost:3001/utilizador/perfil/${docID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, imagemUser, nomeUtilizador, biografia, cidade, progresso, equipa, role, active })
  }).then(response => response.json());
  
export const createUtilizador = (token, userId, imagemUser, nomeUtilizador, biografia, cidade, role, active, progresso) =>
fetch(`http://localhost:3001/utilizadores`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userId, imagemUser, nomeUtilizador, biografia, cidade, role, active, progresso })
}).then(response => response.json());

//AMIGOS

export const fetchAllFriends = (userId) => {
  return fetch(`http://localhost:3001/friends/${userId}`)
    .then(response => response.json())
}

export const fetchFriends = (userId, friendId) => {
  return fetch(`http://localhost:3001/friend/${userId}/${friendId}`)
    .then(response => response.json())
}

export const createFriends = (token, nomeFriend, userId, friendId, imagemUser, ownUser) => {
  return fetch(`http://localhost:3001/friends`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nomeFriend, userId, friendId, imagemUser, ownUser })
  }).then(response => response.json());
}

export const deleteFriends = (token, id, ownUser) => {
  return fetch(`http://localhost:3001/friend/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ownUser})
  })
}

//COMENTÁRIOS

export const fetchComentariosListByBuilding = (buildingId) =>
  fetch(`http://localhost:3001/comentarios/building/${buildingId}`)
    .then(response => response.json())

    export const fetchComentariosListByUser = (userId) =>
  fetch(`http://localhost:3001/comentarios/user/${userId}`)
    .then(response => response.json())
    
export const createComentario = (token, userId, valor, edificioId, user, edificio) =>
fetch(`http://localhost:3001/comentarios`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userId, valor, edificioId, user, edificio })
}).then(response => response.json());

//SUGESTÕES

export const fetchSugestoesListByBuilding = (buildingId) =>
  fetch(`http://localhost:3001/sugestoes/building/${buildingId}`)
    .then(response => response.json())

    export const fetchSugestoesListByUser = (userId) =>
  fetch(`http://localhost:3001/sugestoes/user/${userId}`)
    .then(response => response.json())

export const createSugestao = (token, userId, valor, edificioId, user, edificio) =>
fetch(`http://localhost:3001/sugestoes`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ userId, valor, edificioId, user, edificio })
}).then(response => response.json());

//EQUIPAS

export const fetchEquipasList = () =>
  fetch(`http://localhost:3001/equipas`)
    .then(response => response.json())
