import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Not } = new Context('fence');

const solver = new Solver();

function show(model, x, y, label) {
  const xv = model.eval(x).toString();
  const yv = model.eval(y).toString();
  console.log(`${label}: x = ${xv}, y = ${yv}`);
}

// ---------------------------------------------------------
// 1) INSIDE the fence
// Left  = 5
// Right = 10
// Top   = 15
// Bottom= 25
// STRICT interior:  (5 < x < 10) and (15 < y < 25)
// ---------------------------------------------------------
async function insideFence() {
  solver.reset();

  const x = Int.const('x');
  const y = Int.const('y');

  solver.add(
    x.gt(5),
    x.lt(10),
    y.gt(15),
    y.lt(25)
  );

  if (await solver.check() === 'sat') {
    show(solver.model(), x, y, 'Inside fence');
  } else {
    console.log('No inside-fence solution.');
  }
}

// ---------------------------------------------------------
// 2) ON the fence (top OR left), but NOT inside.
// Top fence:    y = 15,  5 <= x <= 10
// Left fence:   x = 5,  15 <= y <= 25
// ---------------------------------------------------------
async function onFence() {
  solver.reset();

  const x = Int.const('x');
  const y = Int.const('y');

  const inside =
    And(x.gt(5), x.lt(10), y.gt(15), y.lt(25));

  const onTop =
    And(y.eq(15), x.ge(5), x.le(10));

  const onLeft =
    And(x.eq(5), y.ge(15), y.le(25));

  const onFence = Or(onTop, onLeft);

  solver.add(And(onFence, Not(inside)));

  if (await solver.check() === 'sat') {
    show(solver.model(), x, y, 'On fence (top or left)');
  } else {
    console.log('No on-fence solution.');
  }
}

// ---------------------------------------------------------
// 3) OUTSIDE the fence and also x>=8, y>=20.
// Outside means: NOT inside, NOT on ANY fence side.
//
// Right fence:  x = 10, 15 <= y <= 25
// Bottom fence: y = 25, 5 <= x <= 10
//
// So we forbid:
// - interior
// - top fence
// - left fence
// - right fence
// - bottom fence
//
// and we enforce: x>=8, y>=20
// ---------------------------------------------------------
async function outsideFence() {
  solver.reset();

  const x = Int.const('x');
  const y = Int.const('y');

  const inside = And(
    x.gt(5), x.lt(10),
    y.gt(15), y.lt(25)
  );

  const onTop    = And(y.eq(15), x.ge(5), x.le(10));
  const onLeft   = And(x.eq(5),  y.ge(15), y.le(25));
  const onRight  = And(x.eq(10), y.ge(15), y.le(25));
  const onBottom = And(y.eq(25), x.ge(5), x.le(10));

  const onFence = Or(onTop, onLeft, onRight, onBottom);

  solver.add(
    And(
      Not(inside),
      Not(onFence),
      x.ge(8),
      y.ge(20)
    )
  );

  if (await solver.check() === 'sat') {
    show(solver.model(), x, y, 'Outside fence');
  } else {
    console.log('No outside-fence solution.');
  }
}

// Run them in sequence
(async () => {
  await insideFence();
  await onFence();
  await outsideFence();
})();

