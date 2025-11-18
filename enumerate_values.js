import { init } from "z3-solver";

const { Context } = await init();
const { Solver, Int, And, Not } = new Context("enumeration");

const solver = new Solver();

//
// Example constraints to enumerate solutions for.
//
// Replace these with ANY constraints you want.
// For a demo, let's enumerate all (x, y) such that:
//
//   5 < x < 10
//   15 < y < 20
//
// This will enumerate (x, y) pairs like (6,16), (7,17), etc.
//
const x = Int.const("x");
const y = Int.const("y");

solver.add(
  x.gt(5),
  x.lt(10),
  y.gt(15),
  y.lt(20)
);

// -------------------------------------------------------------------
// Enumerate all possible solutions.
// -------------------------------------------------------------------

const allSolutions = [];

while (true) {
  const result = await solver.check();

  if (result !== "sat") {
    console.log("\nNo more solutions. Enumeration complete.");
    break;
  }

  // Extract model
  const model = solver.model();
  const xv = parseInt(model.eval(x).toString(), 10);
  const yv = parseInt(model.eval(y).toString(), 10);

  console.log(`Found solution: x=${xv}, y=${yv}`);
  allSolutions.push({ x: xv, y: yv });

  // Block this specific solution
  solver.add(
    Not(
      And(
        x.eq(xv),
        y.eq(yv)
      )
    )
  );
}

// -------------------------------------------------------------------
// Optional: pick a random valid solution
// -------------------------------------------------------------------
if (allSolutions.length > 0) {
  const idx = Math.floor(Math.random() * allSolutions.length);
  const chosen = allSolutions[idx];
  console.log(
    `\nRandomly chosen solution from valid set: x=${chosen.x}, y=${chosen.y}`
  );
} else {
  console.log("\nNo valid solutions were found at all.");
}

