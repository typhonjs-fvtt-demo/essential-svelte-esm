import { hitboxCallback } from './constants.js';

export function applyResizeData(id, dX, dY, control)
{
   const data = hitboxCallback[id];

   switch (id)
   {
      case 0:
      {
         const heightAdjust = control.position.height - dY;

         if (heightAdjust < 0) { dY += heightAdjust; }

         data.top = `${dY >= 0 ? '+' : ''}${dY}`;
         data.height = `${-dY >= 0 ? '+' : ''}${-dY}`;

         const widthAdjust = control.position.width - dX;

         if (widthAdjust < 0) { dX += widthAdjust; }

         data.left = `${dX >= 0 ? '+' : '' }${dX}`;
         data.width = `${-dX >= 0 ? '+' : '' }${-dX}`;
         break;
      }

      case 1:
      {
         const heightAdjust = control.position.height - dY;

         if (heightAdjust < 0) { dY += heightAdjust; }

         data.top = `${dY >= 0 ? '+' : ''}${dY}`;
         data.height = `${-dY >= 0 ? '+' : ''}${-dY}`;

         data.width = `${dX >= 0 ? '+' : '' }${dX}`;
         break;
      }

      case 2:
      {
         data.width = `${dX >= 0 ? '+' : ''}${dX}`;
         data.height = `${dY >= 0 ? '+' : ''}${dY}`;
         break;
      }

      case 3:
      {
         const widthAdjust = control.position.width - dX;

         if (widthAdjust < 0) { dX += widthAdjust; }

         data.left = `${dX >= 0 ? '+' : '' }${dX}`;
         data.width = `${-dX >= 0 ? '+' : '' }${-dX}`;

         data.height = `${dY >= 0 ? '+' : '' }${dY}`;
         break;
      }

      case 4:
      {
         const heightAdjust = control.position.height - dY;

         if (heightAdjust < 0) { dY += heightAdjust; }

         data.top = `${dY >= 0 ? '+' : ''}${dY}`;
         data.height = `${-dY >= 0 ? '+' : ''}${-dY}`;
         break;
      }

      case 5:
      {
         data.width = `${dX >= 0 ? '+' : ''}${dX}`;
         break;
      }

      case 6:
      {
         data.height = `${dY >= 0 ? '+' : ''}${dY}`;
         break;
      }

      case 7:
      {
         const widthAdjust = control.position.width - dX;

         if (widthAdjust < 0) { dX += widthAdjust; }

         data.left = `${dX >= 0 ? '+' : ''}${dX}`;
         data.width = `${-dX >= 0 ? '+' : ''}${-dX}`;
         break;
      }
   }

   return data;
}