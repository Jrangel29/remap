import React, {useState, useEffect} from 'react';
import '../../Styles/Perfil.css';
import {Carousel} from 'react-bootstrap';
import SingleSugestao from '../PaginaEdificio/SingleSugestao'
import SingleComentario from '../PaginaEdificio/SingleComentario'
import { storage } from '../../Firebase/FbConfig';
import { Link } from 'react-router-dom';


function DetalhesSeccao (props) {

    const [index, setIndex] = useState(0);
    const [imagens, setImagens] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    
    useEffect(() => {
        if (props.edificios.length > 0) {
            if (imagens.length < props.edificios.length) {
                
                props.edificios.map(item => {
                 
                    
                    storage.ref('imagensEdificios').child(`${item.fotos[0]}`).getDownloadURL().then((url) => {
                        const newArray = imagens;
                        newArray.push({ url: url, nome: item.nomeEdificio, id: item.id })
                        setImagens(newArray)
                    })
                    
                })
                
                
            } 
        }
       
    }, [])

    

    return (
        <div className="row col-12 m-0 p-0">
            
            {props.tipo === 'Edifícios Adicionados' ?
            <>
            {imagens.length > 0 ?
                <Carousel className="imgCarousel mb-0" activeIndex={index} onSelect={handleSelect}>
                    {imagens.map((item, key) => {
                        return(
                            <>
                            {index === key ?
                                <Carousel.Item className="divCarousel">
                                    <Link to={`/edificio/${item.id}`} style={{textDecoration: 'none'}}>
                                        <img
                                            className="d-block imgCarousel"
                                            src={item.url}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                                <p style={{
                position: "absolute",
                left: "50%",
                bottom: 3,
                color: "white",
                transform: " translateX(-50%)",
        
              }}>{item.nome}</p>
                                        </Carousel.Caption>
                                    </Link>
                                </Carousel.Item>
                                :
                                <></>
                            }
                            </>
                        )
                    })}
                </Carousel>
                :
                <div className="w-100 text-center textoNada py-3">Este utilizador ainda não acrescentou nenhum edifício à aplicação.</div>
            }
            </>
            :
                props.tipo === 'Sugestões' ?
            <>
                {props.sugestoes && props.sugestoes.length > 0 ?
                    props.sugestoes.map((sugestao, index) => {
                        return <SingleSugestao sugestao={sugestao} tipo={'perfil'} utilizador={props.utilizador}/> })
                    :
                    <div className="w-100 text-center textoNada py-3">Este utilizador ainda não deu nenhuma sugestão.</div>
                }
            </>
            :
            <>
                    {props.comentarios && props.comentarios.length>0 ?
                        props.comentarios.map((comment, index) => {
                           return <SingleComentario comment={comment} tipo={'perfil'} utilizador={props.utilizador}/>
                         })
                         :
                         <div className="w-100 text-center textoNada py-3">Este utilizador ainda não adicionou nenhum comentário.</div>
                    } 
            </>
            }
        </div> 
    )
}

export default DetalhesSeccao