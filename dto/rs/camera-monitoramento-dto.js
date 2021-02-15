export default class CameraMonitoramentoDto {
    constructor(id, municipio, logradouro, complemento, coordernadas, stream) {
        this.id = id;
        this.municipio = municipio || 'n/a';
        this.logradouro = logradouro || 'n/a';
        this.complemento = complemento || 'n/a';
        this.coordernadas = coordernadas || 'n/a';
        this.stream = stream || 'n/a';
    }
}