document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('swipe-card');
    const detailsPage = document.getElementById('details-page');
    let startX;

    card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    card.addEventListener('touchmove', (e) => {
        let touch = e.touches[0];
        let change = touch.clientX - startX;

        if (change > 0) {
            card.style.transform = `translateX(${change}px)`;
        }
    });

    card.addEventListener('touchend', (e) => {
        let change = e.changedTouches[0].clientX - startX;

        if (change > 100) {
            detailsPage.classList.add('show-details');
            card.style.display = 'none';
        } else {
            card.style.transform = 'translateX(0)';
        }
    });
});
