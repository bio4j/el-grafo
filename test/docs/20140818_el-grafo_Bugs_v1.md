
18th August 2014

TO DO/BUGS BEING WORKED
- Add tooltips with each module relevant info when hovering on the INTRO scheme
- Solve intro scheme problems with colors and opacities when loading different modules, also with the dependencies labels.
- Solve svg overlapping problems that don't allow to make clickable some elements due the canvas layout
- Solve zoom behaviour issues. Either a reset buttom or auto-center feature.
- Solve Enzyme module clickable button: is not working
- Dependencies Graph representation title appearing twice.

- Dependencies color vertex not corresponding to the color code, they all brown temporary.
- Dependencies not appearing on the modules that have them.
- Delete the json auxiliar file done by hand on the intro page by coding some functions.
- Integrate the dependencies js script with the module js script as they share most of the fucntions
- Add some instructions regarding the dependencies collapsing features.
- Solve some small issues with the context menu filtering options
- Add the text search button to find/hightlihgt and specific vertex/node.

POTENTIAL:
- When the json schema includes the "module" of each dependency, implement this on the code so its not added by hand.
- Implement the filtering interactions via context menu using the dagre command 'test digraph.filterNodes(f)' reagenging the partial graphs instead of hightlightin the elements.