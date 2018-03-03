# Metal Gear Solid Memory Match

- Live Link: www.michaeljameslin.com/metalgearsolid
- Github Page: http://michaeljlin.github.io/metalgearmatch-react

## Summary
> A Metal Gear Solid inspired Memory Match game built in React using HTML5 & CSS powered 3D animations

The 3D effects in this app were implemented through a combination of React in-line styling objects and imported CSS stylesheets. By defining CSS transitions first through stylesheets as an initial blank state, it was possible to fluidly manipulate 3D transformations such as rotations & translations on the X, Y, and Z planes by dynamically creating in-line styles based on component states.

Unfortunately, some browser compatibility is lost due to how different rendering engines may have wildly differing interpretations on transformation transitions. The app disallows running on browsers other than Chrome/Chromium and Safari due to this. I hope to resolve such compatibility issues on a future update or when more consistent 3D CSS rendering standards are established.

## Play Instructions & Mechanics
- Enemy cards trigger individual alarm countdowns on reveal. Match the same two enemy cards to clear all alarm countdowns!
- Alarms not cleared will deal 1 HP damage each when time runs out.
- Allies will restore 1 HP when matched.
- Incorrect matches will decrement the boss attack countdown. If it runs out, Snake will lose 1 maximum HP and the board will be reset.
- If Snake loses all his health then it's Game Over!
- Press the '?' icon at any time to view the instructions.
- Press the volume icon at any time to turn on/off the sound.

### Contributing & Deploying

This repo contains a docs folder containing a deployable version of the app built through webpack. If you'd like to run a copy of the app on a local or external server, serving the contents of the docs folder in your desired file structure location is the only requirement for getting the app up and running.

```package.json```, ```webpack.config.js```, and ```eslintrc.json``` files are also included for setting up a local development environment. To use them, ensure that Node.js is installed in your working directory and then run ```npm install``` to install the required modules. Use the command ```npm start``` to start a local server that can be accessed in any browser at the address ```localhost:3000```.  Use the command ```npm run bundle``` to compile a deployable version of the app in the local docs folder.

If you would like to report a bug or add a change to this repo, please feel free to make a fork of this project and submit a pull request. I can also be contacted directly at mjameslin@gmail.com

### Key Technologies Utilized:
- React & JSX
- HTML5
- CSS3
- Node.js & npm
- Webpack

### Credits: 
- Sound Effects, Music, Images, and Renders from the Metal Gear Solid series by Konami
- [FontAwesome 5.0 Icons](https://github.com/FortAwesome/Font-Awesome)
- [Digital-7 Font](https://www.dafont.com/digital-7.font)
- [Metal Gear Solid 2 Font](https://fonts2u.com/metal-gear-solid-2.font)