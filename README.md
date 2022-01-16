# The Orca Programming Language

Orca (*Egg* from the book *Eloquent JavaScript*) is a simple programming language that supports functions, closures, and more.

```orca
do(
  print("Hello, world!"),
  define(pswd, input("What is the password? ")),
  if (==(pswd, "0rc4"),
    print("Welcome!"),
    print("Try again.")
  )
)
```
```orca
do(
  define(factorial, n,
    if(<=(n, 1),
      1,
      *(n, -(n, 1))
    )
  ),
  print(factorial(4)) # 24
)
```

## Installation
Orca can be installed via `npm`.
```bash
npm install -g orcalang
```

## Usage
```bash
orca <filename>
```

## Documentation
Coming soon.