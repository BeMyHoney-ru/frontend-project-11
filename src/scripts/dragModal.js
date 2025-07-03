// https://stackoverflow.com/questions/45062397/make-bootstrap-modal-draggable-and-keep-background-usable

export default function makeModalDraggable() {
  const modal = document.querySelector('.modal');
  const header = modal.querySelector('.modal-header');

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.style.cursor = 'move';
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = modal.querySelector('.modal-dialog').getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    modal.querySelector('.modal-dialog').style.position = 'absolute';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      modal.querySelector('.modal-dialog').style.left = `${e.clientX - offsetX}px`;
      modal.querySelector('.modal-dialog').style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// что за баг с курсором когда отпускаешь после клика немного вниз уезжает как будто есть невидимая шапка