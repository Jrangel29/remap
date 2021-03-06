import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import '../../Styles/PaginaEdificio.css';
import { createNovoComentario } from '../../Store/Comentarios/Actions';
import { useDispatch, useSelector } from 'react-redux';
import useAuthentication from '../../Firebase/useAuthentication';
import CommentLoading from '../Geral/CommentLoading';
import SingleComentario from "./SingleComentario";
import ModalComment from '../Modal/ModalComment';
import { useHistory } from 'react-router-dom';

const Div = styled.div`
    padding: 20px 30px 10px 30px;
`;


function Comentarios (props) { 
    

    const utilizador = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const history = useHistory(); 

    

    const [comentario, setComentario] = useState({
        valor: '',
        userId: props.utilizador,
        edificioId: props.edificio.id
    });

   

    const handleChange = (escrito  => {
        comentario['valor'] = escrito.target.value;
        setComentario({...comentario});
    })

    const handleCreateComentario = (userId, valor, edificioId) => {
        dispatch(createNovoComentario(userId, valor, edificioId, utilizador, props.edificio))
        if(props.nrComentarios + 1 == 15 || props.nrComentarios + 1 == 50 || props.nrComentarios + 1 == 100) {
            setShowModal(true)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useAuthentication();

    return(
        <Div className="row col-12 m-0">
            
            {props.isLoading ?
                <CommentLoading />
                :
                
                (<>
                  
                    <span className="col-12 p-0">
                <input className="form-control forms mb-2" 
                       type="text" aria-label="name"
                       placeholder="Escreve um comentário..."
                       onChange={handleChange}
                       />
                {comentario.valor === '' ?
                <button className="btnPublicarDisabled mb-3" disabled>Publicar</button>
                :
                <div className="m-0 p-0 w-100 text-right">
                    <span className="XPdada">+200 XP</span>
                    <button className="btnPublicar mb-3" onClick={() => handleCreateComentario(comentario.userId, comentario.valor, comentario.edificioId)}>Publicar</button>
                </div>
                        }
                      
                </span>
                    {props.comments.length === 0 ?
                    <div className="w-100 text-center textoNada py-3">Parece que ainda não existem comentários. Sê o primeiro a comentar!</div>
                    :
                    props.comments.map((comment, index)=>{
                        return <SingleComentario comment={comment} tipo={'edificio'} utilizador={props.userCheck} />
                      })                
                    }
                    
                    </>)
            }
            
        <ModalComment show={showModal} onHide={closeModal} numero={props.nrComentarios + 1}/>       
        </Div> 
    )
}

export default Comentarios