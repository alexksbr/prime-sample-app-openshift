import express, { Application, Request, Response } from "express";
import * as bodyParser from "body-parser";

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("TS App is Running");
});
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

app.get("/primes/:index", (req: Request, res: Response) => {
  const index = +req.params.index;
  const result = getNthPrime(index);
  res.send({ prime: { index, result: result } });
});

function getNthPrime(index: number) {
  const primes = [2];
  let isPrime = true;

  for (let candidate = 3; primes.length < index; candidate++) {
    isPrime = true;
    for (let divisor = 2; divisor < candidate; divisor++) {
      if (candidate % divisor === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime === true) {
      primes.push(candidate);
    }
  }
  return primes[primes.length - 1];
}
