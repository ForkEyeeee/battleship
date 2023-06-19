import { buildGameBoard } from './modifyDOM';

// Get the modal
const modalWindow = () => {
  const modal = document.getElementById('myModal');
  const form = document.getElementById('form-ship');
  // Get the button that opens the modal
  const btn = document.getElementById('myBtn');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('reset-btn');

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  submitBtn.onclick = function () {
    modal.style.display = 'none';
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }

    // form.addEventListener('submit', (e) => {
    //   if (!form.checkValidity()) {
    //     // e.preventDefault();
    //     // The form is invalid - do something about it
    //   } else {
    //     e.preventDefault();
    //   }
    // });
  };
};

export default modalWindow;

// get the data and then send it to modifyDOM
