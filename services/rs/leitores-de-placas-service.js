import axios from 'axios';
import LeitorDePlacaDto from '../../dto/rs/leitor-de-placa-dto'
import { parse } from 'node-html-parser';

const fetchLeitoresDePlaca = async() => {
    const urlLeitoresDePlacas = 'https://www.daer.rs.gov.br/dispositivos-leitores-de-placas-ocr-5f7f6149926c9';
    const { data: body } = await axios.get(urlLeitoresDePlacas);
    return body;
}

const parseLeitoresDePlacas = (html) => {
    const localLeitoresPlacas = []
    const parsedHtml = parse(html);

    //não julgue, o > não esta funcionando no node-html-parser
    const info = parsedHtml.querySelector('.artigo__texto').querySelector('div').querySelector('ul');

    for (var i = 0; i < info.childNodes.length; i++){
        var rawText = info.childNodes[i].rawText
        if (rawText != '\r\n') {
            console.log(rawText)
            localLeitoresPlacas.push(formatToObject(i, rawText));
        }
    }

    return localLeitoresPlacas
}

const formatToObject = (id, rawText) => {
    var rodovia = rawText.split(" ")[0]
    var sentido = rawText.replace(rodovia + ' ', '').replace("(", '').replace(")", '');
    return new LeitorDePlacaDto(id, rodovia, sentido);
}

export const getLeitoresDePlacas = async () => {
    const htmlResponse = await fetchLeitoresDePlaca();
    const localLeitoresPlacas = parseLeitoresDePlacas(htmlResponse);
    return localLeitoresPlacas;
  };
