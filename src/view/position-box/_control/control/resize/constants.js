const boxLength = 5;

const size = `${boxLength}px`;
const dblSize = `${boxLength * 2}px`;

export const hitboxData = [
   // corners (top, right, bottom right, bottom left)
   { id: 0, styles: { top: 0, left: 0, width: size, height: size, cursor: 'nwse-resize' } },
   { id: 1, styles: { top: 0, left: `calc(100% - ${size}`, width: size, height: size, cursor: 'nesw-resize' } },
   { id: 2, styles: { top: `calc(100% - ${size}`, left: `calc(100% - ${size}`, width: size, height: size, cursor: 'nwse-resize' } },
   { id: 3, styles: { top: `calc(100% - ${size}`, left: 0, width: size, height: size, cursor: 'nesw-resize' } },

   // sides (top, right, bottom, left)
   { id: 4, styles: { top: 0, left: size, width: `calc(100% - ${dblSize})`, height: size, cursor: 'ns-resize' } },
   { id: 5, styles: { top: size, left: `calc(100% - ${size}`, width: size, height: `calc(100% - ${dblSize})`, cursor: 'ew-resize' } },
   { id: 6, styles: { top: `calc(100% - ${size}`, left: size, width: `calc(100% - ${dblSize})`, height: size, cursor: 'ns-resize' } },
   { id: 7, styles: { top: size, left: 0, width: size, height: `calc(100% - ${dblSize})`, cursor: 'ew-resize' } }
];

export const hitboxCallback = [{}, {}, {}, {}, {}, {}, {}, {}];
