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
    
    // Add count and time to modal before showing
    document.querySelector('.modal-time').innerHTML = timerText.innerHTML;
    document.querySelector('.modal-move-count').innerHTML = moveCounter.innerHTML;
    
    modal.classList.add('modal-show');
    page.classList.add('modal-open');
}


let modalCloseButton = document.querySelector('.modal-close');
modalCloseButton.addEventListener('click', closeModal);

function closeModal() {
   window.location.reload();
}

