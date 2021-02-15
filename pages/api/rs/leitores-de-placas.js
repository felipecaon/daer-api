import { getLeitoresDePlacas } from '../../../services/rs/leitores-de-placas-service';

const action = async (request, response) => {
  const allLeitoresDePlacasData = await getLeitoresDePlacas();

  response.status(200);
  response.json(allLeitoresDePlacasData);
};

export default action;