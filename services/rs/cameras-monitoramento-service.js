import axios from 'axios';
import CameraMonitoramentoDto from '../../dto/rs/camera-monitoramento-dto'
import { parse } from 'node-html-parser';

const fetchCamerasMonitoramento = async() => {
    const urlCamerasMonitoramento = 'https://www.daer.rs.gov.br/cameras-de-monitoramento/listfilho?carregarlocaisrelacionados=true';
    const { data: body } = await axios.get(urlCamerasMonitoramento);
    return body;
}

const fetchStreamLink = async(urlAmigavel) => {
    const urlStreamInfo = `https://www.daer.rs.gov.br/_service/mapacameras?urlamigavel=${urlAmigavel}&alttemplate=pagina.listalocal.mapacameras.conteudolocal`;
    const { data: body } = await axios.get(urlStreamInfo);

    const parsedHtml = parse(body);

    return parsedHtml.querySelector('.cameraRodovia').getAttribute('src');
}

const formatResponse = async(response) => {
    const itens = response['itens'];
    
    var cameras = [];
    for (var itemKey in itens) {
        var cameraInfo = itens[itemKey];

        var urlamigavel = cameraInfo['urlamigavel'];
        var stream =  await fetchStreamLink(urlamigavel);

        for (var localKey in cameraInfo['locais']) {
            var local = cameraInfo['locais'][localKey];
            var municipio = local['entidade']['municipio'];       
            var logradouro = local['entidade']['logradouro'];       
            var complemento = local['entidade']['complemento'];       
            var coordernadas = local['entidade']['pontos'];       
        }

        var cameraMonitoramentoDto = new CameraMonitoramentoDto(
            itemKey,
            municipio, 
            logradouro, 
            complemento, 
            coordernadas, 
            stream
        );
        
        cameras.push(cameraMonitoramentoDto); 
    }

    return cameras;
}

export const getCamerasMonitoramentoData = async () => {
    const response = await fetchCamerasMonitoramento();
    const formattedResponse = await formatResponse(response);
  
    return formattedResponse;
  };
