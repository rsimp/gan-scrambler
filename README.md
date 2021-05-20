# Gan Scrambler
Gan Scrambler is a PWA for controlling the GAN Robot: https://www.gancube.com/gan-robot

It can execute random scrambles, manual scrambles (inputted scramble codes e.g. L U' B D2 R...), and can scramble the cube for any of the four stages of CFOP solving method.

This project uses a modified (and typed) version of [cube-solver](https://github.com/torjusti/cube-solver) to solve the cube with the kociemba algorithm. It was modified in order to be able to create 5 sided solves for the robot, as opposed to being able to turn all 6 faces. It also uses some of the solvers to help with partial CFOP solves, with some new ones added to it.

It also uses logic from [cubejs](https://github.com/ldez/cubejs) (converted from coffeescript to typescript) and [cube-preview](https://www.npmjs.com/package/cube-preview) for creating svg previews of the scrambled cubes.

The project is hosted at https://rsimp.io/gan-scrambler. You can create various scrambles without the robot, but will need the gan-robot and a compatible cube to execute the scramble. Compatible cubes include: GAN-356i, GAN-356iplay, GAN-356XS, and maybe the GAN-356X. You just need the correct center caps for the robot to attach to.

As a PWA it can be installed on windows, macOS, linux, and android via the chrome browser. Unfortunately iOS will not allow bluetooth connections via a web browser even with chrome. Once installed an internet connection is not required to operate the robot. Installing the app is optional, you can also simply browse to https://rsimp.io/gan-scrambler with chrome.

The following flags in chrome are required to enable persistent bluetooth connections: #enable-experimental-web-platform-features and #enable-web-bluetooth-new-permissions-backend. This simply means you won't need to reconnect to a previously paired robot everytime you open the app or refresh.

The project was written with React/Redux/Redux-Saga in typescript, uses tailwind and classed.macro for CSS, and was generated with `create-react-app`. It uses the react material UI library for visual components: https://material-ui.com/

### Inspiration
A native android and iOS app, called Cube Station, already exists for the robot and the corresponding bluetooth cubes (GAN-356i, GAN-356iplay). Certain features are disabled without a bluetooth cube (GAN-356XS is not bluetooth), such as just doing a simple scramble. Manual scrambles are not available, and it only performs virtual scrambles for CFOP training.
I wanted an app that:
1. Took less steps to scramble the cube and only required the correct center caps
2. Could execute manual scramble codes generated from other apps or competition solves
3. Could do physical scrambles for CFOP
