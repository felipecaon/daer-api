import { getCamerasMonitoramentoData } from '../../../services/rs/cameras-monitoramento-service';

const action = async (request, response) => {
  const allCamerasMonitoramentoData = await getCamerasMonitoramentoData();

  response.status(200);
  response.json(allCamerasMonitoramentoData);
};

export default action;