import { Router } from "express"
import { z } from "zod";
import { handler } from "../../../_lib/http";
import { makeValidator } from "../../../_lib/http/RequestValidation";
import { balanceSerializer } from "./balanceSerializer";

const { getQuery } = makeValidator({
  query: z.object({
    ledger : z.string().optional(),
  })
});

const balanceController = () => {
  const balanceRouter = Router();

  const balanceHandler = handler(({ balanceService }) => async (req, res) => {
    const { ledger: ledgerName } = getQuery(req);

    const balance = await balanceService.getBalance(ledgerName);

    res.status(200).json(balanceSerializer(balance));
  });

  balanceRouter.get('/', balanceHandler);

  return balanceRouter;
}

export { balanceController }