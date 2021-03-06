const getFirestore = require("../Utils/getFirestore");
const getDocumentFromCollection = require("../utils/getDocFromCol")


module.exports = {
  getAllByBuilding: async (buildingId) => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");
    const result = await comentarioCollectionRef.where("edificioId", "==", buildingId).get();
    const comentarios = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    
    return comentarios;
  },
  getAllByUser: async (userId) => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");
    const result = await comentarioCollectionRef.where("userId","==", userId ).get();
    const comentarios = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return comentarios;
  },
  create: async (body) => {
    const db = getFirestore();
    const comentarioCollectionRef = db.collection("Comentarios");

    if(!body){
        response.status(400);
        response.end();
        return;
    }

    
    const user = body.user;
    delete body.user;

    const edificio = body.edificio;
    delete body.edificio;

    const userCollectionRef = db.collection("Utilizadores");
    const userDoc = getDocumentFromCollection(userCollectionRef, user.id);

    const edificioCollectionRef = db.collection("Edifícios");
    const edificioDoc = getDocumentFromCollection(edificioCollectionRef, edificio.id);

    const teamCollectionRef = db.collection("Equipas");
    const teamId = await teamCollectionRef.where("teamName", "==", user.equipa).get();

    const teamObj = teamId.docs[0].data()
    const userTeam = teamId.docs[0].id

      teamObj.points += 100;
      teamObj.estatisticas.nrComentarios += 1;

    const teamDoc = getDocumentFromCollection(teamCollectionRef, userTeam)
    
    edificio.domain[user.equipa] += 100;
    edificio.domain.total += 100;

    if (user.progresso.exp + 150 === 1000) {
      user.progresso.exp = 0
      user.progresso.nivel+=1
    } else if(user.progresso.exp+150 >1000){
      user.progresso.exp = 150 - (1000 - user.progresso.exp);
      user.progresso.nivel += 1;
    } else {
      user.progresso.exp += 150;
    }
    
    if (user.progresso.comentarios.nrComentarios + 1 === 15) {
      user.progresso.comentarios.badge = "badgeComentario_1.svg";
      user.progresso.comentarios.nrComentarios += 1;
    } else if (user.progresso.comentarios.nrComentarios + 1 === 50) {
      user.progresso.comentarios.badge = "badgeComentario_2.svg";
      user.progresso.comentarios.nrComentarios += 1;
    }else if (user.progresso.comentarios.nrComentarios + 1 === 100) {
      user.progresso.comentarios.badge = "badgeComentario_3.svg";
      user.progresso.comentarios.nrComentarios += 1;
    }else {
      user.progresso.comentarios.nrComentarios += 1;
    }

    const teamRef = await teamDoc.update(teamObj);
    const userRef = await userDoc.update(user);
    const edificioRef = await edificioDoc.update(edificio);
    
    const comentarioRef = await comentarioCollectionRef.add(body);
    return {id: comentarioRef.id, ...body}
  }
}