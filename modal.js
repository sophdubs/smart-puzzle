const page = document.querySelector('#page');
let modal = document.querySelector('#modal');
let bod = document.querySelector('body');

function showModal(){
    bod.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if (!e.target.classList.contains('modal')) {
           closeModal();
       }
    });
    modal.classList.remove('modal-no-show');
    modal.classList.add('modal-show');
    page.classList.add('modal-open');
}


let modalCloseButton = document.querySelector('.modal-close');
modalCloseButton.addEventListener('click', closeModal);

function closeModal() {
    if (hackerMode) {
        activateHackerMode()
    }
    resetGame(BOARD_SIZE);
    modal.classList.add('modal-no-show');
    modal.classList.remove('modal-show');
    page.classList.remove('modal-open');
}

