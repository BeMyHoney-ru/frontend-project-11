export default function makeModalDraggable() {
  const modal = document.querySelector('.modal');
  const header = modal.querySelector('.modal-header');
  const dialog = modal.querySelector('.modal-dialog');

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.style.cursor = 'move';

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = dialog.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    dialog.style.position = 'absolute';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      dialog.style.left = `${e.clientX - offsetX}px`;
      dialog.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}
