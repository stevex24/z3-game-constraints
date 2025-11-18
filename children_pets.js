import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Distinct } = new Context('children_pets');

const solver = new Solver();

// Your chosen orders:
const children = ['Bob', 'Mary', 'Cathy', 'Sue'];
const pets = ['cat', 'dog', 'bird', 'fish']; // index 0..3

// One integer var per child:
const bob = Int.const('bob');
const mary = Int.const('mary');
const cathy = Int.const('cathy');
const sue = Int.const('sue');

// Domain 0..3 (index into `pets`)
function inRange(v) {
  return And(v.ge(0), v.le(3));
}

solver.add(
  inRange(bob),
  inRange(mary),
  inRange(cathy),
  inRange(sue),
  Distinct(bob, mary, cathy, sue) // each child has a different pet
);

// ==== TODO: ADD PUZZLE CLUES HERE ====
// Examples of *style* only – replace with your real clues:
//
// 1) “Bob does not have the cat”
// solver.add(bob.neq(0)); // 0 = cat
//
// 2) “Mary has the dog”
// solver.add(mary.eq(1)); // 1 = dog
//
// 3) “Cathy has either the bird or the fish”
// solver.add(Or(cathy.eq(2), cathy.eq(3)));
//
// etc.
// ======================================

if (await solver.check() === 'sat') {
  const model = solver.model();
  const val = (v) => parseInt(model.eval(v).toString(), 10);

  console.log('Solution:');
  console.log(`${children[0]} has the ${pets[val(bob)]}`);
  console.log(`${children[1]} has the ${pets[val(mary)]}`);
  console.log(`${children[2]} has the ${pets[val(cathy)]}`);
  console.log(`${children[3]} has the ${pets[val(sue)]}`);
} else {
  console.log('unsat – your constraints contradict each other.');
}

