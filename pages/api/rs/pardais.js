import { getLeitoresDePlacas } from '../../../services/rs/leitores-de-placas-service';
import { getPardais } from '../../../services/rs/pardais-service';

const action = async (request, response) => {
  const allPardaisData = await getPardais();

  response.status(200);
  response.json(allPardaisData);
};

export default action;