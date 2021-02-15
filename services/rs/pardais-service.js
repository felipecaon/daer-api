import axios from 'axios';
import PardalDto from '../../dto/rs/pardal-dto'
import { parse } from 'node-html-parser';

const fetchPardais = async() => {
    const urlLeitoresDePlacas = 'https://www.daer.rs.gov.br/pardais';
    const { data: body } = await axios.get(urlLeitoresDePlacas);
    return body;
}

const parsePardais = (html) => {
    const localPardais = []
    const parsedHtml = parse(html);

    //não julgue, o > não esta funcionando no node-html-parser
    const info = parsedHtml.querySelector('.artigo__texto').querySelector('div').querySelector('ul');

    var id = 0;
    for (var i = 0; i < info.childNodes.length; i++){
        var rawText = info.childNodes[i].rawText
        if (rawText != '\r\n') {
            id += 1;
            localPardais.push(formatToObject(id, rawText));
        }
    }

    return localPardais
}

const formatToObject = (id, rawText) => {
    var rodovia = rawText.split(" ")[0]
    var sentido = rawText.replace(rodovia + ' ', '').replace("(", '').replace(")", '');
    return new PardalDto(id, rodovia, sentido);
}

export const getPardais = async () => {
    const htmlResponse = await fetchPardais();
    const localPardais = parsePardais(htmlResponse);
    return localPardais;
  };
