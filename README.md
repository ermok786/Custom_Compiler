# Custom Compiler <span style="float: right; font-weight: normal; font-size: 1rem;">[Live](https://custom-compiler.onrender.com)</span>

Custom Compiler is an educational tool designed to help college students understand the working of a compiler by visualizing different compilation phases. It takes source code as input and shows the output of each phase of the compiler, along with parse tree visualizations for better comprehension.

## Overview

Compilers can be complex to understand, especially for students new to programming languages and compiler design. This project simplifies learning by visually demonstrating all main phases of compilation in an interactive way.

## Features

- **Custom Language Keywords**  
  This compiler uses a custom set of keywords for better understanding and ease of learning, for example:  
  - `val` instead of `int`  
  - `agar` and `nhi-to` instead of `if` and `else`  
  - `bhejdo` instead of `return`  
  - `prt` instead of `print`
- **Phase-by-Phase Visualization**: See output for all major compiler phases:
  - Lexical analysis
  - Syntax analysis with parse tree visualization
  - Semantic analysis
  - Intermediate code generation
  - Code optimization
  - Target code generation
- **Parse Tree Visualization**: Graphically represents the syntax tree to aid understanding of code structure.

## How it Works

1. User inputs source code via the web interface.
2. The backend compiler processes the code through each compilation phase.
3. Outputs of each phase are returned to the user for study.
4. The parse tree is displayed visually to demonstrate code hierarchy and grammar parsing.

## Getting Started

To run the Custom Compiler locally:

1. Clone the repository.
2. Install dependencies:  
