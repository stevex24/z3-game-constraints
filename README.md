# Z3 Game Constraints — Node.js Implementation  
### Author: Steve Cross  
### UCSC Game Design — Z3 Constraint Solving Assignment

This repository contains my implementation of the UCSC “Z3 Game Constraints” assignment using the Z3 SMT solver with 
Node.js.  
The project demonstrates solving logic puzzles and game-world placement problems using constraint-solving techniques.

---

## 📦 Contents

### **1. `z3demo.js`**
A simple demonstration that confirms Z3 is installed and running correctly.  
Uses a single integer constraint (`9 ≤ x ≤ 10`) and prints a satisfying model (`x = 9`).

---

### **2. `children_pets_z3.js`**
Solves the classic “children and pets” logic puzzle using:

- Four integer variables (one per child)
- Domain constraints for pets
- Distinctness constraints
- Logical conditions based on the puzzle clues

Demonstrates how simple integer encoding replaces complex SAT encodings.

---

### **3. `fence_constraints.js`**
Implements three constraint-based placement problems:

#### **a) Inside the Fence**
Finds `(x, y)` coordinates **inside** the fence with boundaries:
- Left: 5  
- Right: 10  
- Top: 15  
- Bottom: 25  

#### **b) On the Fence (Top or Left)**
Generates a decoration location that is:
- On the **top** fence, or  
- On the **left** fence  
- But **not inside** or outside

#### **c) Outside the Fence**
Generates a tree location that must:
- Be **outside** the fenced region  
- Satisfy `x ≥ 8` and `y ≥ 20`  
- Not lie on any fence boundary

---

### **4. `enumerate_values.js`**  
⭐ **Extra Credit — Model Enumeration**

Enumerates *all possible satisfying solutions* for a given constraint region.  
Process:

1. Solve for one satisfying model  
2. Record the model  
3. Add a **blocking clause** to forbid it  
4. Re-solve  
5. Repeat until Z3 returns `unsat`

This technique is the basis for Answer Set Programming, constrained PCG, and sampling multiple valid positions in game 
worlds.

---

## 🚀 Running the Code

Install dependencies:

```bash
npm install
Run any script:

bash
Copy code
node z3demo.js
node children_pets_z3.js
node fence_constraints.js
node enumerate_values.js
Each script prints a satisfying model to the console.

🧠 Notes
All Z3 logic is implemented in Node.js for maximal stability.

Phaser and Vite experiments are maintained separately (not part of the assignment).

The enumeration code provides a useful template for constraint-driven procedural generation.

📎 Repository Link
https://github.com/stevex24/z3-game-constraints

✔ Status
All required tasks complete, plus extra credit.
Code tested and working in a clean Node environment
