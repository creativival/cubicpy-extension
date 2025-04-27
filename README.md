# CubicPy Scratch 3 Extension

*[日本語](https://creativival.github.io/cubicpy-extension/)* | English

![CubicPy Logo](https://creativival.github.io/CubicPy/assets/cubicpy_logo.png)

## What is CubicPy?

A 3D programming learning app that allows you to place and construct physical objects using code.

"CubicPy" - Please call it "Cubepy" for short!

## App Description

CubicPy is an application that lets you place objects in 3D space using Python code and build worlds that operate with realistic physics. You can freely place objects like boxes and spheres to create structures, and learn programming while experiencing physical laws like gravity and collisions.

![CubicPy Sample Animation Gif](https://creativival.github.io/CubicPy/assets/cubicpy_sample.gif)

You can observe realistic collapse processes using physics calculations by tilting the ground or removing objects from the structures you create. Additionally, you can check physical behavior under different gravity environments by changing the gravity coefficient. Furthermore, it's possible to set initial velocity vectors to launch objects.

## What is the CubicPy Extension?

While CubicPy is primarily based on Python programming, this extension allows you to send data from Scratch 3 to CubicPy to create object structures.

### How to Use the CubicPy Extension

Set up Xcratch following these steps:

1. Access [Xcratch](https://xcratch.github.io/editor/#https://creativival.github.io/cubicpy-extension/projects/example.sb3)
2. A sample project that can use the "CubicPy Extension" will open
3. The "CubicPy Extension" blocks will become available
4. Modify the sample project to create your own structures

### Preparing the CubicPy Library

Install the CubicPy library on a computer with Python installed:

```bash
python -m venv .venv
source .venv/bin/activate
pip install setuptools
pip install cubicpy
```

### Starting CubicPy

```bash
cubicpy -x -g 0
```

### Connecting the CubicPy Extension with the CubicPy Library

1. When CubicPy functions in external communication mode, a 4-digit number will be displayed on the screen
2. Enter that number (room name) into the Scratch "set room name to ()" block
3. Double-click the Scratch block to send the data
4. Once the WebSocket connection is established, cube construction will occur in CubicPy

## License

MIT License

Copyright (c) 2024 creativival

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

Thank you for considering contributing to the project. You can contribute in the following ways:

1. Reporting Bugs
   - Report issues on GitHub
   - Provide detailed reproduction steps
   - Attach error messages or screenshots if available

2. Feature Proposals
   - Propose new features on GitHub Issues
   - Describe specific use cases
   - Include implementation suggestions if available

3. Pull Requests
   - Pull requests for bug fixes and feature additions are welcome
   - Keep code changes small
   - Add tests
   - Follow coding conventions

4. Documentation Improvements
   - Fix typos in documentation
   - Add or improve explanations
   - Add sample code

Thank you to all contributors.


