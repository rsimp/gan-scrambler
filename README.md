# Gan Scrambler
Gan Scrambler is a PWA for controlling the GAN Robot: https://www.gancube.com/gan-robot
It can execute manual scrambles, manual scrambles (you input the scramble sequence e.g. L U' B D2 R...), and can scramble the cube for any of the four stages of CFOP solving method.

This project uses a modified (and typed) version of cube-solver[https://github.com/torjusti/cube-solver] to solve the cube with the kociemba algorithm. Modified for a 5 sided cube solve for the robot, as opposed to being able to turn all 6 faces. It also uses some of the solvers to help with partial CFOP solves, with some new ones added to it.

It also uses logic from cubejs[https://github.com/ldez/cubejs] (converted from coffeescript to typescript) and cube-preview[https://www.npmjs.com/package/cube-preview] for creating svg previews of the scrambled cubes.

The project is hosted at rsimp.io/gan-scrambler. You can create various scrambles without the robot, but will need to purchase the robot above in order to scramble a compatible cube (GAN-356i, GAN-356iplay or GAN-356XS, maybe GAN-356X, you just need the correct center caps).

As a PWA it can be installed on windows/mac/linux/android via the chrome browser. Unfortunately iOS will not allow bluetooth connections via a web browser even with chrome. Once installed an internet connection is not required to operate the robot.

The following flags in chrome are required to enable persistent bluetooth connections: #enable-experimental-web-platform-features and #enable-web-bluetooth-new-permissions-backend. This simply means you won't need to reconnect to a previously paired robot everytime you open the app or refresh.

The project was written with React/Redux/Sagas in typescript, and generated with CRA. It uses the tailwind css library with the classed.macro npm package for creating styled components.

### Inspiration
A native app for the robot already exists for the robot and the corresponding bluetooth cubes (GAN-356i, GAN-356iplay). Certain features are disabled without the bluetooth cubes such as just doing a simple scramble. Manual scrambles are also not available. It also only does virtual scrambles for CFOP
I wanted an app that:
1. Took less steps to scramble the cube
2. Could execute manual scramble codes generated from other apps or competition solves
3. Could do physical scrambles for CFOP
