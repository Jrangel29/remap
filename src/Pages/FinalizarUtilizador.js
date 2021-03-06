import React, {useState}  from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Background from '../Images/Background2.svg';
import Placeholder from '../Images/Placeholder.jpg';
import '../Styles/EditarUtilizador.css';
import { createNovoUtilizador } from '../Store/Utilizadores/Actions';
import { storage } from '../Firebase/FbConfig';
import Loading from '../Components/Geral/Loading';
import useAuthentication from '../Firebase/useAuthentication';
import { useHistory } from 'react-router-dom';

const TiposAceites = 'image/x-png, image/png, image/jpg, image/jpeg';
const arrayTiposAceites = TiposAceites.split(",").map((item) => {
    return item.trim()
});

const Fundo = styled.div`
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: 100% auto;
    margin: 0;
    padding: 0;
`;

const Div = styled.div`
    padding: 40px 30px 0 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto 50px auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: solid 3px #227093;
`;
const Title = styled.h3`
color:#34495e;
`

function FinalizarUtilizador () {

    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const { user, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const [valores, setValores] = useState({
        imagemUser: 'Placeholder.jpg',
        nomeUtilizador: '',
        biografia: '',
        cidade: 'Porto',
    });
    const [imagem, setImagem] = useState(null)

    const verificarFicheiro = (file) => {
        if (!arrayTiposAceites.includes(file.type)) {
            alert("Este ficheiro não é permitido. Por favor seleciona uma imagem.");
            return false
        } else {
            return true
        }
    };

    const handleChange = tipo => conteudo => {
        if (tipo !== 'imagemUser') {
            valores[tipo] = conteudo.target.value;
            setValores({...valores});
        } else {
            const verificar = verificarFicheiro(conteudo.target.files[0]);
            if (verificar){
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    setImagem(reader.result);
                }, false);
                reader.readAsDataURL(conteudo.target.files[0]);
                valores[tipo] = conteudo.target.files[0];
                setValores({...valores});
            }
        }
    };

    const onCreateNovoUtilizador = (userId, imagemUser, nomeUtilizador, biografia,  cidade) => {

        if(imagemUser !== 'Placeholder.jpg') {
            let date = new Date();
            let timestamp = date.getTime();
            let replacedName = imagemUser.name.replace(/ /g, "_");
            //let newName = imagemUser.name + "_imagem_" + timestamp;
            let newName = replacedName + "_imagem_" + timestamp;

        dispatch(createNovoUtilizador(userId, newName, nomeUtilizador, biografia,  cidade));

            const uploadTask = storage.ref(`imagensUtilizadores/${newName}`).put(imagemUser);
            uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            });
        } else {
            dispatch(createNovoUtilizador(userId, imagemUser, nomeUtilizador, biografia, cidade));
        }
    }

    useAuthentication();

    if(isLoading) {
        return (
            <Loading />
        )
    }

    const onConfirm = (valores) => {
        onCreateNovoUtilizador(user.email, valores.imagemUser, valores.nomeUtilizador, valores.biografia, valores.cidade)
        history.push('/selectequipa');
        //setShowModal(true)
    }
    /*const onClose = () => {
        setShowModal(false);
        history.push('/selectequipa');
    }*/

    return (
        <>
        <Fundo>
            <Div>
                <section className="m-0 p-0 w-100">
                    <label for="imgPerfil" className="imagemPerfil mb-0"><ProfilePicture style={{backgroundImage: `url(${imagem ? imagem : Placeholder})`}}/></label>
                    <input className="form-control" id="imgPerfil" type="file" aria-label="Search" onChange={handleChange('imagemUser')}/>
                </section>
                <section className="text-center my-3">
                    <Title>Finalize o seu registo</Title>
                </section>
                <section className="row col-12 m-0 p-0 w-100">
                    <span className="col-12 m-0 mb-2 p-0">
                        <span className="nomeForm">Nome<span className="obrigatorio">*</span></span>
                        <input 
                            className="form-control forms mb-3" 
                            type="text" aria-label="name" 
                            onChange={handleChange('nomeUtilizador')}/>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Biografia</span>
                        <textarea 
                            className="form-control forms mb-3" 
                            type="text" aria-label="biografia"
                            onChange={handleChange('biografia')}/>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Cidade<span className="obrigatorio">*</span></span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="cidade"
                            onChange={handleChange('cidade')}
                            placeholder="Selecione um distrito">
                                    <option value="" disabled selected>Selecione um Distrito</option>
                                    <option value="aveiro">Aveiro</option>
                                    <option value="beja">Beja</option>
                                    <option value="braga">Braga</option>
                                    <option value="braganca">Bragança</option>
                                    <option value="castelo_branco">Castelo Branco</option>
                                    <option value="coimbra">Coimbra</option>

                                    <option value="evora">Évora</option>
                                    <option value="faro">Faro</option>
                                    <option value="guarda">Guarda</option>
                                    <option value="ilha_da_madeira">Ilha da Madeira</option>
                                    <option value="ilha_das_flores">Ilha das Flores</option>
                                    <option value="ilha_porto_santo">Ilha de Porto Santo</option>

                                    <option value="ilha_santa_maria">Ilha de Santa Maria</option>
                                    <option value="ilha_sao_jorge">Ilha de São Jorge</option>
                                    <option value="ilha_sao_miguel">Ilha de São Miguel</option>
                                    <option value="ilha_do_corvo">Ilha do Corvo</option>
                                    <option value="ilha_do_faial">Ilha do Faial</option>

                                    <option value="ilha_do_pico">Ilha do Pico</option>
                                    <option value="ilha_graciosa">Ilha Graciosa</option>
                                    <option value="ilha_terceira">Ilha Terceira</option>
                                    <option value="leiria">Leiria</option>
                                    <option value="lisboa">Lisboa</option>
                                    <option value="portalegre">Portalegre</option>

                                    <option value="porto">Porto</option>
                                    <option value="santarem">Santarém</option>
                                    <option value="setubal">Setúbal</option>
                                    <option value="viana_do_castelo">Viana do Castelo</option>
                                    <option value="vila_real">Vila Real</option>

                                    <option value="viseu">Viseu</option>
                        </select>
                    </span>
                    <span className="col-12 text-center mb-2 m-0 p-0">
                        {
                            valores.nomeUtilizador !== '' && valores.cidade !== ''?
                            <button 
                            className="botaoSubmeter mt-4"
                            onClick={() => onConfirm(valores)} 
                            >Confirmar</button>
                            :
                            <button 
                            className="botaoSubmeterDisabled mt-4"
                            disabled>Confirmar</button>

                        }     
                    </span>
                </section>
            </Div>
            </Fundo>
        </>
    )
}

export default FinalizarUtilizador;